import React from 'react'
import { isPinnedForUser } from '../utils/personalization'
import { getTrustMeta } from '../utils/trust'
import { useSavedArticles } from '../utils/bookmarks'

function formatDate(dateStr) {
  if (!dateStr) return 'Recently'
  try {
    const d = new Date(dateStr), now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 3600)  return Math.floor(diff / 60) + 'm ago'
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
    if (diff < 604800)return Math.floor(diff / 86400) + 'd ago'
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch { return 'Recently' }
}

function TrustBadge({ sourceName }) {
  const m = getTrustMeta(sourceName)
  const cls = m.type === 'official' ? 'trust-official' : 'trust-media'
  const icon = m.type === 'official' ? '🟢' : '🟡'
  return (
    <span className={`trust-badge ${cls}`}>
      {icon} {m.label} <span className="trust-score">{m.trust}/10</span>
    </span>
  )
}

export default function NewsCard({ article, summaries, index = 0, prefs, onExpand }) {
  const s = article.source || {}
  const pinned = isPinnedForUser(article, prefs)
  const summaryText = summaries?.shortSummary || article.desc?.slice(0, 180) || ''
  const agencyFilter = s.key === 'iss' ? 'ISS' : (s.name || 'Space')
  const { isSaved, toggleSave } = useSavedArticles()
  const saved = isSaved(article)

  function handleBookmarkToggle(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleSave(article, summaries)
  }

  return (
    <div
      className={`news-card ${s.cardClass || 'spacedotcom'}${pinned ? ' pinned' : ''}`}
      data-agency={agencyFilter}
      style={{ animation: `fadeUp 0.4s ease ${index * 0.04}s both` }}>
      {/* top row */}
      <div className="card-top">
        <div className="card-top-left">
          <span className={`agency-badge ${s.badgeClass || 'badge-spacedotcom'}`}>{s.name || 'Space'}</span>
          <TrustBadge sourceName={s.name} />
        </div>
        <span className="card-date">{formatDate(article.pubDate)}</span>
      </div>

      {/* pinned */}
      {pinned && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', flexWrap: 'wrap' }}>
          <span className="tag pinned-tag">⭐ For you</span>
        </div>
      )}

      {/* title */}
      <div className="card-title">{article.title}</div>

      <div className="ai-label"><div className="ai-dot" /> Summary</div>
      <div className="card-summary">{summaryText}</div>

      {/* tags */}
      <div className="card-tags">
        {(s.tags || []).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {/* bottom row */}
      <div className="card-bottom">
        <a href={article.link} target="_blank" rel="noreferrer" className="read-more-btn">
          Read full article →
        </a>
        <button
          type="button"
          className={`bookmark-btn${saved ? ' saved' : ''}`}
          onClick={handleBookmarkToggle}
          aria-label={saved ? 'Remove from saved articles' : 'Save article'}
          title={saved ? 'Remove from saved articles' : 'Save article'}
        >
          <svg
            className="bookmark-icon"
            viewBox="0 0 24 24"
            fill={saved ? '#38bdf8' : 'none'}
            stroke={saved ? '#38bdf8' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
