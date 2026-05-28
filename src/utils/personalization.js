// ── personalization.js ──────────────────────────────

const DEV_RUN_ID = typeof __COSMOS_DEV_RUN_ID__ === 'string' ? __COSMOS_DEV_RUN_ID__ : ''
const STORAGE_SCOPE = DEV_RUN_ID ? `:${DEV_RUN_ID}` : ''
const PREFS_KEY = `cosmos_user_prefs${STORAGE_SCOPE}`
const ONBOARD_KEY = `cosmos_onboarded${STORAGE_SCOPE}`

/* ── storage helpers ── */
export function getPrefs() {
  try { return JSON.parse(localStorage.getItem(PREFS_KEY) || '[]') } catch { return [] }
}

export function savePrefs(prefs) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)) } catch {}
}

export function hasSeenOnboarding() {
  try { return localStorage.getItem(ONBOARD_KEY) === '1' } catch { return false }
}

export function markOnboarded() {
  try { localStorage.setItem(ONBOARD_KEY, '1') } catch {}
}

/* ── scoring ── */
function scoreArticle(article, prefs) {
  if (!prefs.length) return 0
  const text = [
    article.title,
    article.desc || '',
    article.source.name,
    ...(article.source.tags || [])
  ].join(' ').toLowerCase()

  return prefs.reduce((score, pref) => {
    return score + (text.includes(pref.toLowerCase()) ? 2 : 0)
  }, 0)
}

function toTimestamp(value) {
  const ts = new Date(value || '').getTime()
  return Number.isFinite(ts) ? ts : 0
}

/* ── ranking ── */
export function rankArticles(articles, prefs) {
  return [...articles].sort((a, b) => {
    const sa = scoreArticle(a, prefs)
    const sb = scoreArticle(b, prefs)

    if (sb !== sa) return sb - sa

    const da = toTimestamp(a.pubDate)
    const db = toTimestamp(b.pubDate)
    if (db !== da) return db - da

    // Final deterministic tie-breaker to avoid jitter between refreshes.
    return String(a.title || '').localeCompare(String(b.title || ''))
  })
}

/* ── pinned check (used by NewsCard) ── */
export function isPinnedForUser(article, prefs) {
  return prefs.length > 0 && scoreArticle(article, prefs) > 0
}