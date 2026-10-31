import React, { useLayoutEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Header from './components/Header'
import Ticker from './components/Ticker'
import NavTabs from './components/NavTabs'
import FeedView from './views/FeedView'
import MissionsView from './views/MissionsView'
import SavedView from './views/SavedView'
import Modal from './components/Modal'
import Onboarding from './components/Onboarding'
import AlertToast from './components/AlertToast'
import InstallPromptModal from './components/InstallPromptModal'
import { getPrefs, hasSeenOnboarding } from './utils/personalization'
import { useAlerts } from './utils/alerts'
import { usePWA } from './utils/usePWA'
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
  const {
    canInstall,
    isInstalled,
    showInstallModal,
    setShowInstallModal,
    platformInfo,
    promptInstall,
    hasNativePrompt,
  } = usePWA()
  const isInitialMount = useRef(true)

  useLayoutEffect(() => {
    const splashEl = document.getElementById('cosmos-launch-splash')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!splashEl) {
      if (!reducedMotion) {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
          tl.fromTo('.cosmos-header', { y: -50, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.75 })
            .fromTo('.nav-tab', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.09 }, '-=0.35')
            .fromTo('.app-view-shell', { y: 40, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.72 }, '-=0.2')
        }, '#cosmos-root')
        return () => ctx.revert()
      }
      return
    }

    if (reducedMotion) {
      splashEl.remove()
      return
    }

    // Hide root temporarily so it doesn't flash behind the splash
    gsap.set('#cosmos-root', { opacity: 0 })

    const statusEl = document.getElementById('cosmos-splash-status')
    const statusMessages = [
      { delay: 500, text: 'CALIBRATING ORBITAL TELEMETRY...' },
      { delay: 1100, text: 'SYNCHRONIZING SATELLITE FEEDS...' },
      { delay: 1650, text: 'SIGNAL ACQUIRED // SYSTEMS ONLINE' },
    ]

    const timers = statusMessages.map(({ delay, text }) =>
      setTimeout(() => {
        if (statusEl) statusEl.textContent = text
      }, delay)
    )

    let dismissed = false

    function dismissSplash() {
      if (dismissed) return
      dismissed = true
      timers.forEach(clearTimeout)
      splashEl.classList.add('splash-dismissing')

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Dissolve splash screen with a cinematic blur & scale
      tl.to(splashEl, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power2.inOut',
        onComplete: () => {
          splashEl.remove()
        },
      })
      // Smooth fade-in of CosmosHub dashboard
      .to('#cosmos-root', {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      }, '-=0.35')
      .fromTo('.cosmos-header',
        { y: -35, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65 },
        '-=0.3'
      )
      .fromTo('.nav-tab',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        '-=0.35'
      )
      .fromTo('.app-view-shell',
        { y: 35, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65 },
        '-=0.25'
      )
    }

    // User can tap/click anywhere to skip immediately
    splashEl.addEventListener('click', dismissSplash, { once: true })

    const MIN_SPLASH_TIME = 1950
    const launchTime = window.__COSMOS_LAUNCH_TIME__ || performance.now()
    const elapsed = performance.now() - launchTime
    const remaining = Math.max(0, MIN_SPLASH_TIME - elapsed)

    const timer = setTimeout(dismissSplash, remaining)

    return () => {
      clearTimeout(timer)
      timers.forEach(clearTimeout)
      splashEl.removeEventListener('click', dismissSplash)
    }
  }, [])

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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
      <Header
        statusText={statusText}
        notifyOn={notifyOn}
        toggleNotify={toggleNotify}
      />
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
            element={<MissionsView articles={articles} openModal={setModalData} />}
          />
          <Route
            path="/saved"
            element={
              <SavedView
                prefs={prefs}
                openModal={setModalData}
              />
            }
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

      <InstallPromptModal
        canInstall={canInstall}
        isInstalled={isInstalled}
        showInstallModal={showInstallModal}
        setShowInstallModal={setShowInstallModal}
        platformInfo={platformInfo}
        promptInstall={promptInstall}
        hasNativePrompt={hasNativePrompt}
      />
    </div>
  )
}
