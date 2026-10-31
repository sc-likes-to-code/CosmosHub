import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import {
  fallbackSummary,
  fallbackContext,
  getCachedAiSummary,
  setCachedAiSummary,
  getAiStatus,
  getMultiSummary
} from '../src/utils/ai.js'

describe('CosmosHub Frontend AI Summarization Integration Tests', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('generates predictable fallbacks for summary and context', () => {
    const summary = fallbackSummary('James Webb Space Telescope detects organic molecules in distant proto-planetary disk.')
    assert.strictEqual(typeof summary.shortSummary, 'string')
    assert.strictEqual(typeof summary.detailedSummary, 'string')
    assert.strictEqual(typeof summary.eli12Summary, 'string')
    assert.match(summary.shortSummary, /James Webb Space Telescope/)

    const context = fallbackContext('Test description')
    assert.strictEqual(typeof context.background, 'string')
    assert.strictEqual(typeof context.importance, 'string')
    assert.ok(Array.isArray(context.related))
  })

  it('stores and retrieves items from client in-memory cache without network requests', () => {
    const articleId = 'test-cache-id-123'
    const cachedData = {
      articleId,
      canonicalUrl: 'https://nasa.gov/sample-transmission',
      summary: {
        shortSummary: 'Cached short synthesis.',
        detailedSummary: 'Cached deep dive synthesis.',
        eli12Summary: 'Cached simple synthesis.'
      },
      fromCache: true
    }

    setCachedAiSummary(articleId, cachedData)

    const retrievedById = getCachedAiSummary(articleId)
    assert.deepStrictEqual(retrievedById, cachedData)

    const retrievedByUrl = getCachedAiSummary(null, 'https://nasa.gov/sample-transmission')
    assert.deepStrictEqual(retrievedByUrl, cachedData)
  })

  it('caches getAiStatus responses for 60 seconds unless forceRefresh is true', async () => {
    let fetchCount = 0
    globalThis.fetch = async (url) => {
      fetchCount++
      assert.strictEqual(url, '/api/ai/status')
      return {
        ok: true,
        json: async () => ({
          status: 'operational',
          configuredModel: 'gemini-3.1-flash-lite',
          todayIST: '2026-10-31',
          dailyBudget: {
            configuredLimit: 15,
            usedToday: 3,
            remainingToday: 12
          }
        })
      }
    }

    // Call 1: initial fetch
    const status1 = await getAiStatus(true)
    assert.strictEqual(fetchCount, 1)
    assert.strictEqual(status1.dailyBudget.remainingToday, 12)

    // Call 2: within 60s, should use cachedStatus
    const status2 = await getAiStatus(false)
    assert.strictEqual(fetchCount, 1, 'Should not have made a second network call')
    assert.strictEqual(status2.dailyBudget.remainingToday, 12)

    // Call 3: forceRefresh = true, bypasses cache
    const status3 = await getAiStatus(true)
    assert.strictEqual(fetchCount, 2, 'Should make a network call when forceRefresh is true')
    assert.strictEqual(status3.dailyBudget.remainingToday, 12)
  })

  it('handles getAiStatus network failure gracefully without throwing', async () => {
    globalThis.fetch = async () => {
      throw new Error('Network offline')
    }

    const result = await getAiStatus(true)
    assert.strictEqual(result, null)
  })

  it('sends correct payload including isManual: true on manual getMultiSummary call', async () => {
    let requestPayload = null
    let requestHeaders = null
    let requestMethod = null

    globalThis.fetch = async (url, options) => {
      requestMethod = options.method
      requestHeaders = options.headers
      requestPayload = JSON.parse(options.body)

      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          fromCache: false,
          model: 'gemini-3.1-flash-lite',
          articleId: requestPayload.articleId,
          summary: {
            shortSummary: 'High-energy cosmic ray detected.',
            detailedSummary: 'Deep observatory telemetry detected high-energy cosmic rays from deep space.',
            eli12Summary: 'Scientists spotted a super powerful space ray.'
          }
        })
      }
    }

    const res = await getMultiSummary(
      'Ultra-High Energy Cosmic Ray Detected',
      'Observatory instruments recorded an unprecedented cosmic ray burst.',
      {
        articleId: 'ray-art-99',
        link: 'https://esa.int/cosmic-ray',
        category: 'Astrophysics',
        source: { name: 'ESA', key: 'esa' }
      }
    )

    assert.strictEqual(requestMethod, 'POST')
    assert.strictEqual(requestHeaders['Content-Type'], 'application/json')
    assert.strictEqual(requestPayload.articleId, 'ray-art-99')
    assert.strictEqual(requestPayload.title, 'Ultra-High Energy Cosmic Ray Detected')
    assert.strictEqual(requestPayload.canonicalUrl, 'https://esa.int/cosmic-ray')
    assert.strictEqual(requestPayload.category, 'Astrophysics')
    assert.strictEqual(requestPayload.source.name, 'ESA')
    assert.strictEqual(requestPayload.isManual, true)

    assert.strictEqual(res.success, true)
    assert.strictEqual(res.fromCache, false)
    assert.strictEqual(res.shortSummary, 'High-energy cosmic ray detected.')
    assert.strictEqual(res.detailedSummary, 'Deep observatory telemetry detected high-energy cosmic rays from deep space.')
    assert.strictEqual(res.eli12Summary, 'Scientists spotted a super powerful space ray.')

    // Verify subsequent call hits in-memory cache without network call
    let secondNetworkHit = false
    globalThis.fetch = async () => {
      secondNetworkHit = true
      throw new Error('Should not be called')
    }

    const cachedRes = await getMultiSummary(
      'Ultra-High Energy Cosmic Ray Detected',
      'Observatory instruments recorded an unprecedented cosmic ray burst.',
      { articleId: 'ray-art-99' }
    )

    assert.strictEqual(secondNetworkHit, false)
    assert.strictEqual(cachedRes.fromCache, true)
    assert.strictEqual(cachedRes.shortSummary, 'High-energy cosmic ray detected.')
  })

  it('handles 429 rate limit responses gracefully', async () => {
    globalThis.fetch = async () => {
      return {
        ok: false,
        status: 429,
        json: async () => ({
          success: false,
          error: 'Rate limit exceeded. Please wait a minute before retrying.'
        })
      }
    }

    const res = await getMultiSummary(
      'Rate Limit Target Article',
      'Test description',
      { articleId: 'rate-limited-art' }
    )

    assert.strictEqual(res.success, false)
    assert.strictEqual(res.fallback, true)
    assert.strictEqual(res.isRateLimited, true)
    assert.strictEqual(res.isQuotaExceeded, false)
    assert.match(res.error, /Rate limit exceeded/)
    assert.ok(res.shortSummary)
  })

  it('handles daily quota exhaustion responses (DAILY_BUDGET_EXCEEDED)', async () => {
    globalThis.fetch = async () => {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: false,
          reason: 'DAILY_BUDGET_EXCEEDED',
          error: 'Daily AI summary limit (15/15) reached. Resets at midnight IST.',
          summary: {
            shortSummary: 'Source excerpt.',
            detailedSummary: 'Source excerpt detailed.',
            eli12Summary: 'Source excerpt simple.'
          }
        })
      }
    }

    const res = await getMultiSummary(
      'Budget Limit Target Article',
      'Test description',
      { articleId: 'budget-exhausted-art' }
    )

    assert.strictEqual(res.success, false)
    assert.strictEqual(res.fallback, true)
    assert.strictEqual(res.isQuotaExceeded, true)
    assert.strictEqual(res.reason, 'DAILY_BUDGET_EXCEEDED')
    assert.match(res.error, /Daily AI summary limit/)
  })

  it('handles server 500 errors and network failures safely with fallback content', async () => {
    globalThis.fetch = async () => {
      return {
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal Gemini provider outage' })
      }
    }

    const res500 = await getMultiSummary(
      'Server Error Target Article',
      'Test description of space anomaly.',
      { articleId: 'server-err-art' }
    )

    assert.strictEqual(res500.success, false)
    assert.strictEqual(res500.fallback, true)
    assert.strictEqual(res500.error, 'Internal Gemini provider outage')
    assert.strictEqual(res500.shortSummary, 'Test description of space anomaly.')

    // Now test unexpected network throw
    globalThis.fetch = async () => {
      throw new Error('Connection refused')
    }

    const resNetwork = await getMultiSummary(
      'Network Error Target Article',
      'Fallback space description.',
      { articleId: 'net-err-art' }
    )

    assert.strictEqual(resNetwork.success, false)
    assert.strictEqual(resNetwork.fallback, true)
    assert.strictEqual(resNetwork.shortSummary, 'Fallback space description.')
  })

  it('guarantees zero API calls on invalid title', async () => {
    let called = false
    globalThis.fetch = async () => {
      called = true
      throw new Error('Should not be called')
    }

    const res = await getMultiSummary('   ', 'Desc')
    assert.strictEqual(called, false)
    assert.strictEqual(res.success, false)
    assert.strictEqual(res.fallback, true)
  })
})
