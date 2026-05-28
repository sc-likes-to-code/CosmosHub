import React, { useState } from 'react'
import { isPinnedForUser } from '../utils/personalization'
import { getFactCheck } from '../utils/ai'
import { getTrustMeta } from '../utils/trust'
import { getVotes, saveVotes } from '../utils/community'

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

function makeArticleId(article) {
  try {
    return btoa(encodeURIComponent(article.title.slice(0, 40)))
      .replace(/=/g, '').slice(0, 16)
  } catch { return Math.random().toString(36).slice(2, 10) }
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

function FactCheckBadge({ status }) {
  const map = {
    VERIFIED:           ['fc-verified',    '✅ Verified'],
    PARTIALLY_VERIFIED: ['fc-partial',     '⚠️ Needs Review'],
    SPECULATIVE:        ['fc-speculative', '❌ Speculative'],
    PENDING:            ['fc-pending',     '⏳ Checking...'],
  }
  const [cls, label] = map[status] || map.PENDING
  return <span className={`factcheck ${cls}`}>{label}</span>
}

export default function NewsCard({ article, summaries, index, prefs, onExpand }) {
  const id = makeArticleId(article)
  const s  = article.source
  const pinned = isPinnedForUser(article, prefs)

  const [fcStatus,    setFcStatus]    = useState('PENDING')
  const [fcLoaded,    setFcLoaded]    = useState(false)
  const [voteCount,   setVoteCount]   = useState(() => getVotes()[id] || 0)
  const [voted,       setVoted]       = useState(false)

  // lazy fact-check on first render
  React.useEffect(() => {
    if (fcLoaded) return
    setFcLoaded(true)
    getFactCheck(article.title, summaries?.shortSummary || '', s.name)
      .then(setFcStatus)
  }, [])

  function handleUpvote() {
    if (voted) return
    const votes = getVotes()
    votes[id] = (votes[id] || 0) + 1
    saveVotes(votes)
    setVoteCount(votes[id])
    setVoted(true)
  }



  const summaryText = summaries?.shortSummary || article.desc?.slice(0, 180) || ''

  const agencyFilter = s.key === 'iss' ? 'ISS' : s.name

  return (
    <div
      className={`news-card ${s.cardClass}${pinned ? ' pinned' : ''}`}
      data-agency={agencyFilter}
      style={{ animation: `fadeUp 0.4s ease ${index * 0.04}s both` }}>
      {/* top row */}
      <div className="card-top">
        <div className="card-top-left">
          <span className={`agency-badge ${s.badgeClass}`}>{s.name}</span>
          <TrustBadge sourceName={s.name} />
        </div>
        <span className="card-date">{formatDate(article.pubDate)}</span>
      </div>

      {/* fact-check + pinned */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', flexWrap: 'wrap' }}>
        <FactCheckBadge status={fcStatus} />
        {pinned && <span className="tag pinned-tag">⭐ For you</span>}
      </div>

      {/* title */}
      <div className="card-title">{article.title}</div>

      <div className="ai-label"><div className="ai-dot" /> AI Summary</div>
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
        <div className="card-actions">
          <button
            className={`upvote-btn${voted ? ' voted' : ''}`}
            onClick={handleUpvote}
          >
            ▲ {voteCount}
          </button>
        </div>
      </div>

    </div>
  )
}