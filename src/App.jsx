import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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
  const [articles, setArticles] = useState([])
  const [activeTab, setActiveTab] = useState('feed')
  const [modalData, setModalData] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(!hasSeenOnboarding())
  const [statusText, setStatusText] = useState('Initializing...')
  const [prefs, setPrefs] = useState(getPrefs())
  const { toasts, notifyOn, toggleNotify } = useAlerts()

  function handleOnboardingDone(selectedPrefs) {
    setPrefs(selectedPrefs)
    setShowOnboarding(false)
  }

  return (
    <div id="cosmos-root">
      <Header statusText={statusText} notifyOn={notifyOn} toggleNotify={toggleNotify} />
      <Ticker articles={articles} />
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

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