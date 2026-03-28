import React, { useEffect, useState } from 'react'
import FilterBar from '../components/FilterBar'
import NewsCard from '../components/NewsCard'
import { fetchAllFeeds, SAMPLE_ARTICLES } from '../utils/rss'
import { rankArticles } from '../utils/personalization'
import { getMultiSummary } from '../utils/ai'

export default function FeedView({ prefs, setArticles, setStatusText, openModal }) {
  const [cards, setCards] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeed()
  }, [prefs])

  async function loadFeed() {
    setLoading(true)
    setStatusText('Fetching live feeds...')

    let raw = await fetchAllFeeds()
    if (!raw.length) raw = SAMPLE_ARTICLES

    const ranked = rankArticles(raw, prefs)
    setArticles(ranked)
    setStatusText(`${ranked.length} articles — generating AI summaries...`)

    const grid = []
    for (let i = 0; i < Math.min(ranked.length, 12); i++) {
      const article = ranked[i]
      const summaries = await getMultiSummary(article.title, article.desc)
      grid.push({ article, summaries })
      setCards([...grid])
    }

    setStatusText(`Live · ${grid.length} articles`)
    setLoading(false)
  }

  const filtered = cards.filter(({ article }) => {
    if (filter === 'all') return true
    return article.source.name === filter || article.source.key === filter.toLowerCase()
  })

  return (
    <div>
      <FilterBar active={filter} onChange={setFilter} />
      <div className="section-header">
        <span className="section-title">Latest transmissions</span>
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