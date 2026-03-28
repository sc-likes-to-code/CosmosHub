import React, { useState, useEffect } from 'react'
import { getContextPanel } from '../utils/ai'

function formatDate(dateStr) {
  if (!dateStr) return 'Recently'
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return 'Recently'
  }
}

export default function Modal({ data, onClose }) {
  const { article, summaries } = data
  const [ctx, setCtx] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setCtx(null)

    getContextPanel(
      article.title,
      summaries?.shortSummary || '',
      article.source?.name || ''
    )
      .then(result => {
        setCtx(result)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [article.title, summaries?.shortSummary, article.source?.name])

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="modal-overlay open"
      style={{ display: 'flex' }}
      onClick={handleOverlayClick}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✕ close
        </button>

        <div className="modal-source">
          {article.source?.name} · {formatDate(article.pubDate)}
        </div>

        <div className="modal-title">{article.title}</div>

        {loading ? (
          <div className="modal-loading">
            <div className="modal-spinner" />
            Generating context with AI...
          </div>
        ) : ctx ? (
          <>
            <div className="modal-section">
              <div className="modal-section-label">Background</div>
              <div className="modal-section-body">
                {ctx.background || '—'}
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">Why it matters</div>
              <div className="modal-section-body">
                {ctx.importance || '—'}
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-label">
                Related missions & topics
              </div>
              <div className="modal-related">
                {(ctx.related || []).map((r, i) => (
                  <span key={i} className="related-tag">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="modal-loading">
            Could not load context. Please try again.
          </div>
        )}

        <div
          style={{
            marginTop: '1rem',
            paddingTop: '.75rem',
            borderTop: '1px solid var(--border)'
          }}
        >
          <a
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="read-more-btn"
            style={{ fontSize: 13 }}
          >
            Read original article →
          </a>
        </div>
      </div>
    </div>
  )
}