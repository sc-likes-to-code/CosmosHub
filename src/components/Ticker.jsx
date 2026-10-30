import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Ticker({ articles = [] }) {
  const tickerRef = useRef(null)

  useLayoutEffect(() => {
    if (!articles.length || !tickerRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tickerRef.current,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
      )
    }, tickerRef)

    return () => ctx.revert()
  }, [articles.length > 0])

  if (!articles.length) return null

  // Extract up to 20 unique headlines without duplicates
  const uniqueTitles = []
  const seen = new Set()
  for (const a of articles) {
    const title = (a.title || '').trim()
    if (title && !seen.has(title)) {
      seen.add(title)
      uniqueTitles.push(title)
      if (uniqueTitles.length >= 20) break
    }
  }

  if (!uniqueTitles.length) return null

  const headlines = uniqueTitles.join(' \u00a0\u00a0\u2022\u00a0\u00a0 ')
  const doubled = headlines + ' \u00a0\u00a0\u2022\u00a0\u00a0 ' + headlines

  return (
    <div className="ticker" ref={tickerRef}>
      <span className="ticker-label">Live</span>
      <div className="ticker-text">
        <span className="ticker-inner">{doubled}</span>
      </div>
    </div>
  )
}
