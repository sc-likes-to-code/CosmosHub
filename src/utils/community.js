// ── community.js ─────────────────────────────────────

const VOTES_KEY    = 'cosmos_votes'
const COMMENTS_KEY = 'cosmos_comments'

/* ── Votes ── */
export function getVotes() {
  try { return JSON.parse(localStorage.getItem(VOTES_KEY) || '{}') } catch { return {} }
}

export function saveVotes(votes) {
  try { localStorage.setItem(VOTES_KEY, JSON.stringify(votes)) } catch {}
}

/* ── Comments ── */
export function getComments() {
  try { return JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}') } catch { return {} }
}

export function saveComments(comments) {
  try { localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments)) } catch {}
}