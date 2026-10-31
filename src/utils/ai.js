// ── ai.js ────────────────────────────────────────────
// Secure AI client utility routing exclusively through CosmosHub Express server endpoints.
// Zero client-side API keys. Zero Anthropic references.

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
 * Requests a multi-level AI summary from the CosmosHub backend server.
 * Reuses server cache and respects daily quota budget.
 */
export async function getMultiSummary(title, desc, meta = {}) {
  if (!title || typeof title !== 'string') {
    return fallbackSummary(desc)
  }

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 12000)

    const res = await fetch('/api/ai/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        articleId: meta.id || meta.articleId,
        title: title.trim(),
        canonicalUrl: meta.link || meta.canonicalUrl,
        desc: desc || '',
        category: meta.category || '',
        source: meta.source || {},
        isManual: Boolean(meta.isManual)
      })
    })

    clearTimeout(timer)

    if (!res.ok) {
      return fallbackSummary(desc)
    }

    const data = await res.json()
    if (data && data.summary && typeof data.summary === 'object') {
      return {
        shortSummary: data.summary.shortSummary || fallbackSummary(desc).shortSummary,
        detailedSummary: data.summary.detailedSummary || fallbackSummary(desc).detailedSummary,
        eli12Summary: data.summary.eli12Summary || fallbackSummary(desc).eli12Summary
      }
    }

    return fallbackSummary(desc)
  } catch (err) {
    // Network errors or aborted requests fall back gracefully to original RSS description
    return fallbackSummary(desc)
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
