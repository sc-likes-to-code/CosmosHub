import React from 'react'
import { MISSIONS } from '../data/missions'

function TimelineDot({ done, current }) {
  const cls = done ? 'tl-done' : current ? 'tl-current' : 'tl-future'
  return <div className={`tl-dot ${cls}`} />
}

function MissionCard({ mission, articles }) {
  const related = articles
    .filter(a =>
      (a.title + ' ' + (a.desc || ''))
        .toLowerCase()
        .includes(mission.name.split(' ')[0].toLowerCase())
    )
    .slice(0, 2)

  const statusCls =
    mission.status === 'active'
      ? 'status-active'
      : mission.status === 'upcoming'
      ? 'status-upcoming'
      : 'status-planned'

  return (
    <div className="mission-card">
      <div className="mission-header">
        <div className="mission-name">{mission.name}</div>
        <span className={`mission-status ${statusCls}`}>
          {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
        </span>
      </div>
      <div className="mission-agency">{mission.agency}</div>
      <div className="mission-desc">{mission.desc}</div>

      <div className="mission-timeline">
        {mission.timeline.map((item, i) => (
          <div className="timeline-item" key={i}>
            <TimelineDot done={item.done} current={item.current} />
            <div>
              <span className="tl-text">{item.label}</span>{' '}
              <span className="tl-year">{item.year}</span>
            </div>
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mission-updates">
          <div className="mission-update-label">Related news</div>
          {related.map((a, i) => (
            <div className="mission-update-item" key={i}>
              → {a.title.length > 70 ? a.title.slice(0, 70) + '...' : a.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MissionsView({ articles }) {
  return (
    <div className="missions-page">
      <div
        className="section-title"
        style={{ marginBottom: '1rem' }}
      >
        Mission Control — Active & Upcoming
      </div>
      <div className="missions-grid">
        {MISSIONS.map((mission, i) => (
          <MissionCard
            key={i}
            mission={mission}
            articles={articles}
          />
        ))}
      </div>
    </div>
  )
}