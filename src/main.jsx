import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import App from './App'

// Auto-register service worker with immediate lifecycle updates
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[PWA] New CosmosHub version available.')
  },
  onOfflineReady() {
    console.log('[PWA] CosmosHub is ready for offline reading.')
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
