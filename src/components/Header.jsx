import React from 'react'
import CosmosLogo from './CosmosLogo'

export default function Header({
  statusText,
  notifyOn,
  toggleNotify,
}) {
  const showStatusText = Boolean(statusText) && !/^(initializing|fetching|loading|using sample data|no updates|error loading)/i.test(statusText)

  return (
    <div className="cosmos-header">
      <div className="cosmos-brand">
        <div className="cosmos-logo-wrapper">
          <CosmosLogo size={38} />
        </div>
        <div>
          <div className="cosmos-brand-text" aria-label="CosmosHub">
            <span className="brand-name-cosmos">Cosmos</span>
            <span className="brand-name-hub">Hub</span>
          </div>
          <div className="cosmos-brand-sub">SPACE INTELLIGENCE NETWORK</div>
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
