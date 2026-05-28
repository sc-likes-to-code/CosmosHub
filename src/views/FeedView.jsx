import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import FilterBar from '../components/FilterBar'
import NewsCard from '../components/NewsCard'
import { fetchAllFeeds, SAMPLE_ARTICLES } from '../utils/rss'
import { rankArticles, isPinnedForUser } from '../utils/personalization'
import { getMultiSummary } from '../utils/ai'
import { getTrustMeta } from '../utils/trust'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const POLL_INTERVAL = 5 * 60 * 1000 // 5 minutes
const AI_SUMMARY_LIMIT = Number(import.meta.env.VITE_AI_SUMMARY_LIMIT || 40)
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000
gsap.registerPlugin(ScrollTrigger)

function hasTimezoneInfo(value) {
  return /(Z|[+-]\d{2}:?\d{2}|GMT|UTC)$/i.test(String(value || '').trim())
}

function toTimestampIST(value) {
  if (!value) return 0
  const raw = String(value).trim()

  if (hasTimezoneInfo(raw)) {
    const ts = Date.parse(raw)
    return Number.isFinite(ts) ? ts : 0
  }

  const istTs = Date.parse(`${raw} GMT+0530`)
  if (Number.isFinite(istTs)) return istTs

  const fallback = Date.parse(raw)
  return Number.isFinite(fallback) ? fallback : 0
}

function fallbackSummaries(desc) {
  const safe = (desc || 'No summary available.').trim()
  const short = safe.slice(0, 120)
  return {
    shortSummary: short || 'No summary available.',
    detailedSummary: safe,
    eli12Summary: short || 'No summary available.',
  }
}

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenSet(text) {
  return new Set(normalizeText(text).split(' ').filter(Boolean))
}

function jaccardSimilarity(a, b) {
  if (!a.size || !b.size) return 0
  let intersection = 0
  a.forEach(token => {
    if (b.has(token)) intersection += 1
  })
  const union = a.size + b.size - intersection
  return union ? intersection / union : 0
}

function isSummaryDuplicate(candidate, existing) {
  const titleScore = jaccardSimilarity(tokenSet(candidate.article.title), tokenSet(existing.article.title))
  const shortScore = jaccardSimilarity(
    tokenSet(candidate.summaries.shortSummary),
    tokenSet(existing.summaries.shortSummary)
  )
  return titleScore >= 0.7 || shortScore >= 0.68
}

function isBetterCandidate(candidate, existing) {
  const candidateTrust = getTrustMeta(candidate.article.source?.name).trust
  const existingTrust = getTrustMeta(existing.article.source?.name).trust
  if (candidateTrust !== existingTrust) return candidateTrust > existingTrust

  const candidateOrder = Number.isFinite(candidate.article.ingestOrder)
    ? candidate.article.ingestOrder
    : Number.MAX_SAFE_INTEGER
  const existingOrder = Number.isFinite(existing.article.ingestOrder)
    ? existing.article.ingestOrder
    : Number.MAX_SAFE_INTEGER
  return candidateOrder < existingOrder
}

function sortByNewest(a, b) {
  const da = toTimestampIST(a.pubDate)
  const db = toTimestampIST(b.pubDate)
  if (db !== da) return db - da
  return String(a.title || '').localeCompare(String(b.title || ''))
}

export default function FeedView({ prefs, setArticles, setStatusText, openModal }) {
  const [cards, setCards] = useState([])
  const [filter, setFilter] = useState(() => (prefs.length > 0 ? 'for-you' : 'all'))
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const pollTimeoutRef = useRef(null)
  const viewRef = useRef(null)
  const prevPrefsLengthRef = useRef(prefs.length)

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

  useEffect(() => {
    if (prevPrefsLengthRef.current === 0 && prefs.length > 0) {
      setFilter('for-you')
    }
    prevPrefsLengthRef.current = prefs.length
  }, [prefs])

  async function loadFeed(isAutoRefresh = false) {
    if (isAutoRefresh) {
      setIsRefreshing(true)
    } else {
      setLoading(true)
      setCards([])
    }
    
    const statusPrefix = isAutoRefresh ? '🔄 Refreshing' : 'Fetching live feeds'
    setStatusText(`${statusPrefix}...`)

    try {
      let raw = await fetchAllFeeds()
      if (!raw.length) {
        raw = SAMPLE_ARTICLES
        setStatusText('Using sample data (feed unavailable)')
      } else {
        setStatusText('Loading live feed...')
      }

      const ranked = [...raw].sort(sortByNewest)
      const cutoff = Date.now() - SEVEN_DAYS_MS
      const recent = ranked.filter(a => toTimestampIST(a.pubDate) >= cutoff)
      const displayPool = recent.length ? recent : ranked

      if (!recent.length) {
        setStatusText('No updates in the last 7 days — showing latest available articles')
      }

      // Keep Feed and Missions views in sync with the same visible date window/fallback pool.
      setArticles(displayPool)

      const grid = []
      const targetCount = displayPool.length
      for (let i = 0; i < targetCount; i++) {
        const article = displayPool[i]
        const summaries = i < AI_SUMMARY_LIMIT
          ? await getMultiSummary(article.title, article.desc)
          : fallbackSummaries(article.desc)

        const candidate = { article, summaries }
        const duplicateIndex = grid.findIndex(existing => isSummaryDuplicate(candidate, existing))
        if (duplicateIndex === -1) {
          grid.push(candidate)
          continue
        }

        if (isBetterCandidate(candidate, grid[duplicateIndex])) {
          grid[duplicateIndex] = candidate
        }
      }

      setCards(grid)
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

  const sourceTabs = Array.from(
    new Set(cards.map(({ article }) => article.source?.name).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b))

  useEffect(() => {
    if (filter !== 'all' && filter !== 'for-you' && !sourceTabs.includes(filter)) {
      setFilter('all')
    }
  }, [filter, sourceTabs])

  const filtered = cards.filter(({ article }) => {
    if (filter === 'for-you') return isPinnedForUser(article, prefs)
    if (filter === 'all') return true
    return article.source?.name === filter
  })

  const visibleCards = filter === 'for-you'
    ? rankArticles(filtered.map(({ article }) => article), prefs)
        .map(article => filtered.find(card => card.article === article))
        .filter(Boolean)
    : filtered

  return (
    <div ref={viewRef}>
      <FilterBar active={filter} onChange={setFilter} sources={sourceTabs} />
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="section-title">Latest transmissions</span>
          <button
            className={`refresh-btn${isRefreshing ? ' refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            title="Refresh feed"
          >
            <span className="refresh-icon" aria-hidden="true">⟳</span>
            <span className="refresh-label">{isRefreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>
        <span className={`article-count${loading ? ' article-count-loading' : ''}`}>
          {loading ? '' : `${visibleCards.length} articles`}
        </span>
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
        {visibleCards.map(({ article, summaries }, i) => (
          <NewsCard
            key={article.title + i}
            article={article}
            summaries={summaries}
            index={i}
            prefs={prefs}
            onExpand={openModal}
          />
        ))}
        {!loading && visibleCards.length === 0 && (
          <div className="error-state" style={{gridColumn:'1/-1'}}>
            <div style={{fontSize:28,marginBottom:'0.5rem'}}>📡</div>
            <strong>No articles found for this filter.</strong>
          </div>
        )}
      </div>
    </div>
  )
}