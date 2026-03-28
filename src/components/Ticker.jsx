import React from 'react'

export default function Ticker({ articles }) {
  const headlines = articles.length
    ? articles.slice(0, 10).map(a => a.title).join(' \u00a0\u00a0\u2022\u00a0\u00a0 ')
    : 'Fetching from NASA \u2022 ISRO \u2022 ESA \u2022 JAXA \u2022 Universe Today \u2022 Space.com \u2022 ISS \u2022 AI summaries by Claude'

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