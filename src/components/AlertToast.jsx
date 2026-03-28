import React from 'react'

export default function AlertToast({ toasts }) {
  if (!toasts.length) return null

  return (
    <div className="alert-toast">
      {toasts.map(toast => (
        <div key={toast.id} className="toast-item">
          <span className="toast-icon">{toast.icon}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}