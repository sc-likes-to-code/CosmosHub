import React, { useState, useEffect } from 'react'
import CosmosLogo from './CosmosLogo'

export default function InstallPromptModal({
  canInstall,
  isInstalled,
  isIOS,
  showIOSPrompt,
  setShowIOSPrompt,
  promptInstall,
}) {
  const [dismissed, setDismissed] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('cosmoshub_install_banner_dismissed')
    if (wasDismissed === 'true') {
      setDismissed(true)
    }
  }, [])

  function handleDismiss() {
    setDismissed(true)
    sessionStorage.setItem('cosmoshub_install_banner_dismissed', 'true')
    setShowIOSPrompt(false)
  }

  async function handleInstallClick() {
    setIsInstalling(true)
    try {
      await promptInstall()
    } finally {
      setIsInstalling(false)
    }
  }

  // iOS Home Screen Modal
  if (showIOSPrompt) {
    return (
      <div className="install-modal-backdrop" onClick={() => setShowIOSPrompt(false)}>
        <div className="install-modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="install-modal-header">
            <CosmosLogo size={36} />
            <div className="install-modal-titles">
              <h3>Install CosmosHub on iOS</h3>
              <p>Add to your Home Screen for a fullscreen space app</p>
            </div>
            <button className="install-close-btn" onClick={() => setShowIOSPrompt(false)}>✕</button>
          </div>

          <div className="ios-steps">
            <div className="ios-step-item">
              <span className="step-num">1</span>
              <div>
                Tap the <strong>Share</strong> button in Safari's bottom toolbar
                <span className="ios-icon-badge" aria-label="Share icon">⎋</span>
              </div>
            </div>
            <div className="ios-step-item">
              <span className="step-num">2</span>
              <div>
                Scroll down and tap <strong>Add to Home Screen</strong>
                <span className="ios-icon-badge" aria-label="Add icon">⊞</span>
              </div>
            </div>
            <div className="ios-step-item">
              <span className="step-num">3</span>
              <div>
                Tap <strong>Add</strong> in the top-right corner to finish.
              </div>
            </div>
          </div>

          <button className="install-action-btn primary" onClick={() => setShowIOSPrompt(false)}>
            Got it
          </button>
        </div>
      </div>
    )
  }

  // Floating bottom installation bar (Desktop & Mobile)
  if (!canInstall || isInstalled || dismissed) {
    return null
  }

  return (
    <aside className="install-toast-banner" aria-label="Install CosmosHub application">
      <div className="install-toast-left">
        <CosmosLogo size={40} />
        <div className="install-toast-text">
          <div className="install-toast-title">Install CosmosHub App</div>
          <div className="install-toast-desc">
            Get instant space transmissions, offline reading & native performance.
          </div>
        </div>
      </div>

      <div className="install-toast-actions">
        <button
          className="install-action-btn primary"
          onClick={handleInstallClick}
          disabled={isInstalling}
        >
          {isInstalling ? 'Launching...' : 'Install App'}
        </button>
        <button
          className="install-action-btn secondary"
          onClick={handleDismiss}
          title="Dismiss for this session"
        >
          Later
        </button>
      </div>
    </aside>
  )
}
