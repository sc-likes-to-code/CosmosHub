import React, { useState, useEffect, useRef } from 'react'
import { getMultiSummary, getContextPanel, getAiStatus, getCachedAiSummary } from '../utils/ai'
import { resolveArticleId } from '../utils/bookmarks'

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
  const articleId = resolveArticleId(article)

  const [ctx, setCtx] = useState(null)
  const [loadingCtx, setLoadingCtx] = useState(true)

  // AI Summary state
  const [aiResult, setAiResult] = useState(() => getCachedAiSummary(articleId, article.link))
  const [isGenerating, setIsGenerating] = useState(false)
  const [quotaInfo, setQuotaInfo] = useState(null)
  const [summaryMode, setSummaryMode] = useState('short') // 'short' | 'detailed' | 'eli12'
  const [errorMessage, setErrorMessage] = useState(null)
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false)
  const [isOverloaded, setIsOverloaded] = useState(false)

  const activeArticleIdRef = useRef(articleId)

  // Track article change
  useEffect(() => {
    activeArticleIdRef.current = articleId
    setErrorMessage(null)
    setIsGenerating(false)
    setIsQuotaExceeded(false)
    setIsOverloaded(false)

    // Check if client cache already has a summary for this article
    const existing = getCachedAiSummary(articleId, article.link)
    setAiResult(existing)

    // Load subtle quota status (cached 60s in ai.js)
    getAiStatus().then(status => {
      if (activeArticleIdRef.current === articleId && status) {
        setQuotaInfo(status)
      }
    })

    // Load static context panel
    setLoadingCtx(true)
    setCtx(null)

    getContextPanel(
      article.title,
      summaries?.shortSummary || '',
      article.source?.name || '',
      article.desc || ''
    )
      .then(result => {
        if (activeArticleIdRef.current === articleId) {
          setCtx(result)
          setLoadingCtx(false)
        }
      })
      .catch(() => {
        if (activeArticleIdRef.current === articleId) {
          setLoadingCtx(false)
        }
      })
  }, [articleId, article.title, article.link, article.desc, article.source?.name, summaries?.shortSummary])

  async function handleGenerateSummary() {
    if (isGenerating) return

    setIsGenerating(true)
    setErrorMessage(null)
    setIsQuotaExceeded(false)
    setIsOverloaded(false)

    try {
      const res = await getMultiSummary(article.title, article.desc, {
        id: articleId,
        articleId,
        link: article.link,
        canonicalUrl: article.link,
        category: article.category,
        source: article.source,
        isManual: true
      })

      // If user switched articles or closed modal during request, ignore stale response
      if (activeArticleIdRef.current !== articleId) return

      setIsGenerating(false)

      if (res.success) {
        setAiResult(res)
        // Refresh quota display after generation
        getAiStatus(true).then(st => {
          if (activeArticleIdRef.current === articleId && st) setQuotaInfo(st)
        })
      } else if (res.isOverloaded) {
        setIsOverloaded(true)
        setErrorMessage(res.error || 'Gemini model is currently experiencing high demand. Please try again in a few moments.')
        getAiStatus(true).then(st => {
          if (activeArticleIdRef.current === articleId && st) setQuotaInfo(st)
        })
      } else if (res.isQuotaExceeded) {
        setIsQuotaExceeded(true)
        getAiStatus(true).then(st => {
          if (activeArticleIdRef.current === articleId && st) setQuotaInfo(st)
        })
      } else {
        setErrorMessage(res.error || 'Failed to generate summary. Please try again.')
        getAiStatus(true).then(st => {
          if (activeArticleIdRef.current === articleId && st) setQuotaInfo(st)
        })
      }
    } catch (err) {
      if (activeArticleIdRef.current !== articleId) return
      setIsGenerating(false)
      setErrorMessage(err.message || 'An unexpected error occurred.')
      getAiStatus(true).then(st => {
        if (activeArticleIdRef.current === articleId && st) setQuotaInfo(st)
      })
    }
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  const currentSummaryText =
    summaryMode === 'detailed'
      ? aiResult?.summary?.detailedSummary
      : summaryMode === 'eli12'
      ? aiResult?.summary?.eli12Summary
      : aiResult?.summary?.shortSummary

  return (
    <div
      className="modal-overlay open"
      style={{ display: 'flex' }}
      onClick={handleOverlayClick}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕ close
        </button>

        <div className="modal-source">
          {article.source?.name} · {formatDate(article.pubDate)}
        </div>

        <div className="modal-title">{article.title}</div>

        {/* ── 1. Original Source Excerpt ── */}
        <div className="modal-section">
          <div className="modal-section-label">Source Transmission Excerpt</div>
          <div className="modal-section-body">
            {article.desc || 'No transmission excerpt provided.'}
          </div>
        </div>

        {/* ── 2. AI Summary Section (Manual Generation via Gemini 3.1 Flash-Lite) ── */}
        <div className="modal-section modal-ai-section">
          <div className="modal-ai-header">
            <div className="modal-section-label modal-ai-label">
              <span className="ai-dot" /> AI Synthesis (Gemini 3.1 Flash-Lite)
            </div>
            {quotaInfo && (
              <span className="ai-quota-badge" title="Daily quota resets at midnight IST">
                AI summaries remaining today: {quotaInfo.remainingToday} / {quotaInfo.dailyLimit}
              </span>
            )}
          </div>

          {/* State A: Generating in progress */}
          {isGenerating && (
            <div className="modal-loading ai-generating-box">
              <div className="modal-spinner" />
              Generating synthesis with Gemini 3.1 Flash-Lite...
            </div>
          )}

          {/* State B: Successfully generated or loaded from cache */}
          {!isGenerating && aiResult && aiResult.summary && (
            <div className="ai-result-box">
              <div className="ai-result-meta">
                <span className="ai-badge-success">✨ AI Synthesized</span>
                {aiResult.fromCache && (
                  <span className="ai-badge-cached">⚡ Cached (0 quota used)</span>
                )}
                <div className="summary-toggle">
                  <button
                    type="button"
                    className={`stog-btn${summaryMode === 'short' ? ' active' : ''}`}
                    onClick={() => setSummaryMode('short')}
                  >
                    Quick
                  </button>
                  <button
                    type="button"
                    className={`stog-btn${summaryMode === 'detailed' ? ' active' : ''}`}
                    onClick={() => setSummaryMode('detailed')}
                  >
                    Deep Dive
                  </button>
                  <button
                    type="button"
                    className={`stog-btn${summaryMode === 'eli12' ? ' active' : ''}`}
                    onClick={() => setSummaryMode('eli12')}
                  >
                    ELI12
                  </button>
                </div>
              </div>
              <div className="modal-section-body ai-summary-content">
                {currentSummaryText || 'No summary available.'}
              </div>
            </div>
          )}

          {/* State C: Daily Quota Exhausted */}
          {!isGenerating && !aiResult && isQuotaExceeded && (
            <div className="ai-status-alert ai-quota-alert">
              <span className="ai-alert-icon">⚠️</span>
              <div className="ai-alert-content">
                <strong>Daily AI Summary Limit Reached (15/15)</strong>
                <p>
                  The daily budget of 15 new AI summaries has been reached for today.
                  Quota resets at 00:00 IST (midnight). You can still read the original source transmission excerpt above.
                </p>
              </div>
            </div>
          )}

          {/* State D: Provider Overload State (Gemini 503 high demand) */}
          {!isGenerating && !aiResult && isOverloaded && !isQuotaExceeded && (
            <div className="ai-status-alert ai-overload-alert">
              <span className="ai-alert-icon">⚡</span>
              <div className="ai-alert-content">
                <strong>Gemini Model High Demand</strong>
                <p>
                  {errorMessage || 'Google Gemini 3.1 Flash-Lite is temporarily experiencing high demand. Your daily quota was not consumed. You can try generating again in a few moments.'}
                </p>
                <button
                  type="button"
                  className="ai-retry-btn"
                  onClick={handleGenerateSummary}
                >
                  ↻ Try Again
                </button>
              </div>
            </div>
          )}

          {/* State E: Error State */}
          {!isGenerating && !aiResult && errorMessage && !isQuotaExceeded && !isOverloaded && (
            <div className="ai-status-alert ai-error-alert">
              <span className="ai-alert-icon">⚠️</span>
              <div className="ai-alert-content">
                <strong>{errorMessage}</strong>
                <button
                  type="button"
                  className="ai-retry-btn"
                  onClick={handleGenerateSummary}
                >
                  ↻ Try Again
                </button>
              </div>
            </div>
          )}

          {/* State F: Initial Idle State (Ready to generate) */}
          {!isGenerating && !aiResult && !isQuotaExceeded && !isOverloaded && !errorMessage && (
            <div className="ai-trigger-box">
              <p className="ai-trigger-desc">
                Generate a factual multi-level synthesis powered by Google Gemini 3.1 Flash-Lite.
              </p>
              <button
                type="button"
                className="ai-generate-btn"
                onClick={handleGenerateSummary}
              >
                ✨ Generate AI Summary
              </button>
            </div>
          )}
        </div>

        {/* ── 3. Mission Context Panel ── */}
        {loadingCtx ? (
          <div className="modal-loading">
            <div className="modal-spinner" />
            Loading mission context...
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
            Could not load context.
          </div>
        )}

        {/* ── 4. Original Article Link ── */}
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
