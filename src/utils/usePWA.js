import { useState, useEffect } from 'react'

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSPrompt, setShowIOSPrompt] = useState(false)

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')

    setIsInstalled(isStandalone)

    // Detect iOS devices
    const userAgent = window.navigator.userAgent || ''
    const isAppleMobile = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
    setIsIOS(isAppleMobile)

    if (isStandalone) {
      setCanInstall(false)
      return
    }

    if (isAppleMobile) {
      // iOS doesn't fire beforeinstallprompt, but can be added to home screen
      setCanInstall(true)
    }

    function handleBeforeInstallPrompt(e) {
      // Prevent automatic mini-infobar on mobile Chrome
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    function handleAppInstalled() {
      setIsInstalled(true)
      setCanInstall(false)
      setDeferredPrompt(null)
      setShowIOSPrompt(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  async function promptInstall() {
    if (isIOS) {
      setShowIOSPrompt(true)
      return { outcome: 'ios_guide' }
    }

    if (!deferredPrompt) {
      return { outcome: 'unavailable' }
    }

    try {
      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult.outcome === 'accepted') {
        setCanInstall(false)
      }
      setDeferredPrompt(null)
      return choiceResult
    } catch (err) {
      console.warn('[PWA] Prompt error:', err)
      return { outcome: 'dismissed' }
    }
  }

  return {
    canInstall,
    isInstalled,
    isIOS,
    showIOSPrompt,
    setShowIOSPrompt,
    promptInstall,
  }
}
