import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Ticker({ articles }) {
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

  const headlines = articles.slice(0, 10).map(a => a.title).join(' \u00a0\u00a0\u2022\u00a0\u00a0 ')

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
