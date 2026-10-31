import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { SummaryCache, computeContentHash } from '../server/summaryCache.js'
import { QuotaManager, getTodayISTDate } from '../server/quotaManager.js'
import { GeminiService, generateFallbackSummary } from '../server/geminiService.js'

describe('CosmosHub Phase 2 — Secure Gemini Infrastructure Tests', () => {
  const TEST_DIR = resolve(process.cwd(), 'tests/tmp-gemini')
  const testCachePath = join(TEST_DIR, 'test-summary-cache.json')
  const testUsagePath = join(TEST_DIR, 'test-ai-usage.json')

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
  })

  afterEach(() => {
    try {
      rmSync(TEST_DIR, { recursive: true, force: true })
    } catch {}
  })

  /* ── 1. Configuration & Security Verification ── */
  it('loads configuration securely without exposing keys in frontend code', () => {
    const quota = new QuotaManager(testUsagePath)
    const status = quota.getStatus()

    assert.equal(typeof status.enabled, 'boolean')
    assert.equal(typeof status.configured, 'boolean')
    assert.equal(typeof status.dailyLimit, 'number')
    assert.equal(status.dailyLimit, 15)
    assert.equal(typeof status.usedToday, 'number')
    assert.equal(typeof status.remainingToday, 'number')
    // Ensure no secret or key is ever returned in status
    assert.equal('apiKey' in status, false)
    assert.equal('geminiKey' in status, false)
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

    const initialUsage = quota.getStatus().usedToday

    // Seed cache manually (simulating previously stored summary)
    const articleId = 'jwst-supernova-2026'
    const canonicalUrl = 'https://esa.int/news/jwst-supernova'
    const storedSummary = {
      shortSummary: 'JWST captures earliest known supernova.',
      detailedSummary: 'Deep infrared imaging reveals stellar explosion 13 billion light years away.',
      eli12Summary: 'Telescope spots an exploding star from when the universe was very young.'
    }
    const hash = computeContentHash('JWST Supernova Title', 'Description of supernova')

    cache.set(articleId, canonicalUrl, storedSummary, 'gemini-2.0-flash', hash, 'completed')

    // Retrieve via service
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
    assert.equal(result.model, 'gemini-2.0-flash')
    assert.deepEqual(result.summary, storedSummary)
    // Verify 0 quota consumed
    assert.equal(quota.getStatus().usedToday, initialUsage)
  })

  /* ── 4. Daily Budget Enforcement & Persistence Across Restarts ── */
  it('enforces daily summary limit and persists quota counts across server restarts', () => {
    const quota1 = new QuotaManager(testUsagePath)

    // Consume 14 summaries
    for (let i = 1; i <= 14; i++) {
      assert.equal(quota1.canConsume(), true)
      quota1.recordUsage(`art-${i}`, 'gemini-2.0-flash', 'success')
    }

    assert.equal(quota1.getStatus().usedToday, 14)
    assert.equal(quota1.getStatus().remainingToday, 1)
    assert.equal(quota1.canConsume(), true)

    // 15th summary consumes last remaining slot
    quota1.recordUsage('art-15', 'gemini-2.0-flash', 'success')
    assert.equal(quota1.getStatus().usedToday, 15)
    assert.equal(quota1.getStatus().remainingToday, 0)
    assert.equal(quota1.canConsume(), false)

    // Simulate server restart: new QuotaManager instance reading the same file
    const quota2 = new QuotaManager(testUsagePath)
    assert.equal(quota2.getStatus().usedToday, 15)
    assert.equal(quota2.canConsume(), false, 'Budget must remain exhausted after restart')
  })

  /* ── 5. Date Rollover Resets Daily Budget ── */
  it('automatically resets quota on calendar day rollover in IST', () => {
    // Write usage data attributed to yesterday
    const yesterdayData = {
      version: 1,
      date: '2026-10-30', // Yesterday
      dailyLimit: 15,
      usedCount: 15,
      requests: []
    }
    writeFileSync(testUsagePath, JSON.stringify(yesterdayData, null, 2), 'utf8')

    // Today's manager should detect date mismatch and reset
    const quota = new QuotaManager(testUsagePath)
    const status = quota.getStatus()

    assert.equal(status.date, getTodayISTDate())
    assert.equal(status.usedToday, 0, 'New calendar day must reset used count to 0')
    assert.equal(quota.canConsume(), true)
  })

  /* ── 6. In-Flight Request Deduplication ── */
  it('deduplicates concurrent in-flight requests for the same article', async () => {
    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    let callCount = 0
    // Mock internal execution to simulate slow API call
    service._executeSummaryGeneration = async (params) => {
      callCount++
      await new Promise(r => setTimeout(r, 50))
      return {
        success: true,
        fromCache: false,
        articleId: params.articleId,
        summary: generateFallbackSummary(params.desc)
      }
    }

    // Fire 5 concurrent requests simultaneously
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
    assert.equal(callCount, 1, 'Expected exactly 1 execution for 5 concurrent requests')
    assert.equal(results.length, 5)
    results.forEach(res => assert.equal(res.articleId, 'concurrent-mission-artemis'))
  })

  /* ── 7. Rate Limiter (Max 10 per minute per IP) ── */
  it('enforces client IP rate limit of max 10 requests per minute', () => {
    const quota = new QuotaManager(testUsagePath)
    const testIp = '192.168.1.100'

    // First 10 requests within 60s should succeed
    for (let i = 1; i <= 10; i++) {
      assert.equal(quota.checkRateLimit(testIp), true, `Request #${i} should pass rate limit`)
    }

    // 11th request must be rejected
    assert.equal(quota.checkRateLimit(testIp), false, 'Request #11 should be rejected by rate limit')

    // Different IP should still be allowed
    assert.equal(quota.checkRateLimit('192.168.1.101'), true)
  })

  /* ── 8. Importance Scoring Algorithm ── */
  it('correctly calculates importance score and filters routine non-scientific articles', () => {
    const quota = new QuotaManager(testUsagePath)

    const majorDiscovery = {
      title: 'James Webb Space Telescope Discovers Massive Black Hole in Early Universe',
      desc: 'Astronomers detect unexpected supermassive singularity with gravitational spectroscopy.',
      category: 'Astronomy & Astrophysics',
      source: { name: 'NASA' }
    }
    assert.ok(quota.scoreImportance(majorDiscovery) >= 3)
    assert.equal(quota.isEligibleForAutoSummary(majorDiscovery), true)

    const routinePost = {
      title: 'NASA Headquarters Announces Routine Parking Permit Updates for Employees',
      desc: 'Administrative regulations regarding facility maintenance in building four.',
      category: 'Other Space Transmissions',
      source: { name: 'SpaceNews' }
    }
    assert.ok(quota.scoreImportance(routinePost) < 3)
    assert.equal(quota.isEligibleForAutoSummary(routinePost), false)
  })

  /* ── 9. Quota Exhaustion & Error Graceful Fallback ── */
  it('handles simulated Gemini quota exhaustion gracefully without crashing', async () => {
    const cache = new SummaryCache(testCachePath)
    const quota = new QuotaManager(testUsagePath)
    const service = new GeminiService(cache, quota)

    // Mock client to simulate a 429 quota exhaustion
    service.client = {
      models: {
        generateContent: async () => {
          throw new Error('429 RESOURCE_EXHAUSTED: Quota exceeded for model gemini-2.0-flash')
        }
      }
    }

    const result = await service.getOrGenerateSummary({
      articleId: 'quota-test-art',
      title: 'Major Breakthrough in Gravitational Wave Astrophysics',
      canonicalUrl: 'https://ligo.org/discovery',
      desc: 'LIGO Virgo KAGRA detectors record neutron star collision signal.',
      category: 'Research & Science',
      source: { name: 'LIGO' },
      isManual: true
    })

    assert.equal(result.success, false)
    assert.equal(result.fallback, true)
    assert.equal(result.reason, 'QUOTA_EXHAUSTED')
    assert.equal(result.model, 'fallback-rss')
    assert.ok(result.summary.shortSummary.includes('LIGO Virgo'))
  })

  /* ── 10. Frontend Secret Leakage Audit ── */
  it('confirms no Gemini or Anthropic API keys are embedded in frontend source files', () => {
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
        assert.equal(text.includes('VITE_GEMINI_API_KEY'), false, `Forbidden VITE_GEMINI_API_KEY found in ${rel}`)
        assert.equal(text.includes('GEMINI_API_KEY'), false, `Server key GEMINI_API_KEY directly referenced in frontend ${rel}`)
        assert.equal(text.includes('VITE_ANTHROPIC_API_KEY'), false, `Obsolete VITE_ANTHROPIC_API_KEY found in ${rel}`)
        assert.equal(text.includes('api.anthropic.com'), false, `Anthropic API endpoint found in ${rel}`)
      }
    }
  })
})
