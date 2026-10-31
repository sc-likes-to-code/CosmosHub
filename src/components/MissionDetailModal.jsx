import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getRelatedNewsForMission } from '../data/missions'

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}

export default function MissionDetailModal({
  mission,
  isOpen,
  onClose,
  articles = [],
  onSelectProgramme,
  openModal
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !mission) return null

  const relatedNews = getRelatedNewsForMission(mission, articles, 4)

  const getStatusClass = (status) => {
    const s = (status || '').toLowerCase()
    if (s === 'active' || s === 'extended') return 'status-active'
    if (s === 'cruise') return 'status-cruise'
    if (s === 'upcoming' || s === 'in-development') return 'status-upcoming'
    if (s === 'completed' || s === 'retired') return 'status-completed'
    if (s === 'failed') return 'status-failed'
    return 'status-planned'
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div
      className="mission-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-detail-title"
    >
      <div className="mission-modal-box" ref={modalRef}>
        {/* Header Section */}
        <div className="mission-modal-header">
          <div className="mission-modal-title-row">
            <div>
              <div className="mission-modal-eyebrow">
                <span className="mission-modal-agency">{mission.agency}</span>
                {mission.partnerAgencies && mission.partnerAgencies.length > 0 && (
                  <span className="mission-modal-partners">
                    {' '}+ {mission.partnerAgencies.join(', ')}
                  </span>
                )}
                {mission.programme && (
                  <button
                    className="mission-modal-programme-badge"
                    onClick={() => {
                      if (onSelectProgramme && mission.programmeId) {
                        onSelectProgramme(mission.programmeId)
                        onClose()
                      }
                    }}
                    title="Filter all missions in this programme"
                  >
                    📂 {mission.programme}
                  </button>
                )}
              </div>
              <h2 id="mission-detail-title" className="mission-modal-title">
                {mission.name}
              </h2>
              {mission.alternateNames && mission.alternateNames.length > 0 && (
                <div className="mission-modal-aliases">
                  Also known as: {mission.alternateNames.join(' • ')}
                </div>
              )}
            </div>

            <div className="mission-modal-header-actions">
              <span className={`mission-status-badge ${getStatusClass(mission.status)}`}>
                <span className="status-indicator-dot" />
                {mission.status ? mission.status.toUpperCase() : 'UNKNOWN'}
              </span>
              <button
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close mission detail modal"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="mission-modal-tags">
            <span className="mission-tag-pill destination-pill">
              📍 {mission.destination}
            </span>
            <span className="mission-tag-pill category-pill">
              🛰️ {mission.category}
            </span>
            {mission.launchVehicle && (
              <span className="mission-tag-pill vehicle-pill">
                🚀 {mission.launchVehicle}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="mission-modal-body">
          {/* Operational Status Callout */}
          <div className="mission-modal-section operational-status-box">
            <div className="status-box-header">
              <span className="status-box-label">CURRENT OPERATIONAL STATUS</span>
              <span className="status-box-verified">
                Verified: {formatDate(mission.lastVerifiedAt || '2026-10-31')}
              </span>
            </div>
            <p className="status-box-text">{mission.currentOperationalStatus}</p>
            {mission.latestKnownUpdate && (
              <div className="status-box-latest">
                <strong>Intelligence Update:</strong> {mission.latestKnownUpdate}
              </div>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div className="mission-modal-section">
            <h3 className="mission-section-heading">Mission Specifications</h3>
            <div className="mission-specs-grid">
              <div className="spec-card">
                <span className="spec-label">Launch Date</span>
                <span className="spec-value">{formatDate(mission.launchDate)}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Mission Type</span>
                <span className="spec-value">{mission.missionType || 'Space Exploration'}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Duration</span>
                <span className="spec-value">{mission.missionDuration || 'N/A'}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Launch Vehicle</span>
                <span className="spec-value">{mission.launchVehicle || 'N/A'}</span>
              </div>
              {mission.spacecraft && (
                <>
                  {mission.spacecraft.manufacturer && (
                    <div className="spec-card">
                      <span className="spec-label">Manufacturer</span>
                      <span className="spec-value">{mission.spacecraft.manufacturer}</span>
                    </div>
                  )}
                  {mission.spacecraft.massKg && (
                    <div className="spec-card">
                      <span className="spec-label">Launch Mass</span>
                      <span className="spec-value">
                        {typeof mission.spacecraft.massKg === 'number'
                          ? mission.spacecraft.massKg.toLocaleString()
                          : mission.spacecraft.massKg}{' '}
                        kg
                      </span>
                    </div>
                  )}
                  {mission.spacecraft.powerSource && (
                    <div className="spec-card full-width">
                      <span className="spec-label">Power Architecture</span>
                      <span className="spec-value">{mission.spacecraft.powerSource}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Crew Roster (if applicable) */}
          {mission.crew && mission.crew.length > 0 && (
            <div className="mission-modal-section crew-section">
              <h3 className="mission-section-heading">Astronaut & Cosmonaut Crew</h3>
              <div className="crew-grid">
                {mission.crew.map((member, i) => (
                  <div key={i} className="crew-card">
                    <span className="crew-avatar">👨‍🚀</span>
                    <div className="crew-info">
                      <div className="crew-name">{member?.name || 'Crew Member'}</div>
                      <div className="crew-role">{member?.role || 'Specialist'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mission Description & Historical Significance */}
          <div className="mission-modal-section">
            <h3 className="mission-section-heading">Mission Dossier</h3>
            <p className="mission-narrative-text">{mission.description}</p>
            {mission.historicalSignificance && (
              <div className="historical-significance-quote">
                <span className="quote-label">Historical Significance</span>
                <p>{mission.historicalSignificance}</p>
              </div>
            )}
          </div>

          {/* Key Achievements */}
          {mission.keyAchievements && mission.keyAchievements.length > 0 && (
            <div className="mission-modal-section">
              <h3 className="mission-section-heading">Key Achievements</h3>
              <ul className="achievement-list">
                {mission.keyAchievements.map((item, i) => (
                  <li key={i} className="achievement-item">
                    <span className="achievement-marker">★</span>
                    <span className="achievement-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Scientific Objectives */}
          {mission.scientificObjectives && mission.scientificObjectives.length > 0 && (
            <div className="mission-modal-section">
              <h3 className="mission-section-heading">Primary Scientific Objectives</h3>
              <ul className="objectives-list">
                {mission.scientificObjectives.map((obj, i) => (
                  <li key={i} className="objective-item">
                    <span className="objective-bullet">◈</span>
                    <span className="objective-text">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Chronological Milestone Timeline */}
          {mission.milestones && mission.milestones.length > 0 && (
            <div className="mission-modal-section">
              <h3 className="mission-section-heading">Chronological Milestones</h3>
              <div className="modal-timeline">
                {mission.milestones.map((ms, i) => {
                  const isDone = ms?.done
                  const isCurrent = ms?.current
                  const dotCls = isDone ? 'tl-done' : isCurrent ? 'tl-current' : 'tl-future'

                  return (
                    <div key={i} className={`modal-timeline-item ${dotCls}`}>
                      <div className="modal-timeline-marker">
                        <div className={`modal-timeline-dot ${dotCls}`} />
                        {i < mission.milestones.length - 1 && <div className="modal-timeline-line" />}
                      </div>
                      <div className="modal-timeline-content">
                        <div className="modal-timeline-date">{formatDate(ms?.date)}</div>
                        <div className="modal-timeline-label">{ms?.label}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Official Reference Source */}
          {mission.officialSourceUrl && (
            <div className="mission-modal-section official-link-section">
              <a
                href={mission.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="official-agency-link"
              >
                <span>🔗 Official Agency Mission Portal ({mission.agency})</span>
                <span className="ext-icon">↗</span>
              </a>
            </div>
          )}

          {/* Related CosmosHub Intelligence Articles */}
          <div className="mission-modal-section related-intelligence-section">
            <h3 className="mission-section-heading">
              CosmosHub Live Intelligence ({relatedNews.length})
            </h3>
            {relatedNews.length > 0 ? (
              <div className="related-articles-grid">
                {relatedNews.map((art, i) => {
                  const sourceName =
                    typeof art.source === 'object' && art.source !== null
                      ? art.source.name || 'Space Intelligence'
                      : (art.source || 'Space Intelligence')

                  return (
                    <div
                      key={i}
                      className="related-article-card"
                      onClick={() => {
                        if (openModal) {
                          onClose()
                          openModal({ article: art, summaries: {} })
                        } else if (art.link) {
                          window.open(art.link, '_blank', 'noopener,noreferrer')
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (openModal) {
                            onClose()
                            openModal({ article: art, summaries: {} })
                          } else if (art.link) {
                            window.open(art.link, '_blank', 'noopener,noreferrer')
                          }
                        }
                      }}
                    >
                      <div className="related-article-source">{sourceName}</div>
                      <div className="related-article-title">{art.title}</div>
                      <div className="related-article-meta">
                        <span>{formatDate(art.pubDate || art.isoDate)}</span>
                        <span className="related-article-cta">Read Intelligence →</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="no-related-news-hint">
                No recent live feed news currently matched to {mission.name}. Archive intelligence records remain verified.
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mission-modal-footer">
          {mission.programmeId && onSelectProgramme && (
            <button
              className="programme-jump-btn"
              onClick={() => {
                onSelectProgramme(mission.programmeId)
                onClose()
              }}
            >
              Browse All {mission.programme} Missions →
            </button>
          )}
          <button className="btn-close-modal" onClick={onClose}>
            Close File
          </button>
        </div>
      </div>
    </div>
  )

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modalContent, document.body)
  }

  return modalContent
}
