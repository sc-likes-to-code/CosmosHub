import React from 'react'

export default function Ticker({ articles }) {
  if (!articles.length) return null

  const headlines = articles.slice(0, 10).map(a => a.title).join(' \u00a0\u00a0\u2022\u00a0\u00a0 ')

  const doubled = headlines + ' \u00a0\u00a0\u2022\u00a0\u00a0 ' + headlines

  return (
    <div className="ticker">
      <span className="ticker-label">Live</span>
      <div className="ticker-text">
        <span className="ticker-inner">{doubled}</span>
      </div>
    </div>
  )
}