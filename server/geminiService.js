import { GoogleGenAI } from '@google/genai'
import { computeContentHash } from './summaryCache.js'

export function generateFallbackSummary(desc) {
  const safe = String(desc || 'No summary available.').trim()
  const short = safe.length > 140 ? safe.slice(0, 140).trim() + '...' : safe
  return {
    shortSummary: short || 'No summary available.',
    detailedSummary: safe || 'No detailed summary available.',
    eli12Summary: short || 'No summary available.'
  }
}

export class GeminiService {
  constructor(summaryCache, quotaManager) {
    this.cache = summaryCache
    this.quota = quotaManager
    this.modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
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

    // 1. Check existing persistent summary cache
    const cached = this.cache.get(articleId, canonicalUrl)
    if (cached && cached.summary) {
      // Content hash check: if content is unchanged or hash matches, reuse cache
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

    // 2. In-flight concurrent request deduplication
    const inFlightKey = articleId || canonicalUrl
    if (this.quota.inFlightRequests.has(inFlightKey)) {
      return this.quota.inFlightRequests.get(inFlightKey)
    }

    const executionPromise = (async () => {
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
        this.quota.inFlightRequests.delete(inFlightKey)
      }
    })()

    this.quota.inFlightRequests.set(inFlightKey, executionPromise)
    return executionPromise
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

    // 3. Verify server-side quota and daily budget
    if (!this.quota.canConsume()) {
      return {
        success: false,
        fallback: true,
        fromCache: false,
        reason: 'DAILY_BUDGET_EXCEEDED',
        articleId,
        canonicalUrl,
        summary: fallback,
        model: 'fallback-rss',
        status: 'fallback'
      }
    }

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

    // 5. Verify Gemini API key configuration
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

    // 6. Generate summary via Gemini API
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
        // Fallback regex extraction if model returned wrapped text
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

      // Record successful usage in quota manager
      this.quota.recordUsage(articleId, this.modelName, 'success')

      // Save to persistent summary cache
      const saved = this.cache.set(
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
      const isQuotaError = /429|RESOURCE_EXHAUSTED|quota/i.test(err.message)

      return {
        success: false,
        fallback: true,
        fromCache: false,
        reason: isQuotaError ? 'QUOTA_EXHAUSTED' : 'API_ERROR',
        error: isQuotaError ? 'Gemini API quota exhausted' : 'Upstream API error',
        articleId,
        canonicalUrl,
        summary: fallback,
        model: 'fallback-rss',
        status: 'fallback'
      }
    }
  }
}
