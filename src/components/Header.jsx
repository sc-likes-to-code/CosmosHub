import React from 'react'

export default function Header({ statusText, notifyOn, toggleNotify }) {
  const showStatusText = Boolean(statusText) && !/^(initializing|fetching|loading|using sample data|no updates|error loading)/i.test(statusText)

  return (
    <div className="cosmos-header">
      <div className="cosmos-brand">
        <div className="cosmos-logo">🌌</div>
        <div>
          <div className="cosmos-brand-text">CosmosHub</div>
          <div className="cosmos-brand-sub">Verified Space Intelligence Platform</div>
        </div>
      </div>
      <div className="header-right">
        <button
          className={`notify-btn${notifyOn ? ' active' : ''}`}
          onClick={toggleNotify}
        >
          🔔 {notifyOn ? 'Alerts on' : 'Notify me'}
        </button>
        <div className="status-pill">
          <div className="status-dot" />
          {showStatusText && <span>{statusText}</span>}
        </div>
      </div>
    </div>
  )
}