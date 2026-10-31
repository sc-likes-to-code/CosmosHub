import { GoogleGenAI } from '@google/genai'
import { computeContentHash } from './summaryCache.js'
import { getRedisClient } from './redisClient.js'

export function generateFallbackSummary(desc) {
  const safe = String(desc || 'No summary available.').trim()
  const short = safe.length > 140 ? safe.slice(0, 140).trim() + '...' : safe
  return {
    shortSummary: short || 'No summary available.',
    detailedSummary: safe || 'No detailed summary available.',
    eli12Summary: short || 'No summary available.'
  }
}

/**
 * Detects whether an error from Google Gemini is a confirmed provider overload / 503 rejection.
 *
 * In this state, Google's gateway explicitly rejected the request prior to token generation
 * due to transient server capacity or high demand. It is safe to release reserved quota.
 *
 * Checks both SDK error properties (.status, .code, .statusCode) and structured error bodies,
 * while strictly excluding client timeouts, network drops, and ambiguous 5xx errors.
 */
export function isGeminiOverloadError(err) {
  if (!err) return false

  // 1. Direct status / code inspection on SDK error object (e.g., ApiError)
  const status = err.status || err.statusCode || err.code
  const is503Status = status === 503 || status === '503' || status === 'UNAVAILABLE'

  const rawMsg = String(err.message || err)
  const lowerMsg = rawMsg.toLowerCase()

  // Strict safeguard: Must NOT be a client-side timeout, socket drop, or network disconnect
  if (
    lowerMsg.includes('timed out') ||
    lowerMsg.includes('econnreset') ||
    lowerMsg.includes('etimedout') ||
    lowerMsg.includes('enotfound') ||
    lowerMsg.includes('socket hang up') ||
    err.name === 'AbortError'
  ) {
    return false
  }

  // 2. Structured JSON error body inspection (often serialized into err.message by @google/genai)
  if (rawMsg.startsWith('{') || rawMsg.includes('{"error"')) {
    try {
      const match = rawMsg.match(/\{[\s\S]*\}/)
      if (match) {
        const parsed = JSON.parse(match[0])
        const errObj = parsed.error || parsed
        if (
          errObj.code === 503 ||
          errObj.status === 'UNAVAILABLE' ||
          (typeof errObj.message === 'string' && (
            errObj.message.toLowerCase().includes('high demand') ||
            errObj.message.toLowerCase().includes('overloaded')
          ))
        ) {
          return true
        }
      }
    } catch {}
  }

  // 3. Status code 503 from SDK
  if (is503Status) {
    return true
  }

  // 4. Specific high-demand / overload phrases from Google's gateway
  if (
    lowerMsg.includes('experiencing high demand') ||
    lowerMsg.includes('model is overloaded') ||
    lowerMsg.includes('temporarily overloaded') ||
    (lowerMsg.includes('503') && (
      lowerMsg.includes('unavailable') ||
      lowerMsg.includes('demand') ||
      lowerMsg.includes('overload') ||
      lowerMsg.includes('capacity')
    ))
  ) {
    return true
  }

  return false
}

/**
 * Distinguishes between confirmed non-consuming errors (where Google gateway explicitly
 * rejected the request before generation, safe to release quota) versus ambiguous outcomes
 * (timeouts, socket disconnects, 5xx server errors, JSON parse failures where Gemini
 * may have processed tokens and charged quota).
 */
export function isConfirmedNonConsumingError(err) {
  if (!err) return false

  // Confirmed 503 overload rejection is non-consuming
  if (isGeminiOverloadError(err)) return true

  const msg = String(err.message || err).toLowerCase()
  const status = err.status || err.statusCode || err.code

  if (status === 400 || status === 401 || status === 403 || status === 404 || status === 429) {
    return true
  }

  return (
    msg.includes('api key not valid') ||
    msg.includes('invalid_argument') ||
    msg.includes('permission_denied') ||
    msg.includes('not_found') ||
    msg.includes('resource_exhausted') ||
    msg.includes('api_key_invalid') ||
    msg.includes('400 bad request') ||
    msg.includes('403 forbidden') ||
    msg.includes('404 not found') ||
    msg.includes('429')
  )
}

export class GeminiService {
  constructor(summaryCache, quotaManager) {
    this.cache = summaryCache
    this.quota = quotaManager
    this.modelName = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite'
  }

  set client(c) {
    this._customClient = c
  }

  get client() {
    if (this._customClient !== undefined) return this._customClient
    const key = process.env.GEMINI_API_KEY
    if (!key || !key.trim()) return null
    try {
      return new GoogleGenAI({ apiKey: key.trim() })
    } catch (err) {
      console.warn('[GeminiService] Failed to initialize GoogleGenAI client:', err.message)
      return null
    }
  }

  async getOrGenerateSummary({
    articleId,
    title,
    canonicalUrl,
    desc,
    category,
    source,
    isManual = false
  }) {
    const key = articleId || canonicalUrl
    if (!key) {
      throw new Error('Missing articleId or canonicalUrl')
    }

    const contentHash = computeContentHash(title, desc)

    // 1. Check persistent summary cache (Redis primary, local fallback)
    // Cache hits consume ZERO Gemini quota and ZERO quota reservations
    const cached = await this.cache.get(articleId, canonicalUrl)
    if (cached && cached.summary) {
      if (!cached.contentHash || cached.contentHash === contentHash) {
        return {
          success: true,
          fromCache: true,
          articleId: cached.articleId,
          canonicalUrl: cached.canonicalUrl,
          summary: cached.summary,
          model: cached.model,
          createdAt: cached.createdAt,
          status: cached.status
        }
      }
    }

    // 2. In-memory concurrent request deduplication (same function container)
    const inFlightKey = articleId || canonicalUrl
    if (this.quota.inFlightRequests.has(inFlightKey)) {
      return this.quota.inFlightRequests.get(inFlightKey)
    }

    const executionPromise = (async () => {
      // 3. Distributed Redis lock for cross-instance request deduplication
      const redis = getRedisClient()
      let lockKey = null
      let lockToken = null
      let lockAcquired = false

      if (redis) {
        lockKey = `cosmos:lock:${inFlightKey}`
        lockToken = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        try {
          // Attempt to acquire distributed lock for 25 seconds
          const res = await redis.set(lockKey, lockToken, { nx: true, ex: 25 })
          lockAcquired = (res === 'OK' || res === true || res === 1)

          if (!lockAcquired) {
            // Another instance is generating this summary. Wait and poll cache.
            const pollStart = Date.now()
            while (Date.now() - pollStart < 12000) {
              await new Promise(resolve => setTimeout(resolve, 350))
              const newlyCached = await this.cache.get(articleId, canonicalUrl)
              if (newlyCached && newlyCached.summary) {
                return {
                  success: true,
                  fromCache: true,
                  articleId: newlyCached.articleId,
                  canonicalUrl: newlyCached.canonicalUrl,
                  summary: newlyCached.summary,
                  model: newlyCached.model,
                  createdAt: newlyCached.createdAt,
                  status: newlyCached.status
                }
              }

              const currentHolder = await redis.get(lockKey)
              if (!currentHolder) {
                // Lock expired or was released by leader; double check cache
                const finalCheck = await this.cache.get(articleId, canonicalUrl)
                if (finalCheck && finalCheck.summary) {
                  return {
                    success: true,
                    fromCache: true,
                    articleId: finalCheck.articleId,
                    canonicalUrl: finalCheck.canonicalUrl,
                    summary: finalCheck.summary,
                    model: finalCheck.model,
                    createdAt: finalCheck.createdAt,
                    status: finalCheck.status
                  }
                }
                break
              }
            }

            // If still not available after polling, return safe fallback without calling Gemini
            return {
              success: false,
              fallback: true,
              fromCache: false,
              reason: 'CONCURRENT_GENERATION_IN_PROGRESS',
              articleId,
              canonicalUrl,
              summary: generateFallbackSummary(desc),
              model: 'fallback-rss',
              status: 'fallback'
            }
          }
        } catch (err) {
          console.warn('[GeminiService] Redis lock acquisition error:', err.message)
        }
      }

      try {
        return await this._executeSummaryGeneration({
          articleId,
          title,
          canonicalUrl,
          desc,
          category,
          source,
          contentHash,
          isManual
        })
      } finally {
        if (redis && lockAcquired && lockKey && lockToken) {
          try {
            const currentOwner = await redis.get(lockKey)
            if (currentOwner === lockToken) {
              await redis.del(lockKey)
            }
          } catch (err) {
            console.warn('[GeminiService] Failed to release Redis lock:', err.message)
          }
        }
      }
    })()

    this.quota.inFlightRequests.set(inFlightKey, executionPromise)
    try {
      return await executionPromise
    } finally {
      this.quota.inFlightRequests.delete(inFlightKey)
    }
  }

  async _executeSummaryGeneration({
    articleId,
    title,
    canonicalUrl,
    desc,
    category,
    source,
    contentHash,
    isManual
  }) {
    const fallback = generateFallbackSummary(desc)

    // 4. Verify importance eligibility for automatic generation
    if (!isManual && !this.quota.isEligibleForAutoSummary({ title, desc, category, source })) {
      return {
        success: false,
        fallback: true,
        fromCache: false,
        reason: 'BELOW_IMPORTANCE_THRESHOLD',
        articleId,
        canonicalUrl,
        summary: fallback,
        model: 'fallback-rss',
        status: 'fallback'
      }
    }

    // 5. Verify Gemini API key configuration before reserving quota
    const ai = this.client
    if (!ai) {
      return {
        success: false,
        fallback: true,
        fromCache: false,
        reason: 'API_KEY_NOT_CONFIGURED',
        articleId,
        canonicalUrl,
        summary: fallback,
        model: 'fallback-rss',
        status: 'fallback'
      }
    }

    // 6. Atomically reserve daily budget slot (prevents concurrency race conditions)
    const reservation = await this.quota.reserveQuota()
    if (!reservation.allowed) {
      return {
        success: false,
        fallback: true,
        fromCache: false,
        reason: reservation.reason || 'DAILY_BUDGET_EXCEEDED',
        error: reservation.error,
        articleId,
        canonicalUrl,
        summary: fallback,
        model: 'fallback-rss',
        status: 'fallback'
      }
    }

    // 7. Generate summary via Gemini API
    const prompt = `You are a professional space science journalist for CosmosHub.
Given the following space news transmission, produce a high quality factual summary.

Article Title: ${title}
Source: ${source?.name || source || 'Space Transmission'}
Category: ${category || 'Space Science'}
Description: ${desc || 'None provided'}

Return ONLY a raw, valid JSON object with these exact keys:
{
  "shortSummary": "2 factual sentences, max 35 words, punchy and informative",
  "detailedSummary": "4-6 comprehensive sentences explaining context, technical milestones, and scientific significance",
  "eli12Summary": "2-3 simple sentences explaining this event clearly to a curious 12-year-old student"
}

No markdown code fences, no introductory or trailing commentary. Just the JSON object.`

    try {
      // 10s bounded timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API call timed out after 10000ms')), 10000)
      )

      const generatePromise = ai.models.generateContent({
        model: this.modelName,
        contents: prompt
      })

      const response = await Promise.race([generatePromise, timeoutPromise])
      const text = response?.text || ''

      // Clean response text
      const cleanJson = text.replace(/```json|```/g, '').trim()
      let parsed
      try {
        parsed = JSON.parse(cleanJson)
      } catch {
        const jsonMatch = cleanJson.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0])
        } else {
          throw new Error('Failed to parse JSON response from Gemini model')
        }
      }

      const structuredSummary = {
        shortSummary: parsed.shortSummary?.trim() || fallback.shortSummary,
        detailedSummary: parsed.detailedSummary?.trim() || fallback.detailedSummary,
        eli12Summary: parsed.eli12Summary?.trim() || fallback.eli12Summary
      }

      // Record successful usage
      await this.quota.recordSuccessfulUsage(articleId, this.modelName)

      // Save to persistent summary cache
      const saved = await this.cache.set(
        articleId,
        canonicalUrl,
        structuredSummary,
        this.modelName,
        contentHash,
        'completed'
      )

      return {
        success: true,
        fromCache: false,
        articleId,
        canonicalUrl,
        summary: structuredSummary,
        model: this.modelName,
        createdAt: saved.createdAt,
        status: 'completed'
      }
    } catch (err) {
      console.warn(`[GeminiService] API call failed for article "${title?.slice(0, 40)}":`, err.message)

      const isOverloaded = isGeminiOverloadError(err)
      const isQuotaError = !isOverloaded && /429|RESOURCE_EXHAUSTED|quota/i.test(err.message)
      const isConfirmedNonConsuming = isOverloaded || isConfirmedNonConsumingError(err)

      if (isConfirmedNonConsuming) {
        // Safe to release: provider explicitly rejected request before consuming tokens
        if (isOverloaded) {
          console.log(`[GeminiService] Confirmed provider overload (503/high demand) for article "${title?.slice(0, 30)}". Releasing reserved quota.`)
        } else {
          console.log(`[GeminiService] Confirmed non-consuming failure for article "${title?.slice(0, 30)}". Releasing reserved quota.`)
        }
        await this.quota.releaseQuota()
      } else {
        // Ambiguous failure: timeout, 5xx server crash, or network disconnect while in flight.
        // We DO NOT release quota slot. This conservative accounting guarantees the daily limit of 15 is never breached.
        console.warn(`[GeminiService] Ambiguous outcome for article "${title?.slice(0, 30)}" (${err.message}). Retaining quota reservation.`)
      }

      let reason = 'API_ERROR'
      let errorMessage = 'Upstream API error'

      if (isOverloaded) {
        reason = 'PROVIDER_OVERLOADED'
        errorMessage = 'Gemini model is currently experiencing high demand. Please try again in a few moments.'
      } else if (isQuotaError) {
        reason = 'QUOTA_EXHAUSTED'
        errorMessage = 'Gemini API quota exhausted'
      }

      return {
        success: false,
        fallback: true,
        fromCache: false,
        reason,
        error: errorMessage,
        articleId,
        canonicalUrl,
        summary: fallback,
        model: 'fallback-rss',
        status: 'fallback'
      }
    }
  }
}
