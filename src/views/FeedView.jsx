import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import FilterBar from '../components/FilterBar'
import NewsCard from '../components/NewsCard'
import { fetchAllFeeds, SAMPLE_ARTICLES } from '../utils/rss'
import { rankArticles } from '../utils/personalization'
import { getMultiSummary } from '../utils/ai'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const POLL_INTERVAL = 5 * 60 * 1000 // 5 minutes
const MAX_RENDER_CARDS = Number(import.meta.env.VITE_MAX_CARDS || 120)
const AI_SUMMARY_LIMIT = Number(import.meta.env.VITE_AI_SUMMARY_LIMIT || 40)
gsap.registerPlugin(ScrollTrigger)

function fallbackSummaries(desc) {
  const safe = (desc || 'No summary available.').trim()
  const short = safe.slice(0, 120)
  return {
    shortSummary: short || 'No summary available.',
    detailedSummary: safe,
    eli12Summary: short || 'No summary available.',
  }
}

export default function FeedView({ prefs, setArticles, setStatusText, openModal }) {
  const [cards, setCards] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const pollTimeoutRef = useRef(null)
  const viewRef = useRef(null)

  useEffect(() => {
    loadFeed()
    // Set up auto-refresh
    const scheduleRefresh = () => {
      pollTimeoutRef.current = setTimeout(() => {
        loadFeed(true)
        scheduleRefresh()
      }, POLL_INTERVAL)
    }
    scheduleRefresh()

    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current)
    }
  }, [prefs])

  async function loadFeed(isAutoRefresh = false) {
    if (isAutoRefresh) {
      setIsRefreshing(true)
    } else {
      setLoading(true)
    }
    
    const statusPrefix = isAutoRefresh ? '🔄 Refreshing' : 'Fetching live feeds'
    setStatusText(`${statusPrefix}...`)

    try {
      let raw = await fetchAllFeeds()
      if (!raw.length) {
        raw = SAMPLE_ARTICLES
        setStatusText('Using sample data (feed unavailable)')
      } else {
        setStatusText(`${raw.length} articles — generating AI summaries...`)
      }

      const ranked = rankArticles(raw, prefs)
      setArticles(ranked)

      const grid = []
      const targetCount = Math.min(ranked.length, Math.max(1, MAX_RENDER_CARDS))
      for (let i = 0; i < targetCount; i++) {
        const article = ranked[i]
        const summaries = i < AI_SUMMARY_LIMIT
          ? await getMultiSummary(article.title, article.desc)
          : fallbackSummaries(article.desc)
        grid.push({ article, summaries })
        setCards([...grid])
      }

      setStatusText(`Live · ${grid.length} articles ${isAutoRefresh ? '(updated)' : ''}`)
    } catch (error) {
      console.error('Feed load error:', error)
      setStatusText('Error loading feed - using cached data')
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  function handleRefresh() {
    loadFeed(true)
  }

  useLayoutEffect(() => {
    if (loading) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cardsEls = gsap.utils.toArray('.cosmos-grid .news-card')
      if (!cardsEls.length) return

      const introBatch = cardsEls.slice(0, 10)
      gsap.fromTo(
        introBatch,
        { opacity: 0, y: 46, scale: 0.94, rotateX: -8, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.07,
          clearProps: 'opacity,transform',
        }
      )

      cardsEls.slice(10).forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 54, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: Math.min(i * 0.015, 0.18),
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )
      })
    }, viewRef)

    return () => ctx.revert()
  }, [loading, cards.length, filter])

  const filtered = cards.filter(({ article }) => {
    if (filter === 'all') return true
    return article.source.name === filter || article.source.key === filter.toLowerCase()
  })

  return (
    <div ref={viewRef}>
      <FilterBar active={filter} onChange={setFilter} />
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="section-title">Latest transmissions</span>
          <button
            className="refresh-btn"
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            title="Refresh feed"
          >
            {isRefreshing ? '⟳ Updating...' : '⟳'}
          </button>
        </div>
        <span className="article-count">{filtered.length} articles</span>
      </div>
      <div className="cosmos-grid">
        {loading && cards.length === 0 && (
          <>
            {[0,1,2].map(i => (
              <div key={i} className="loading-card">
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div className="skeleton skel-sm" />
                  <div className="skeleton skel-sm" style={{width:40}} />
                </div>
                <div className="skeleton skel-md" />
                <div className="skeleton skel-md" style={{width:'85%'}} />
                <div className="skeleton skel-line" />
                <div className="skeleton skel-line" />
                <div className="skeleton skel-short" />
              </div>
            ))}
          </>
        )}
        {filtered.map(({ article, summaries }, i) => (
          <NewsCard
            key={article.title + i}
            article={article}
            summaries={summaries}
            index={i}
            prefs={prefs}
            onExpand={openModal}
          />
        ))}
        {!loading && filtered.length === 0 && (
          <div className="error-state" style={{gridColumn:'1/-1'}}>
            <div style={{fontSize:28,marginBottom:'0.5rem'}}>📡</div>
            <strong>No articles found for this filter.</strong>
          </div>
        )}
      </div>
    </div>
  )
}