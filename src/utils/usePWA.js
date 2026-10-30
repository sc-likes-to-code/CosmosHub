import { useState, useEffect } from 'react'

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(
    () => window.__COSMOS_DEFERRED_PROMPT__ || null
  )
  const [isInstalled, setIsInstalled] = useState(false)
  const [canInstall, setCanInstall] = useState(true)
  const [showInstallModal, setShowInstallModal] = useState(false)
  const [platformInfo, setPlatformInfo] = useState({
    isIOS: false,
    isAndroid: false,
    isMacSafari: false,
    isFirefox: false,
    isChromium: true,
  })

  useEffect(() => {
    // 1. Detect if running in standalone mode (already installed as PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')

    setIsInstalled(isStandalone)
    if (isStandalone) {
      setCanInstall(false)
      return
    }

    // 2. Platform / Browser detection
    const userAgent = window.navigator.userAgent || ''
    const isAppleMobile = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
    const isAndroid = /Android/i.test(userAgent)
    const isMac = /Macintosh|Mac OS X/i.test(userAgent) && !isAppleMobile
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent)
    const isMacSafari = isMac && isSafari
    const isFirefox = /firefox/i.test(userAgent)
    const isChromium = Boolean(window.chrome) || /chrome|chromium|crios|edg/i.test(userAgent)

    setPlatformInfo({
      isIOS: isAppleMobile,
      isAndroid,
      isMacSafari,
      isFirefox,
      isChromium,
    })

    // If early event was already captured in <head>
    if (window.__COSMOS_DEFERRED_PROMPT__) {
      setDeferredPrompt(window.__COSMOS_DEFERRED_PROMPT__)
    }

    // Hook callback for any subsequent or future prompt
    window.__COSMOS_PROMPT_CALLBACK__ = (e) => {
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    function handleBeforeInstallPrompt(e) {
      e.preventDefault()
      window.__COSMOS_DEFERRED_PROMPT__ = e
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    function handleAppInstalled() {
      setIsInstalled(true)
      setCanInstall(false)
      setDeferredPrompt(null)
      window.__COSMOS_DEFERRED_PROMPT__ = null
      setShowInstallModal(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.__COSMOS_PROMPT_CALLBACK__ = null
    }
  }, [])

  async function promptInstall() {
    const promptEvent = deferredPrompt || window.__COSMOS_DEFERRED_PROMPT__

    // If native prompt is available (Chrome / Edge / Chromium / Android) -> Trigger native dialog!
    if (promptEvent) {
      try {
        promptEvent.prompt()
        const choiceResult = await promptEvent.userChoice
        if (choiceResult && choiceResult.outcome === 'accepted') {
          setIsInstalled(true)
          setCanInstall(false)
          setShowInstallModal(false)
        }
        setDeferredPrompt(null)
        window.__COSMOS_DEFERRED_PROMPT__ = null
        return choiceResult
      } catch (err) {
        console.warn('[PWA] Prompt invocation error:', err)
        setShowInstallModal(true)
        return { outcome: 'error' }
      }
    }

    // Fallback if browser doesn't support beforeinstallprompt (e.g. iOS Safari)
    setShowInstallModal(true)
    return { outcome: 'modal_opened' }
  }

  return {
    canInstall,
    isInstalled,
    showInstallModal,
    setShowInstallModal,
    platformInfo,
    promptInstall,
    hasNativePrompt: Boolean(deferredPrompt || window.__COSMOS_DEFERRED_PROMPT__),
  }
}
