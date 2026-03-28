import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function NavTabs({ activeTab, setActiveTab }) {
  const navigate = useNavigate()
  const location = useLocation()

  function handleTab(tab) {
    setActiveTab(tab)
    navigate(tab === 'feed' ? '/' : '/missions')
  }

  return (
    <div className="nav-tabs">
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
    </div>
  )
}