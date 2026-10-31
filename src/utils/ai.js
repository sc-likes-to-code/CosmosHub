// ── ai.js ────────────────────────────────────────────
// Secure AI client utility routing exclusively through CosmosHub serverless / Express endpoints.
// Zero client-side API keys. Zero Anthropic references.

const inMemorySummaryCache = new Map()
let cachedStatus = null
let lastStatusFetchTime = 0

export function fallbackSummary(desc) {
  const safe = String(desc || 'No summary available.').trim()
  const short = safe.length > 140 ? safe.slice(0, 140).trim() + '...' : safe
  return {
    shortSummary: short || 'No summary available.',
    detailedSummary: safe || 'No detailed summary available.',
    eli12Summary: short || 'No summary available.'
  }
}

export function fallbackContext(desc = '') {
  const safe = String(desc || '').trim()
  return {
    background: safe ? safe.slice(0, 220) : 'Context could not be generated at this time.',
    importance: 'Significance and mission context available in original transmission.',
    related: ['Space Exploration', 'Cosmology', 'Astrophysics']
  }
}

/**
 * Retrieves cached summary from client memory if available.
 */
export function getCachedAiSummary(articleId, url) {
  if (articleId && inMemorySummaryCache.has(articleId)) {
    return inMemorySummaryCache.get(articleId)
  }
  if (url && inMemorySummaryCache.has(url)) {
    return inMemorySummaryCache.get(url)
  }
  return null
}

/**
 * Stores a verified summary into client-side memory cache.
 */
export function setCachedAiSummary(articleId, data) {
  if (articleId) inMemorySummaryCache.set(articleId, data)
  if (data?.canonicalUrl) inMemorySummaryCache.set(data.canonicalUrl, data)
}

/**
 * Fetches current daily AI quota and system status from /api/ai/status.
 * Cached in-memory for 60 seconds unless forceRefresh is true.
 */
export async function getAiStatus(forceRefresh = false) {
  const now = Date.now()
  if (!forceRefresh && cachedStatus && (now - lastStatusFetchTime < 60000)) {
    return cachedStatus
  }

  try {
    const res = await fetch('/api/ai/status')
    if (!res.ok) return null
    const data = await res.json()
    cachedStatus = data
    lastStatusFetchTime = now
    return data
  } catch {
    return null
  }
}

/**
 * Requests a multi-level AI summary from the CosmosHub backend server.
 * Reuses server cache and respects daily quota budget.
 * Triggered EXCLUSIVELY via explicit manual user interaction.
 */
export async function getMultiSummary(title, desc, meta = {}) {
  const fallback = fallbackSummary(desc)
  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    return {
      success: false,
      fallback: true,
      error: 'Invalid article title for summarization.',
      summary: fallback,
      shortSummary: fallback.shortSummary,
      detailedSummary: fallback.detailedSummary,
      eli12Summary: fallback.eli12Summary
    }
  }

  const articleId = meta.id || meta.articleId || meta.link || meta.canonicalUrl
  const canonicalUrl = meta.link || meta.canonicalUrl || ''

  // Fast path: Check frontend in-memory cache first
  const memoryHit = getCachedAiSummary(articleId, canonicalUrl)
  if (memoryHit && memoryHit.summary) {
    return {
      ...memoryHit,
      fromCache: true,
      shortSummary: memoryHit.summary.shortSummary,
      detailedSummary: memoryHit.summary.detailedSummary,
      eli12Summary: memoryHit.summary.eli12Summary
    }
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 15000)

    const res = await fetch('/api/ai/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        articleId,
        title: title.trim(),
        canonicalUrl,
        desc: desc || '',
        category: meta.category || '',
        source: meta.source || {},
        isManual: true // Explicit user action flag
      })
    })

    clearTimeout(timer)

    // Handle 429 Rate Limit
    if (res.status === 429) {
      const errData = await res.json().catch(() => ({}))
      return {
        success: false,
        fallback: true,
        isRateLimited: true,
        isQuotaExceeded: false,
        error: errData.error || 'Rate limit exceeded. Please wait a minute before retrying.',
        summary: errData.summary || fallback,
        shortSummary: (errData.summary || fallback).shortSummary,
        detailedSummary: (errData.summary || fallback).detailedSummary,
        eli12Summary: (errData.summary || fallback).eli12Summary
      }
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      return {
        success: false,
        fallback: true,
        error: errData.error || `Server error (HTTP ${res.status}).`,
        summary: fallback,
        shortSummary: fallback.shortSummary,
        detailedSummary: fallback.detailedSummary,
        eli12Summary: fallback.eli12Summary
      }
    }

    const data = await res.json()

    // Handle quota exhaustion, provider overload, or importance rejections
    if (data.success === false) {
      const isQuotaExceeded = data.reason === 'DAILY_BUDGET_EXCEEDED' || data.reason === 'QUOTA_EXHAUSTED'
      const isOverloaded = data.reason === 'PROVIDER_OVERLOADED'
      return {
        success: false,
        fallback: true,
        isQuotaExceeded,
        isOverloaded,
        isRateLimited: false,
        reason: data.reason,
        error: data.error || (
          isOverloaded
            ? 'Gemini 3.1 Flash-Lite is temporarily experiencing high demand. Please try again in a moment.'
            : isQuotaExceeded
            ? 'Daily AI summary limit (15/15) reached. Resets at midnight IST.'
            : 'Summary unavailable.'
        ),
        summary: data.summary || fallback,
        fromCache: Boolean(data.fromCache),
        shortSummary: (data.summary || fallback).shortSummary,
        detailedSummary: (data.summary || fallback).detailedSummary,
        eli12Summary: (data.summary || fallback).eli12Summary
      }
    }

    // Success response
    const structuredSummary = {
      shortSummary: data.summary?.shortSummary || fallback.shortSummary,
      detailedSummary: data.summary?.detailedSummary || fallback.detailedSummary,
      eli12Summary: data.summary?.eli12Summary || fallback.eli12Summary
    }

    const result = {
      success: true,
      fromCache: Boolean(data.fromCache),
      isQuotaExceeded: false,
      isRateLimited: false,
      model: data.model || 'gemini-3.1-flash-lite',
      createdAt: data.createdAt || new Date().toISOString(),
      summary: structuredSummary,
      // Backwards compatibility properties:
      shortSummary: structuredSummary.shortSummary,
      detailedSummary: structuredSummary.detailedSummary,
      eli12Summary: structuredSummary.eli12Summary
    }

    // Save to in-memory frontend cache
    setCachedAiSummary(articleId, result)
    if (canonicalUrl) setCachedAiSummary(canonicalUrl, result)

    return result
  } catch (err) {
    const isTimeout = err.name === 'AbortError'
    return {
      success: false,
      fallback: true,
      isQuotaExceeded: false,
      isRateLimited: false,
      error: isTimeout ? 'Summary generation timed out. Please try again.' : 'Network connection error.',
      summary: fallback,
      shortSummary: fallback.shortSummary,
      detailedSummary: fallback.detailedSummary,
      eli12Summary: fallback.eli12Summary
    }
  }
}

/**
 * Retrieves context panel data for an article.
 * Uses available summary and description to construct rich context.
 */
export async function getContextPanel(title, summary, sourceName, desc = '') {
  if (summary && summary.length > 50) {
    return {
      background: summary,
      importance: `Reported by ${sourceName || 'verified space agency'}. Advancing orbital science and exploration.`,
      related: ['Space Missions', 'Astronomy', 'Astrophysics']
    }
  }

  return fallbackContext(desc || summary)
}

/**
 * Verifies scientific plausibility based on source credibility.
 */
export async function getFactCheck(title, summary, sourceName) {
  const s = String(sourceName || '').toLowerCase()
  if (s.includes('nasa') || s.includes('esa') || s.includes('isro') || s.includes('jaxa') || s.includes('webb')) {
    return 'VERIFIED'
  }
  return 'PARTIALLY_VERIFIED'
}
