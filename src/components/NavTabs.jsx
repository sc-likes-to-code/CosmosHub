import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSavedArticles } from '../utils/bookmarks'

export default function NavTabs({ activeTab, setActiveTab }) {
  const navigate = useNavigate()
  const location = useLocation()
  const tabsRef = useRef(null)
  const { savedCount } = useSavedArticles()
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
  }, [location.pathname, savedCount])

  function handleTab(tab) {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tab)
    }
    if (tab === 'feed') {
      navigate('/')
    } else if (tab === 'missions') {
      navigate('/missions')
    } else if (tab === 'saved') {
      navigate('/saved')
    }
  }

  return (
    <div className="nav-tabs" ref={tabsRef}>
      <button
        type="button"
        className={`nav-tab${location.pathname === '/' ? ' active' : ''}`}
        onClick={() => handleTab('feed')}
      >
        🛰 Live Feed
      </button>
      <button
        type="button"
        className={`nav-tab${location.pathname === '/missions' ? ' active' : ''}`}
        onClick={() => handleTab('missions')}
      >
        🚀 Mission Tracker
      </button>
      <button
        type="button"
        className={`nav-tab${location.pathname === '/saved' ? ' active' : ''}`}
        onClick={() => handleTab('saved')}
      >
        📑 Saved
        {savedCount > 0 && (
          <span className="nav-tab-badge" aria-label={`${savedCount} saved articles`}>
            {savedCount}
          </span>
        )}
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
