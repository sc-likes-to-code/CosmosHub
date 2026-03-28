// ── alerts.js ────────────────────────────────────────

import { useState, useCallback, useRef } from 'react'

const NOTIFY_KEY = 'cosmos_notify'

const ALERT_MESSAGES = [
  { icon: '🚀', message: 'New NASA article: Latest JWST deep field image released'          },
  { icon: '🇮🇳', message: 'ISRO update: Chandrayaan mission status report published'         },
  { icon: '🌍', message: 'ESA: Euclid telescope delivers new cosmology data'                 },
  { icon: '🛸', message: 'Breaking: New exoplanet discovered in habitable zone'              },
  { icon: '🏠', message: 'ISS crew completes scheduled spacewalk successfully'               },
  { icon: '☄️', message: 'Alert: Near-Earth asteroid tracked — no risk confirmed'            },
  { icon: '🔭', message: 'JWST captures deepest infrared image of the universe yet'         },
  { icon: '🌕', message: 'Artemis update: Lunar Gateway module integration confirmed'        },
]

function getNotifyPref() {
  try { return localStorage.getItem(NOTIFY_KEY) === '1' } catch { return false }
}

function setNotifyPref(value) {
  try { localStorage.setItem(NOTIFY_KEY, value ? '1' : '0') } catch {}
}

let alertIndex = 0

export function useAlerts() {
  const [toasts,   setToasts]   = useState([])
  const [notifyOn, setNotifyOn] = useState(getNotifyPref)
  const intervalRef             = useRef(null)

  function addToast(icon, message) {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, icon, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }

  function startAlerts() {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      const { icon, message } = ALERT_MESSAGES[alertIndex % ALERT_MESSAGES.length]
      addToast(icon, message)
      alertIndex++
    }, 12000)
  }

  function stopAlerts() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const toggleNotify = useCallback(() => {
    setNotifyOn(prev => {
      const next = !prev
      setNotifyPref(next)
      if (next) {
        addToast('🔔', 'Alert system activated! You\'ll be notified of new space news.')
        startAlerts()
      } else {
        stopAlerts()
      }
      return next
    })
  }, [])

  return { toasts, notifyOn, toggleNotify }
}