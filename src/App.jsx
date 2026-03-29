import React, { useLayoutEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Header from './components/Header'
import Ticker from './components/Ticker'
import NavTabs from './components/NavTabs'
import FeedView from './views/FeedView'
import MissionsView from './views/MissionsView'
import Modal from './components/Modal'
import Onboarding from './components/Onboarding'
import AlertToast from './components/AlertToast'
import { getPrefs, hasSeenOnboarding } from './utils/personalization'
import { useAlerts } from './utils/alerts'
import './styles/global.css'

export default function App() {
  const location = useLocation()
  const [articles, setArticles] = useState([])
  const [activeTab, setActiveTab] = useState('feed')
  const [modalData, setModalData] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding())
  const [statusText, setStatusText] = useState('Initializing...')
  const [prefs, setPrefs] = useState(getPrefs())
  const { toasts, notifyOn, toggleNotify } = useAlerts()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.cosmos-header', { y: -50, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.75 })
        .fromTo('.ticker', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.42')
        .fromTo('.nav-tab', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.09 }, '-=0.35')
        .fromTo('.app-view-shell', { y: 40, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.72 }, '-=0.2')
    }, '#cosmos-root')

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.app-view-shell',
        { opacity: 0, y: 16, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.42, ease: 'power2.out' }
      )
    }, '#cosmos-root')

    return () => ctx.revert()
  }, [location.pathname])

  function handleOnboardingDone(selectedPrefs) {
    setPrefs(selectedPrefs)
    setShowOnboarding(false)
  }

  return (
    <div id="cosmos-root">
      <Header statusText={statusText} notifyOn={notifyOn} toggleNotify={toggleNotify} />
      <Ticker articles={articles} />
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="app-view-shell">
        <Routes>
          <Route
            path="/"
            element={
              <FeedView
                prefs={prefs}
                setArticles={setArticles}
                setStatusText={setStatusText}
                openModal={setModalData}
              />
            }
          />
          <Route
            path="/missions"
            element={<MissionsView articles={articles} />}
          />
        </Routes>
      </div>

      {modalData && (
        <Modal data={modalData} onClose={() => setModalData(null)} />
      )}

      {showOnboarding && (
        <Onboarding onDone={handleOnboardingDone} />
      )}

      <AlertToast toasts={toasts} />
    </div>
  )
}