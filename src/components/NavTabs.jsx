import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function NavTabs({ activeTab, setActiveTab }) {
  const navigate = useNavigate()
  const location = useLocation()
  const tabsRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, left: 0, width: 0 })

  useLayoutEffect(() => {
    const root = tabsRef.current
    if (!root) return

    function updateIndicator() {
      const active = root.querySelector('.nav-tab.active')
      if (!active) {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
        return
      }

      setIndicatorStyle({
        opacity: 1,
        left: active.offsetLeft + 16,
        width: Math.max(0, active.offsetWidth - 32),
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [location.pathname])

  function handleTab(tab) {
    setActiveTab(tab)
    navigate(tab === 'feed' ? '/' : '/missions')
  }

  return (
    <div className="nav-tabs" ref={tabsRef}>
      <button
        className={`nav-tab${location.pathname === '/' ? ' active' : ''}`}
        onClick={() => handleTab('feed')}
      >
        🛰 Live Feed
      </button>
      <button
        className={`nav-tab${location.pathname === '/missions' ? ' active' : ''}`}
        onClick={() => handleTab('missions')}
      >
        🚀 Mission Tracker
      </button>
      <span
        className="nav-indicator"
        style={{
          opacity: indicatorStyle.opacity,
          width: `${indicatorStyle.width}px`,
          transform: `translateX(${indicatorStyle.left}px)`,
        }}
        aria-hidden="true"
      />
    </div>
  )
}