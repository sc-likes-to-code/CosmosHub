import React from 'react'
import { createPortal } from 'react-dom'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[CosmosHub ErrorBoundary]: Uncaught error caught by boundary', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (typeof this.props.onReset === 'function') {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback(this.state.error, this.handleReset)
          : this.props.fallback
      }

      const fallbackContent = (
        <div
          className="mission-modal-backdrop"
          onClick={this.handleReset}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="mission-modal-box"
            style={{ maxWidth: '500px', padding: '2rem', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <h3 style={{ color: '#f1f5f9', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
              Intelligence Dossier Unavailable
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              An unexpected display anomaly occurred while rendering this mission file. The core platform remains operational.
            </p>
            <button
              className="btn-close-modal"
              onClick={this.handleReset}
              style={{
                background: '#0284c7',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )

      if (typeof document !== 'undefined' && document.body) {
        return createPortal(fallbackContent, document.body)
      }
      return fallbackContent
    }

    return this.props.children
  }
}
