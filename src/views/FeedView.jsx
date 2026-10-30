import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import FilterBar from '../components/FilterBar'
import NewsCard from '../components/NewsCard'
import { fetchAllFeeds, SAMPLE_ARTICLES } from '../utils/rss'
import { rankArticles, isPinnedForUser } from '../utils/personalization'
import { getMultiSummary } from '../utils/ai'
import { getTrustMeta } from '../utils/trust'
import { searchArticles, loadHistoricalArticles } from '../utils/search'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const POLL_INTERVAL = 5 * 60 * 1000 // 5 minutes
const AI_SUMMARY_LIMIT = Number(import.meta.env.VITE_AI_SUMMARY_LIMIT || 40)
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
const PAGE_SIZE = 24
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
  const [searchInput, setSearchInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [historicalPool, setHistoricalPool] = useState([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const pollTimeoutRef = useRef(null)
  const viewRef = useRef(null)
  const prevPrefsLengthRef = useRef(prefs.length)
  const prevVisibleCountRef = useRef(PAGE_SIZE)
  const prevFilterRef = useRef(filter)
  const prevQueryRef = useRef(debouncedQuery)
  const prevPrefsRef = useRef(prefs)

  // Synchronously reset pagination during render phase when filter, search, or prefs change
  // to avoid multi-pass render flashes.
  if (
    prevFilterRef.current !== filter ||
    prevQueryRef.current !== debouncedQuery ||
    prevPrefsRef.current !== prefs
  ) {
    prevFilterRef.current = filter
    prevQueryRef.current = debouncedQuery
    prevPrefsRef.current = prefs
    setVisibleCount(PAGE_SIZE)
  }

  // 250ms debounce for search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim())
    }, 250)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Preload historical archive in background for global search
  useEffect(() => {
    loadHistoricalArticles()
      .then(pool => {
        setHistoricalPool(pool || [])
      })
      .catch(err => {
        console.warn('Historical search pool unavailable:', err)
      })
  }, [])

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
      // Expanded 30-day rolling window
      const cutoff = Date.now() - THIRTY_DAYS_MS
      const recent = ranked.filter(a => toTimestampIST(a.pubDate) >= cutoff)
      const displayPool = recent.length ? recent : ranked

      if (!recent.length) {
        setStatusText('No updates in the last 30 days — showing latest available articles')
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

  function handleClearSearch() {
    setSearchInput('')
    setDebouncedQuery('')
  }

  // 1. Initial load, filter changes, and search query changes:
  // Animate the initial viewport cards and register ScrollTriggers for remaining initial batch.
  useLayoutEffect(() => {
    if (loading) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const cardsEls = gsap.utils.toArray('.cosmos-grid .news-card')
      if (!cardsEls.length) return

      prevVisibleCountRef.current = Math.min(cardsEls.length, PAGE_SIZE)

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

      cardsEls.slice(10, PAGE_SIZE).forEach((card, i) => {
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
  }, [loading, cards.length, filter, debouncedQuery, prefs])

  // 2. Incremental "Load More" animations:
  // Animate only the newly appended batch of cards without reverting or disrupting
  // previously registered ScrollTriggers on existing cards.
  useLayoutEffect(() => {
    if (loading) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (visibleCount <= PAGE_SIZE) return

    const cardsEls = gsap.utils.toArray('.cosmos-grid .news-card')
    const prevCount = prevVisibleCountRef.current
    prevVisibleCountRef.current = visibleCount

    const newBatch = cardsEls.slice(prevCount, visibleCount)
    if (!newBatch.length) return

    const tween = gsap.fromTo(
      newBatch,
      { opacity: 0, y: 36, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
      }
    )

    return () => {
      tween.kill()
    }
  }, [visibleCount])

  // Extract source tabs
  const sourceTabs = Array.from(
    new Set(cards.map(({ article }) => article.source?.name).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b))

  useEffect(() => {
    if (filter !== 'all' && filter !== 'for-you' && !sourceTabs.includes(filter)) {
      setFilter('all')
    }
  }, [filter, sourceTabs])

  // Determine active display pool
  let visibleCards = []

  if (debouncedQuery) {
    // 1. Build comprehensive search pool: current cards + deduplicated historical archive
    const existingIds = new Set(
      cards.map(({ article }) => article.id || article.link).filter(Boolean)
    )
    const historicalCardItems = historicalPool
      .filter(h => !existingIds.has(h.id) && !existingIds.has(h.link))
      .map(h => ({
        article: h,
        summaries: fallbackSummaries(h.desc),
      }))

    const combinedPool = [...cards, ...historicalCardItems]

    // 2. Filter by source or personalization
    const sourceFiltered = combinedPool.filter(({ article }) => {
      if (filter === 'for-you') return isPinnedForUser(article, prefs)
      if (filter === 'all') return true
      return article.source?.name === filter
    })

    // 3. Apply global relevance ranking search
    visibleCards = searchArticles(debouncedQuery, sourceFiltered)
  } else {
    // Standard feed view
    const filtered = cards.filter(({ article }) => {
      if (filter === 'for-you') return isPinnedForUser(article, prefs)
      if (filter === 'all') return true
      return article.source?.name === filter
    })

    visibleCards = filter === 'for-you'
      ? rankArticles(filtered.map(({ article }) => article), prefs)
          .map(article => filtered.find(card => card.article === article))
          .filter(Boolean)
      : filtered
  }

  // Paginated card subset for progressive loading
  const pagedCards = visibleCards.slice(0, visibleCount)

  return (
    <div ref={viewRef}>
      <FilterBar active={filter} onChange={setFilter} sources={sourceTabs} />

      <div className="section-header">
        <div className="section-header-left">
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

        <div className="section-search-container">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search space news, missions, discoveries..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              aria-label="Search space news, missions, discoveries"
            />
            {searchInput && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="section-header-right">
          <span className={`article-count${loading ? ' article-count-loading' : ''}`}>
            {loading ? '' : (
              debouncedQuery
                ? `${visibleCards.length} ${visibleCards.length === 1 ? 'transmission' : 'transmissions'} found`
                : visibleCards.length > PAGE_SIZE
                  ? `Showing ${pagedCards.length} of ${visibleCards.length} articles`
                  : `${visibleCards.length} articles`
            )}
          </span>
        </div>
      </div>

      {debouncedQuery && (
        <div className="search-active-pill">
          <span>
            Search results for "<strong>{debouncedQuery}</strong>" ({visibleCards.length} found)
          </span>
          <button type="button" onClick={handleClearSearch} className="pill-clear-btn">
            Clear search
          </button>
        </div>
      )}

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

        {pagedCards.map(({ article, summaries }, i) => (
          <NewsCard
            key={article.id || article.title + i}
            article={article}
            summaries={summaries}
            index={i}
            prefs={prefs}
            onExpand={openModal}
          />
        ))}

        {/* Empty state when search produces 0 results */}
        {!loading && debouncedQuery && visibleCards.length === 0 && (
          <div className="empty-state-container">
            <div className="empty-state-icon">📡</div>
            <h2 className="empty-state-title">No transmissions found</h2>
            <p className="empty-state-text">
              Try different keywords or check your spelling.
            </p>
            <button
              type="button"
              className="empty-state-action-btn"
              onClick={handleClearSearch}
            >
              Clear search
            </button>
          </div>
        )}

        {/* Empty state when filter produces 0 results without search */}
        {!loading && !debouncedQuery && visibleCards.length === 0 && (
          <div className="empty-state-container">
            <div className="empty-state-icon">📡</div>
            <h2 className="empty-state-title">No transmissions found</h2>
            <p className="empty-state-text">
              No articles match this source filter in recent transmissions.
            </p>
            <button
              type="button"
              className="empty-state-action-btn"
              onClick={() => setFilter('all')}
            >
              Show all sources
            </button>
          </div>
        )}

        {/* Load More Pagination Control */}
        {!loading && visibleCards.length > visibleCount && (
          <div className="load-more-container">
            <button
              type="button"
              className="load-more-btn"
              onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
            >
              <span>Load More Transmissions</span>
              <span className="load-more-count">
                ({visibleCards.length - visibleCount} remaining)
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
