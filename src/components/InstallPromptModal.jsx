import React, { useState, useEffect } from 'react'
import CosmosLogo from './CosmosLogo'

export default function InstallPromptModal({
  canInstall,
  isInstalled,
  showInstallModal,
  setShowInstallModal,
  platformInfo,
  promptInstall,
  hasNativePrompt,
}) {
  const [dismissed, setDismissed] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  const { isIOS, isAndroid, isMacSafari } = platformInfo || {}

  useEffect(() => {
    // Clear any previous dismissal so the bottom banner is always available to the user
    try {
      sessionStorage.removeItem('cosmoshub_install_banner_dismissed')
    } catch {}
  }, [])

  function handleDismiss() {
    setDismissed(true)
  }

  async function handleInstallAction() {
    setIsInstalling(true)
    try {
      await promptInstall()
    } finally {
      setIsInstalling(false)
    }
  }

  // 1. Fallback modal for browsers that do not support beforeinstallprompt (e.g. iOS Safari)
  const renderModalContent = () => {
    if (isIOS) {
      return (
        <div className="install-guide-box">
          <div className="install-guide-title">How to Install on iPhone / iPad:</div>
          <div className="ios-steps">
            <div className="ios-step-item">
              <span className="step-num">1</span>
              <div>
                Tap the <strong>Share</strong> button in Safari toolbar
                <span className="ios-icon-badge" title="Share">⎋</span>
              </div>
            </div>
            <div className="ios-step-item">
              <span className="step-num">2</span>
              <div>
                Scroll down and select <strong>Add to Home Screen</strong>
                <span className="ios-icon-badge" title="Add to Home Screen">⊞</span>
              </div>
            </div>
            <div className="ios-step-item">
              <span className="step-num">3</span>
              <div>
                Tap <strong>Add</strong> in the top-right corner.
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (isMacSafari) {
      return (
        <div className="install-guide-box">
          <div className="install-guide-title">How to Install on macOS Safari:</div>
          <div className="ios-steps">
            <div className="ios-step-item">
              <span className="step-num">1</span>
              <div>Click <strong>File</strong> in the macOS top menu bar.</div>
            </div>
            <div className="ios-step-item">
              <span className="step-num">2</span>
              <div>Select <strong>Add to Dock...</strong> and confirm.</div>
            </div>
          </div>
        </div>
      )
    }

    // Default Chromium / Desktop fallback if prompt was already dismissed
    return (
      <div className="install-guide-box">
        <div className="install-guide-title">Install CosmosHub App:</div>
        <div className="ios-steps">
          <div className="ios-step-item">
            <span className="step-num">1</span>
            <div>Click the <strong>Install icon (⊕ / ⬇)</strong> on the right side of your browser's address bar.</div>
          </div>
          <div className="ios-step-item">
            <span className="step-num">2</span>
            <div>Or click browser menu <strong>(⋮)</strong> ➔ <strong>"Install CosmosHub"</strong>.</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ── Optional Fallback Instructions Modal ── */}
      {showInstallModal && (
        <div className="install-modal-backdrop" onClick={() => setShowInstallModal(false)}>
          <div className="install-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="install-modal-header">
              <CosmosLogo size={36} />
              <div className="install-modal-titles">
                <h3>Install CosmosHub</h3>
                <p>Run CosmosHub in a dedicated desktop or mobile window</p>
              </div>
              <button
                className="install-close-btn"
                onClick={() => setShowInstallModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {renderModalContent()}

            <div className="install-modal-footer">
              <button
                className="install-action-btn primary"
                onClick={handleInstallAction}
                disabled={isInstalling}
                style={{ flex: 1 }}
              >
                {isInstalling ? 'Opening...' : '⬇ Install App'}
              </button>
              <button
                className="install-action-btn secondary"
                onClick={() => setShowInstallModal(false)}
                style={{ flex: 0.5 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Bottom Install Banner (Exact Match to User Image) ── */}
      {!dismissed && (
        <aside className="install-toast-banner" aria-label="Install CosmosHub application">
          <div className="install-toast-left">
            <CosmosLogo size={34} />
            <div className="install-toast-text">
              <div className="install-toast-title">Install CosmosHub App</div>
              <div className="install-toast-desc">
                Get instant space transmissions, offline reading &amp; native performance.
              </div>
            </div>
          </div>

          <div className="install-toast-actions">
            <button
              className="install-action-btn primary"
              onClick={handleInstallAction}
              disabled={isInstalling}
            >
              {isInstalling ? 'Opening...' : 'Install App'}
            </button>
            <button
              className="install-action-btn secondary"
              onClick={handleDismiss}
              title="Dismiss"
            >
              Later
            </button>
          </div>
        </aside>
      )}
    </>
  )
}
