// ── ai.js ────────────────────────────────────────────

const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL   = 'claude-sonnet-4-20250514'
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || 'sk-placeholder'

async function callClaude(prompt, maxTokens = 1000) {
  try {
    if (API_KEY === 'sk-placeholder' || !API_KEY || API_KEY.includes('your-api-key')) {
      console.warn('[AI] API key not configured. Please set VITE_ANTHROPIC_API_KEY in .env')
      return null
    }

    const res = await fetch(API_URL, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'anthropic-version': '2023-06-01',
      },
      body:    JSON.stringify({
        model:      MODEL,
        max_tokens: maxTokens,
        messages:   [{ role: 'user', content: prompt }],
      }),
    })
    
    if (!res.ok) {
      const error = await res.json()
      console.error('[AI] API Error:', error.error?.message || `HTTP ${res.status}`)
      return null
    }
    
    const data = await res.json()
    return data.content?.[0]?.text?.trim() || null
  } catch (e) {
    console.error('[AI] Network Error:', e.message)
    return null
  }
}

/* ── Multi-level summaries ── */
export async function getMultiSummary(title, desc) {
  const prompt = `You are a space science journalist. Given this article title and description, generate THREE summaries.

Return ONLY a raw JSON object with these exact keys:
- shortSummary: 2 sentences, max 35 words, punchy and factual
- detailedSummary: 5-6 sentences, comprehensive and informative
- eli12Summary: 2-3 sentences explaining to a 12-year-old using simple fun language

No markdown, no code fences, no extra text. Raw JSON only.

Title: ${title}
Description: ${desc}`

  const raw = await callClaude(prompt, 1000)
  if (!raw) return fallbackSummary(desc)
  try {
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return fallbackSummary(desc)
  }
}

function fallbackSummary(desc) {
  const t = (desc || '').slice(0, 200)
  return {
    shortSummary:    t || 'No summary available.',
    detailedSummary: t || 'No summary available.',
    eli12Summary:    t || 'No summary available.',
  }
}

/* ── Fact-check ── */
export async function getFactCheck(title, summary, sourceName) {
  const prompt = `You are a space science fact-checker. Classify this article as one of exactly three options based on scientific plausibility and source credibility.

Source: ${sourceName}
Title: ${title}
Summary: ${summary}

Return ONLY one of these exact words: VERIFIED, PARTIALLY_VERIFIED, SPECULATIVE`

  const res = await callClaude(prompt, 20)
  if (!res) return 'PENDING'
  if (res.includes('PARTIALLY')) return 'PARTIALLY_VERIFIED'
  if (res.includes('SPECULATIVE')) return 'SPECULATIVE'
  if (res.includes('VERIFIED'))   return 'VERIFIED'
  return 'PENDING'
}

/* ── Context panel ── */
export async function getContextPanel(title, summary, sourceName) {
  const prompt = `You are a space science expert. For this article, return a JSON object with these exact keys:
- background: 2-3 sentences of scientific or historical context
- importance: 2 sentences on why this matters for science or humanity
- related: array of 3-4 strings naming related missions or topics

No markdown, no code fences. Raw JSON only.

Source: ${sourceName}
Title: ${title}
Summary: ${summary}`

  const raw = await callClaude(prompt, 1000)
  if (!raw) return fallbackContext()
  try {
    const clean = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return { background: raw.slice(0, 200), importance: '', related: [] }
  }
}

function fallbackContext() {
  return {
    background: 'Context could not be generated at this time.',
    importance: 'Significance unavailable.',
    related:    [],
  }
}