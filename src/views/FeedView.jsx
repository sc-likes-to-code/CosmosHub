import React, { useEffect, useState, useRef } from 'react'
import FilterBar from '../components/FilterBar'
import NewsCard from '../components/NewsCard'
import { fetchAllFeeds, SAMPLE_ARTICLES } from '../utils/rss'
import { rankArticles } from '../utils/personalization'
import { getMultiSummary } from '../utils/ai'

const POLL_INTERVAL = 5 * 60 * 1000 // 5 minutes

export default function FeedView({ prefs, setArticles, setStatusText, openModal }) {
  const [cards, setCards] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const pollTimeoutRef = useRef(null)

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
      for (let i = 0; i < Math.min(ranked.length, 12); i++) {
        const article = ranked[i]
        const summaries = await getMultiSummary(article.title, article.desc)
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

  const filtered = cards.filter(({ article }) => {
    if (filter === 'all') return true
    return article.source.name === filter || article.source.key === filter.toLowerCase()
  })

  return (
    <div>
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