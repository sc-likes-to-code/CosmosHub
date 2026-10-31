import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { SummaryCache, computeContentHash } from '../server/summaryCache.js'
import { QuotaManager, getTodayISTDate } from '../server/quotaManager.js'
import { GeminiService, generateFallbackSummary, isConfirmedNonConsumingError, isGeminiOverloadError } from '../server/geminiService.js'
import { _resetRedisClient, resolveRedisCredentials, isRedisConfigured, getRedisClient } from '../server/redisClient.js'
import statusHandler from '../api/ai/status.js'
import summaryHandler from '../api/ai/summary.js'
import dynamicSummaryHandler from '../api/ai/summary/[articleId].js'

// Mock HTTP Response for Vercel Serverless Function testing
function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    ended: false,
    body: null,
    setHeader(key, val) {
      this.headers[key.toLowerCase()] = val
      return this
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(data) {
      this.body = data
      this.ended = true
      return this
    },
    end() {
      this.ended = true
      return this
    }
  }
  return res
}

// In-Memory Mock Upstash Redis Client
class MockUpstashRedis {
  constructor() {
    this.store = new Map()
    this.expirations = new Map()
  }

  async get(key) {
    const exp = this.expirations.get(key)
    if (exp && exp <= Date.now()) {
      this.store.delete(key)
      this.expirations.delete(key)
      return null
    }
    return this.store.get(key) || null
  }

  async set(key, value, opts) {
    if (opts && opts.nx && this.store.has(key)) {
      const exp = this.expirations.get(key)
      if (!exp || exp > Date.now()) {
        return null // Lock / key already held
      }
    }
    this.store.set(key, value)
    if (opts && opts.ex) {
      this.expirations.set(key, Date.now() + opts.ex * 1000)
    }
    return 'OK'
  }

  async del(key) {
    this.store.delete(key)
    this.expirations.delete(key)
    return 1
  }

  async incr(key) {
    const cur = parseInt(this.store.get(key) || '0', 10)
    const next = cur + 1
    this.store.set(key, String(next))
    return next
  }

  async decr(key) {
    const cur = parseInt(this.store.get(key) || '0', 10)
    const next = Math.max(0, cur - 1)
    this.store.set(key, String(next))
    return next
  }

  async expire(key, seconds) {
    this.expirations.set(key, Date.now() + seconds * 1000)
    return 1
  }

  async lpush(key, value) {
    let list = this.store.get(key)
    if (!Array.isArray(list)) list = []
    list.unshift(value)
    this.store.set(key, list)
    return list.length
  }

  async ltrim(key, start, stop) {
    let list = this.store.get(key)
    if (Array.isArray(list)) {
      this.store.set(key, list.slice(start, stop + 1))
    }
    return 'OK'
  }

  pipeline() {
    const ops = []
    return {
      set: (key, val, opts) => {
        ops.push(() => this.set(key, val, opts))
        return this
      },
      exec: async () => {
        for (const op of ops) await op()
        return []
      }
    }
  }
}

describe('CosmosHub Phase 2 & Vercel Migration — Gemini 3.1 Flash-Lite & Upstash Redis Tests', () => {
  const TEST_DIR = resolve(process.cwd(), 'tests/tmp-gemini-vercel')
  const testCachePath = join(TEST_DIR, 'test-summary-cache.json')
  const testUsagePath = join(TEST_DIR, 'test-ai-usage.json')

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
    _resetRedisClient(null)
  })

  afterEach(() => {
    _resetRedisClient(null)
    try {
      rmSync(TEST_DIR, { recursive: true, force: true })
    } catch {}
  })

  /* ── 1. Configuration & Model ID Verification ── */
  it('loads configuration securely and defaults to gemini-3.1-flash-lite', async () => {
    const quota = new QuotaManager(testUsagePath)
    const status = await quota.getStatus()

    assert.equal(typeof status.enabled, 'boolean')
    assert.equal(typeof status.configured, 'boolean')
    assert.equal(typeof status.dailyLimit, 'number')
    assert.equal(status.dailyLimit, 15)
    assert.equal(typeof status.usedToday, 'number')
    assert.equal(typeof status.remainingToday, 'number')
    assert.equal('apiKey' in status, false)
    assert.equal('geminiKey' in status, false)

    const cache = new SummaryCache(testCachePath)
    const service = new GeminiService(cache, quota)
    assert.equal(service.modelName, process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite')
  })

  /* ── 2. Missing API Key Behavior ── */
  it('falls back safely to RSS description when GEMINI_API_KEY is not configured', async () => {
    const origKey = process.env.GEMINI_API_KEY
    delete process.env.GEMINI_API_KEY

    try {
      const cache = new SummaryCache(testCachePath)
      const quota = new QuotaManager(testUsagePath)
      const service = new GeminiService(cache, quota)

      const result = await service.getOrGenerateSummary({
        articleId: 'test-art-1',
        title: 'James Webb Space Telescope Observes Ancient Quasar Emission',
        canonicalUrl: 'https://nasa.gov/news-1',
        desc: 'Webb discovers high-redshift black hole powering ancient quasar.',
        category: 'Astronomy & Astrophysics',
        source: { name: 'NASA' }
      })

      assert.equal(result.success, false)
      assert.equal(result.fallback, true)
      assert.equal(result.reason, 'API_KEY_NOT_CONFIGURED')
      assert.equal(result.model, 'fallback-rss')
      assert.ok(result.summary.shortSummary.includes('Webb discovers'))
      assert.ok(result.summary.detailedSummary.includes('ancient quasar'))
    } finally {
      process.env.GEMINI_API_KEY = origKey
    }
  })

  /* ── 3. Summary Cache Hit & Miss ── */
  it('stores summaries in persistent cache and returns cached summary with 0 quota consumed', async () => {
    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    const initialUsage = (await quota.getStatus()).usedToday

    const articleId = 'jwst-supernova-2026'
    const canonicalUrl = 'https://esa.int/news/jwst-supernova'
    const storedSummary = {
      shortSummary: 'JWST captures earliest known supernova.',
      detailedSummary: 'Deep infrared imaging reveals stellar explosion 13 billion light years away.',
      eli12Summary: 'Telescope spots an exploding star from when the universe was very young.'
    }
    const hash = computeContentHash('JWST Supernova Title', 'Description of supernova')

    await cache.set(articleId, canonicalUrl, storedSummary, 'gemini-3.1-flash-lite', hash, 'completed')

    const result = await service.getOrGenerateSummary({
      articleId,
      title: 'JWST Supernova Title',
      canonicalUrl,
      desc: 'Description of supernova',
      category: 'Astronomy & Astrophysics',
      source: { name: 'ESA' }
    })

    assert.equal(result.success, true)
    assert.equal(result.fromCache, true)
    assert.equal(result.model, 'gemini-3.1-flash-lite')
    assert.deepEqual(result.summary, storedSummary)
    assert.equal((await quota.getStatus()).usedToday, initialUsage)
  })

  /* ── 4. Upstash Redis Atomic Quota Reservation & Release ── */
  it('atomically enforces daily budget via Redis incr/decr and prevents concurrency overruns', async () => {
    const mockRedis = new MockUpstashRedis()
    _resetRedisClient(mockRedis)

    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    // Simulate 14 slots consumed in Redis
    const today = getTodayISTDate()
    await mockRedis.set(`cosmos:quota:${today}`, '14')

    // 15th request succeeds
    const res15 = await quota.reserveQuota()
    assert.equal(res15.allowed, true)
    assert.equal(res15.usedToday, 15)
    assert.equal(res15.remainingToday, 0)

    // 16th request rejected by atomic decr
    const res16 = await quota.reserveQuota()
    assert.equal(res16.allowed, false)
    assert.equal(res16.reason, 'DAILY_BUDGET_EXCEEDED')
    assert.equal(await mockRedis.get(`cosmos:quota:${today}`), '15')

    // Release slot simulation (e.g. confirmed failed generation)
    await quota.releaseQuota()
    assert.equal(await mockRedis.get(`cosmos:quota:${today}`), '14')

    // Slot can now be reserved again
    const resRetry = await quota.reserveQuota()
    assert.equal(resRetry.allowed, true)
    assert.equal(await mockRedis.get(`cosmos:quota:${today}`), '15')
  })

  /* ── 5. Upstash Redis Cache Storage & Zero-Call Hit ── */
  it('stores and retrieves summaries from Upstash Redis with 0 Gemini calls', async () => {
    const mockRedis = new MockUpstashRedis()
    _resetRedisClient(mockRedis)

    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    const articleId = 'artemis-redis-test'
    const canonicalUrl = 'https://nasa.gov/artemis-redis'
    const summaryData = {
      shortSummary: 'Artemis mission prepares for launch.',
      detailedSummary: 'Orion spacecraft completes integrated systems checkout.',
      eli12Summary: 'Astronauts get ready to fly around the Moon.'
    }
    const hash = computeContentHash('Artemis Update', 'Detailed launch details')

    await cache.set(articleId, canonicalUrl, summaryData, 'gemini-3.1-flash-lite', hash, 'completed')

    // Verify key exists in Redis store
    const redisStored = await mockRedis.get(`cosmos:summary:${articleId}`)
    assert.ok(redisStored)
    assert.equal(JSON.parse(redisStored).summary.shortSummary, summaryData.shortSummary)

    // Retrieve via service
    const retrieved = await service.getOrGenerateSummary({
      articleId,
      title: 'Artemis Update',
      canonicalUrl,
      desc: 'Detailed launch details'
    })

    assert.equal(retrieved.success, true)
    assert.equal(retrieved.fromCache, true)
    assert.equal(retrieved.model, 'gemini-3.1-flash-lite')
  })

  /* ── 6. Storage Failure Behavior in Production (Vercel) ── */
  it('fails safely and refuses unmetered Gemini calls if Upstash Redis is missing on Vercel', async () => {
    const origVercel = process.env.VERCEL
    process.env.VERCEL = '1' // Simulate Vercel production runtime
    _resetRedisClient(null)   // Simulate unconfigured Redis

    try {
      const quota = new QuotaManager(testUsagePath)
      const reservation = await quota.reserveQuota()
      assert.equal(reservation.allowed, false)
      assert.equal(reservation.reason, 'STORAGE_UNAVAILABLE')
    } finally {
      if (origVercel !== undefined) {
        process.env.VERCEL = origVercel
      } else {
        delete process.env.VERCEL
      }
    }
  })

  /* ── 7. Vercel Serverless Function: GET /api/ai/status ── */
  it('handles GET /api/ai/status serverless handler cleanly', async () => {
    const req = { method: 'GET' }
    const res = createMockRes()

    await statusHandler(req, res)

    assert.equal(res.statusCode, 200)
    assert.equal(typeof res.body.dailyLimit, 'number')
    assert.equal(typeof res.body.usedToday, 'number')
    assert.equal(res.headers['access-control-allow-origin'], '*')
  })

  /* ── 8. Vercel Serverless Function: POST /api/ai/summary ── */
  it('handles POST /api/ai/summary validation and execution in serverless handler', async () => {
    // 1. Rejects invalid method
    const getRes = createMockRes()
    await summaryHandler({ method: 'GET' }, getRes)
    assert.equal(getRes.statusCode, 405)

    // 2. Rejects missing title
    const badRes = createMockRes()
    await summaryHandler({ method: 'POST', body: { articleId: '123' }, headers: {} }, badRes)
    assert.equal(badRes.statusCode, 400)

    // 3. Rejects missing articleId and canonicalUrl
    const missingIdRes = createMockRes()
    await summaryHandler({ method: 'POST', body: { title: 'Valid Title Here' }, headers: {} }, missingIdRes)
    assert.equal(missingIdRes.statusCode, 400)

    // 4. Handles valid request gracefully (fallback when API key missing)
    const validRes = createMockRes()
    await summaryHandler({
      method: 'POST',
      body: {
        articleId: 'test-serverless-post',
        title: 'Deep Space Telemetry Confirmed',
        desc: 'Antenna acquires signal from outer solar system probe.',
        isManual: true
      },
      headers: {}
    }, validRes)

    assert.equal(validRes.statusCode, 200)
    assert.ok(validRes.body.summary)
    assert.ok(validRes.body.summary.shortSummary.includes('Antenna acquires signal'))
  })

  /* ── 9. Vercel Serverless Function: GET /api/ai/summary/:articleId ── */
  it('handles dynamic route GET /api/ai/summary/:articleId in serverless handler', async () => {
    const { summaryCache } = (await import('../api/_lib/aiServices.js')).getAiServices()

    // 1. Missing cache entry -> 404
    const notFoundRes = createMockRes()
    await dynamicSummaryHandler({
      method: 'GET',
      query: { articleId: 'non-existent-article-xyz' }
    }, notFoundRes)
    assert.equal(notFoundRes.statusCode, 404)
    assert.equal(notFoundRes.body.cached, false)

    // 2. Seed cache entry
    await summaryCache.set(
      'cached-article-abc',
      'https://example.com/abc',
      { shortSummary: 'Cached summary test', detailedSummary: 'Details', eli12Summary: 'Fun' },
      'gemini-3.1-flash-lite',
      'test-hash'
    )

    // 3. Existing cache entry -> 200
    const foundRes = createMockRes()
    await dynamicSummaryHandler({
      method: 'GET',
      query: { articleId: 'cached-article-abc' }
    }, foundRes)
    assert.equal(foundRes.statusCode, 200)
    assert.equal(foundRes.body.cached, true)
    assert.equal(foundRes.body.summary.shortSummary, 'Cached summary test')
    assert.equal(foundRes.body.model, 'gemini-3.1-flash-lite')
  })

  /* ── 10. In-Flight Request Deduplication (Same Instance) ── */
  it('deduplicates concurrent in-flight requests for the same article', async () => {
    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    let callCount = 0
    service._executeSummaryGeneration = async (params) => {
      callCount++
      await new Promise(r => setTimeout(r, 40))
      return {
        success: true,
        fromCache: false,
        articleId: params.articleId,
        summary: { shortSummary: 'Artemis orbit verified', detailedSummary: 'Details', eli12Summary: 'Orbit' }
      }
    }

    const requests = Array.from({ length: 5 }, () =>
      service.getOrGenerateSummary({
        articleId: 'concurrent-mission-artemis',
        title: 'Artemis II Lunar Orbital Trajectory Confirmed',
        canonicalUrl: 'https://nasa.gov/artemis-2',
        desc: 'Flight directors lock in Orion lunar flyby trajectory.',
        category: 'Missions & Exploration',
        source: { name: 'NASA' }
      })
    )

    const results = await Promise.all(requests)
    assert.equal(callCount, 1)
    assert.equal(results.length, 5)
  })

  /* ── 11. Distributed Cross-Instance Request Coordination via Redis Lock ── */
  it('coordinates concurrent generations across instances via distributed Redis lock preventing duplicate Gemini calls', async () => {
    const mockRedis = new MockUpstashRedis()
    _resetRedisClient(mockRedis)

    const cacheA = new SummaryCache(join(TEST_DIR, 'cache-a.json'))
    const quotaA = new QuotaManager(join(TEST_DIR, 'quota-a.json'))
    const cacheB = new SummaryCache(join(TEST_DIR, 'cache-b.json'))
    const quotaB = new QuotaManager(join(TEST_DIR, 'quota-b.json'))

    // Two independent service instances simulating two separate Vercel function instances with isolated memory heaps
    const instanceA = new GeminiService(cacheA, quotaA)
    const instanceB = new GeminiService(cacheB, quotaB)

    let actualGeminiInvocations = 0

    instanceA.client = {
      models: {
        generateContent: async () => {
          actualGeminiInvocations++
          await new Promise(r => setTimeout(r, 60))
          return {
            text: JSON.stringify({
              shortSummary: 'Distributed test success.',
              detailedSummary: 'Generated once by Instance A and shared.',
              eli12Summary: 'Teamwork across computers!'
            })
          }
        }
      }
    }

    instanceB.client = {
      models: {
        generateContent: async () => {
          actualGeminiInvocations++
          return { text: '{}' }
        }
      }
    }

    const payload = {
      articleId: 'distributed-lock-article-1',
      title: 'Voyager Interstellar Magnetic Boundary Detected',
      canonicalUrl: 'https://nasa.gov/voyager-boundary',
      desc: 'Voyager instrument registers abrupt magnetic phase shift.',
      category: 'Research & Science',
      source: { name: 'NASA' },
      isManual: true
    }

    // Launch both instances concurrently
    const [resA, resB] = await Promise.all([
      instanceA.getOrGenerateSummary(payload),
      instanceB.getOrGenerateSummary(payload)
    ])

    // Only 1 actual call to Gemini should have executed
    assert.equal(actualGeminiInvocations, 1, 'Exactly one Gemini call should be made across instances')
    assert.equal(resA.success, true)
    assert.equal(resB.success, true)
    assert.equal(resB.fromCache, true, 'Instance B should receive summary populated in cache by Instance A')
    assert.equal(resB.summary.shortSummary, 'Distributed test success.')
  })

  /* ── 12. Conservative Quota Accounting on Ambiguous Failures vs Confirmed Errors ── */
  it('retains quota reservation on ambiguous timeout failures and only releases on confirmed provider errors', async () => {
    const mockRedis = new MockUpstashRedis()
    _resetRedisClient(mockRedis)

    const today = getTodayISTDate()
    await mockRedis.set(`cosmos:quota:${today}`, '5')

    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    // Case A: Ambiguous timeout failure (Gemini may have processed tokens)
    service.client = {
      models: {
        generateContent: async () => {
          throw new Error('Gemini API call timed out after 10000ms')
        }
      }
    }

    const timeoutRes = await service.getOrGenerateSummary({
      articleId: 'timeout-article',
      title: 'Deep Space Optical Communication Milestone Reached',
      canonicalUrl: 'https://nasa.gov/dsoc',
      desc: 'Laser signal sent across interplanetary distances.',
      category: 'Research & Science',
      source: { name: 'NASA' },
      isManual: true
    })

    assert.equal(timeoutRes.fallback, true)
    // Conservative accounting: Quota slot was reserved (5 -> 6) and MUST NOT be released
    const quotaAfterTimeout = await mockRedis.get(`cosmos:quota:${today}`)
    assert.equal(quotaAfterTimeout, '6', 'Quota slot must be RETAINED on ambiguous timeout failure')

    // Case B: Confirmed non-consuming provider error (rejected at Google gateway without token execution)
    service.client = {
      models: {
        generateContent: async () => {
          throw new Error('API key not valid. Please pass a valid API key.')
        }
      }
    }

    const confirmedRes = await service.getOrGenerateSummary({
      articleId: 'invalid-key-article',
      title: 'Galactic Core X-ray Flare Observed by Chandra',
      canonicalUrl: 'https://nasa.gov/chandra-core',
      desc: 'Supermassive black hole emission flare recorded.',
      category: 'Astronomy & Astrophysics',
      source: { name: 'NASA' },
      isManual: true
    })

    assert.equal(confirmedRes.fallback, true)
    // Confirmed non-consuming error: Quota slot was reserved (6 -> 7) then safely rolled back (7 -> 6)
    const quotaAfterConfirmed = await mockRedis.get(`cosmos:quota:${today}`)
    assert.equal(quotaAfterConfirmed, '6', 'Quota slot must be RELEASED on confirmed non-consuming error')
  })

  /* ── 12b. Gemini 503 Provider Overload Quota Release & Classification ── */
  it('releases quota reservation and returns PROVIDER_OVERLOADED on Gemini 503 high-demand error', async () => {
    const mockRedis = new MockUpstashRedis()
    _resetRedisClient(mockRedis)

    const today = getTodayISTDate()
    await mockRedis.set(`cosmos:quota:${today}`, '4')

    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    // Simulate Google Gemini SDK throwing 503 high-demand error
    const overloadError = new Error('503 — This model is currently experiencing high demand')
    overloadError.status = 503

    service.client = {
      models: {
        generateContent: async () => {
          throw overloadError
        }
      }
    }

    assert.equal(isGeminiOverloadError(overloadError), true)
    assert.equal(isConfirmedNonConsumingError(overloadError), true)

    const res = await service.getOrGenerateSummary({
      articleId: 'overloaded-gemini-article',
      title: 'Solar Wind Plasma Disruption Detected by Parker Probe',
      canonicalUrl: 'https://nasa.gov/parker-plasma',
      desc: 'Parker Solar Probe recorded intense plasma flux in the corona.',
      category: 'Research & Science',
      source: { name: 'NASA' },
      isManual: true
    })

    assert.equal(res.success, false)
    assert.equal(res.fallback, true)
    assert.equal(res.reason, 'PROVIDER_OVERLOADED')
    assert.match(res.error, /high demand/)
    assert.ok(res.summary.shortSummary)

    // Quota slot was reserved (4 -> 5) then RELEASED on 503 overload (5 -> 4)
    const quotaAfter503 = await mockRedis.get(`cosmos:quota:${today}`)
    assert.equal(quotaAfter503, '4', 'Quota slot must be RELEASED on confirmed 503 overload error')

    // Also test structured JSON error body often returned by @google/genai
    const structured503 = new Error(JSON.stringify({
      error: {
        code: 503,
        message: 'This model is currently experiencing high demand',
        status: 'UNAVAILABLE'
      }
    }))
    structured503.status = 503
    assert.equal(isGeminiOverloadError(structured503), true)

    service.client = {
      models: {
        generateContent: async () => {
          throw structured503
        }
      }
    }

    const resJson = await service.getOrGenerateSummary({
      articleId: 'overloaded-json-article',
      title: 'Solar Wind Plasma Disruption Detected by Parker Probe 2',
      canonicalUrl: 'https://nasa.gov/parker-plasma-2',
      desc: 'Parker Solar Probe recorded intense plasma flux.',
      category: 'Research & Science',
      source: { name: 'NASA' },
      isManual: true
    })

    assert.equal(resJson.reason, 'PROVIDER_OVERLOADED')
    const quotaAfterJson503 = await mockRedis.get(`cosmos:quota:${today}`)
    assert.equal(quotaAfterJson503, '4', 'Quota slot must be RELEASED on structured JSON 503 error')
  })

  /* ── 12c. Conservative Quota Accounting on Network Disconnects & Ambiguous 5xx ── */
  it('retains quota reservation on socket hangup, network disconnect, and ambiguous 500 error', async () => {
    const mockRedis = new MockUpstashRedis()
    _resetRedisClient(mockRedis)

    const today = getTodayISTDate()
    await mockRedis.set(`cosmos:quota:${today}`, '7')

    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    // 1. Socket hang up
    const socketErr = new Error('socket hang up')
    assert.equal(isGeminiOverloadError(socketErr), false)
    assert.equal(isConfirmedNonConsumingError(socketErr), false)

    service.client = {
      models: {
        generateContent: async () => {
          throw socketErr
        }
      }
    }

    const resSocket = await service.getOrGenerateSummary({
      articleId: 'socket-drop-article',
      title: 'Supermassive Black Hole Jet Ejection Tracked',
      canonicalUrl: 'https://eso.org/black-hole-jet',
      desc: 'Very Large Telescope arrays tracked relativistic jet.',
      category: 'Astronomy & Astrophysics',
      source: { name: 'ESO' },
      isManual: true
    })

    assert.equal(resSocket.fallback, true)
    assert.equal(resSocket.reason, 'API_ERROR')
    // Quota slot RETAINED (7 -> 8)
    const quotaAfterSocket = await mockRedis.get(`cosmos:quota:${today}`)
    assert.equal(quotaAfterSocket, '8', 'Quota slot must be RETAINED on socket hang up')

    // 2. Ambiguous 500 Internal Server Error
    const err500 = new Error('500 Internal Server Error')
    assert.equal(isGeminiOverloadError(err500), false)
    assert.equal(isConfirmedNonConsumingError(err500), false)

    service.client = {
      models: {
        generateContent: async () => {
          throw err500
        }
      }
    }

    const res500 = await service.getOrGenerateSummary({
      articleId: 'error-500-article',
      title: 'Interstellar Comet Trajectory Calculation Completed',
      canonicalUrl: 'https://nasa.gov/interstellar-comet',
      desc: 'Deep space trajectory confirmed hyperbolic orbit.',
      category: 'Research & Science',
      source: { name: 'NASA' },
      isManual: true
    })

    assert.equal(res500.fallback, true)
    assert.equal(res500.reason, 'API_ERROR')
    // Quota slot RETAINED (8 -> 9)
    const quotaAfter500 = await mockRedis.get(`cosmos:quota:${today}`)
    assert.equal(quotaAfter500, '9', 'Quota slot must be RETAINED on ambiguous 500 error')
  })

  /* ── 12d. Production Vercel Caching vs Local Development Fallback ── */
  it('SummaryCache in Vercel production does not attempt local JSON writes and rejects unconfigured Redis', async () => {
    const originalVercel = process.env.VERCEL
    process.env.VERCEL = '1'

    try {
      // 1. Without Redis configured on Vercel: must throw operational error and NOT write to local filesystem
      _resetRedisClient(null)
      const vercelCachePath = join(TEST_DIR, 'nonexistent-vercel-data', 'summary-cache.json')
      const cache = new SummaryCache(vercelCachePath)

      await assert.rejects(
        async () => {
          await cache.get('any-article-id', 'https://example.com/any')
        },
        /Upstash Redis cache not configured in production environment/
      )

      await assert.rejects(
        async () => {
          await cache.set('any-article-id', 'https://example.com/any', { shortSummary: 'Test' })
        },
        /Upstash Redis cache not configured in production environment/
      )

      // Verify that local file was NEVER created
      assert.equal(existsSync(vercelCachePath), false, 'Vercel cache must NEVER create local cache files')

      // 2. With Redis configured on Vercel: writes to Redis and does NOT create local JSON files
      const mockRedis = new MockUpstashRedis()
      _resetRedisClient(mockRedis)

      const redisCache = new SummaryCache(vercelCachePath)
      await redisCache.set('vercel-cached-art', 'https://nasa.gov/vercel-cached', {
        shortSummary: 'Stored in Upstash Redis',
        detailedSummary: 'Detailed text',
        eli12Summary: 'Simple text'
      })

      const fromRedis = await redisCache.get('vercel-cached-art')
      assert.equal(fromRedis.summary.shortSummary, 'Stored in Upstash Redis')
      assert.equal(existsSync(vercelCachePath), false, 'Vercel cache must NOT write to local disk even when successful')
    } finally {
      if (originalVercel !== undefined) {
        process.env.VERCEL = originalVercel
      } else {
        delete process.env.VERCEL
      }
      _resetRedisClient(null)
    }
  })

  it('SummaryCache in local development uses local file fallback when Redis is unconfigured', async () => {
    delete process.env.VERCEL
    _resetRedisClient(null)

    const localCachePath = join(TEST_DIR, 'local-dev-cache.json')
    const cache = new SummaryCache(localCachePath)

    await cache.set('local-art-1', 'https://nasa.gov/local-art', {
      shortSummary: 'Local file summary',
      detailedSummary: 'Local detailed',
      eli12Summary: 'Local eli12'
    })

    assert.equal(existsSync(localCachePath), true, 'Local dev must write to local file cache')
    const reloaded = new SummaryCache(localCachePath)
    const hit = await reloaded.get('local-art-1')
    assert.equal(hit.summary.shortSummary, 'Local file summary')
  })

  /* ── 13. Rate Limiting via Upstash Redis ── */
  it('enforces distributed client IP rate limit of max 10 requests per minute via Redis', async () => {
    const mockRedis = new MockUpstashRedis()
    _resetRedisClient(mockRedis)
    const quota = new QuotaManager(testUsagePath)

    const testIp = '203.0.113.195'

    for (let i = 1; i <= 10; i++) {
      assert.equal(await quota.checkRateLimit(testIp), true, `Request #${i} should pass`)
    }

    assert.equal(await quota.checkRateLimit(testIp), false, '11th request must be rejected')
    assert.equal(await quota.checkRateLimit('198.51.100.44'), true, 'Different IP should pass')
  })

  /* ── 14. Frontend Secret Leakage Audit ── */
  it('confirms no Gemini or Upstash credentials are embedded in frontend source files', () => {
    const srcDir = resolve(process.cwd(), 'src')
    const files = [
      'utils/ai.js',
      'views/FeedView.jsx',
      'components/NewsCard.jsx',
      'components/Modal.jsx',
      'App.jsx'
    ]

    for (const rel of files) {
      const full = join(srcDir, rel)
      if (existsSync(full)) {
        const text = readFileSync(full, 'utf8')
        assert.equal(text.includes('VITE_GEMINI_API_KEY'), false, `Forbidden VITE_GEMINI_API_KEY in ${rel}`)
        assert.equal(text.includes('GEMINI_API_KEY'), false, `Server key GEMINI_API_KEY in frontend ${rel}`)
        assert.equal(text.includes('UPSTASH'), false, `Redis credential referenced in frontend ${rel}`)
        assert.equal(text.includes('REDIS'), false, `Redis keyword referenced in frontend ${rel}`)
        assert.equal(text.includes('VITE_ANTHROPIC_API_KEY'), false, `Obsolete VITE_ANTHROPIC_API_KEY in ${rel}`)
      }
    }
  })

  /* ── 15. Upstash Environment Variable Compatibility & Safety ── */
  describe('Upstash Environment Variable Resolution & Safety', () => {
    const originalEnv = { ...process.env }

    beforeEach(() => {
      delete process.env.UPSTASH_REDIS_REST_KV_REST_API_URL
      delete process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN
      delete process.env.UPSTASH_REDIS_REST_KV_REST_API_READ_ONLY_TOKEN
      delete process.env.UPSTASH_REDIS_REST_REDIS_URL
      delete process.env.UPSTASH_REDIS_REST_KV_URL
      delete process.env.KV_REST_API_URL
      delete process.env.KV_REST_API_TOKEN
      delete process.env.KV_REST_API_READ_ONLY_TOKEN
      delete process.env.UPSTASH_REDIS_REST_URL
      delete process.env.UPSTASH_REDIS_REST_TOKEN
      _resetRedisClient(null)
    })

    afterEach(() => {
      process.env = { ...originalEnv }
      _resetRedisClient(null)
    })

    it('resolves Vercel Marketplace Upstash integration variables as primary', () => {
      process.env.UPSTASH_REDIS_REST_KV_REST_API_URL = 'https://vercel-kv.upstash.io'
      process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN = 'token-rw-123'

      const creds = resolveRedisCredentials()
      assert.equal(creds.isConfigured, true)
      assert.equal(creds.url, 'https://vercel-kv.upstash.io')
      assert.equal(creds.token, 'token-rw-123')
      assert.equal(creds.resolvedVarNames.urlVar, 'UPSTASH_REDIS_REST_KV_REST_API_URL')
      assert.equal(creds.resolvedVarNames.tokenVar, 'UPSTASH_REDIS_REST_KV_REST_API_TOKEN')
      assert.equal(isRedisConfigured(), true)
    })

    it('falls back to local development variables UPSTASH_REDIS_REST_URL / TOKEN', () => {
      process.env.UPSTASH_REDIS_REST_URL = 'https://local-dev.upstash.io'
      process.env.UPSTASH_REDIS_REST_TOKEN = 'local-token-456'

      const creds = resolveRedisCredentials()
      assert.equal(creds.isConfigured, true)
      assert.equal(creds.url, 'https://local-dev.upstash.io')
      assert.equal(creds.token, 'local-token-456')
      assert.equal(creds.resolvedVarNames.urlVar, 'UPSTASH_REDIS_REST_URL')
      assert.equal(creds.resolvedVarNames.tokenVar, 'UPSTASH_REDIS_REST_TOKEN')
      assert.equal(isRedisConfigured(), true)
    })

    it('detects and rejects read-only token when passed as primary token', () => {
      process.env.UPSTASH_REDIS_REST_KV_REST_API_URL = 'https://vercel-kv.upstash.io'
      process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN = 'ro-token-abc'
      process.env.UPSTASH_REDIS_REST_KV_REST_API_READ_ONLY_TOKEN = 'ro-token-abc'

      const creds = resolveRedisCredentials()
      assert.equal(creds.isConfigured, false, 'Client must NOT be configured with read-only token')
      assert.equal(creds.isReadOnly, true)
      assert.equal(isRedisConfigured(), false)
      assert.equal(getRedisClient(), null, 'getRedisClient must return null on read-only token')
    })

    it('rejects native TCP redis:// protocol URLs for @upstash/redis REST client', () => {
      process.env.UPSTASH_REDIS_REST_KV_REST_API_URL = 'redis://default:secret@my-db.upstash.io:6379'
      process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN = 'valid-token'

      const creds = resolveRedisCredentials()
      assert.equal(creds.isConfigured, false, 'TCP redis:// protocol must be rejected for REST client')
      assert.equal(creds.isTcpUrl, true)
      assert.equal(isRedisConfigured(), false)
      assert.equal(getRedisClient(), null)
    })

    it('handles completely missing credentials safely without crashing', () => {
      const creds = resolveRedisCredentials()
      assert.equal(creds.isConfigured, false)
      assert.equal(creds.url, '')
      assert.equal(creds.token, '')
      assert.equal(isRedisConfigured(), false)
      assert.equal(getRedisClient(), null)
    })
  })
})
