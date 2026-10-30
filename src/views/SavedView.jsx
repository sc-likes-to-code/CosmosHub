import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FilterBar from '../components/FilterBar'
import NewsCard from '../components/NewsCard'
import { useSavedArticles } from '../utils/bookmarks'
import { searchArticles } from '../utils/search'
import { gsap } from 'gsap'

export default function SavedView({ prefs = [], openModal }) {
  const navigate = useNavigate()
  const { savedArticles } = useSavedArticles()
  const [filter, setFilter] = useState('all')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const viewRef = useRef(null)

  // 250ms debounce for search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim())
    }, 250)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Extract distinct sources from saved articles
  const sourceTabs = Array.from(
    new Set(savedArticles.map(a => a.source?.name).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b))

  // Reset filter if active filter no longer exists in saved sources
  useEffect(() => {
    if (filter !== 'all' && !sourceTabs.includes(filter)) {
      setFilter('all')
    }
  }, [filter, sourceTabs])

  // Filter and search
  let processed = savedArticles

  // 1. Source filter
  if (filter !== 'all') {
    processed = processed.filter(a => a.source?.name === filter)
  }

  // 2. Search query filter & relevance ranking
  if (debouncedQuery) {
    processed = searchArticles(debouncedQuery, processed)
  }

  // Subtle GSAP entrance animation on load or filter change
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const cardsEls = gsap.utils.toArray('.cosmos-grid .news-card')
      if (!cardsEls.length) return
      gsap.fromTo(
        cardsEls.slice(0, 8),
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', stagger: 0.05 }
      )
    }, viewRef)
    return () => ctx.revert()
  }, [filter, debouncedQuery, processed.length])

  function handleClearSearch() {
    setSearchInput('')
    setDebouncedQuery('')
  }

  return (
    <div ref={viewRef} className="saved-view">
      {savedArticles.length > 0 && (
        <FilterBar active={filter} onChange={setFilter} sources={sourceTabs} />
      )}

      <div className="section-header">
        <div className="section-header-left">
          <span className="section-title">Saved transmissions</span>
        </div>

        {savedArticles.length > 0 && (
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
                placeholder="Search saved articles..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                aria-label="Search saved articles"
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
        )}

        <div className="section-header-right">
          <span className="article-count">
            {savedArticles.length === 0
              ? '0 saved'
              : `${processed.length} of ${savedArticles.length} saved`}
          </span>
        </div>
      </div>

      {debouncedQuery && (
        <div className="search-active-pill">
          <span>
            Search results for "<strong>{debouncedQuery}</strong>" ({processed.length} found)
          </span>
          <button type="button" onClick={handleClearSearch} className="pill-clear-btn">
            Clear search
          </button>
        </div>
      )}

      {/* Empty State: No bookmarks at all */}
      {savedArticles.length === 0 && (
        <div className="empty-state-container">
          <div className="empty-state-icon">🔖</div>
          <h2 className="empty-state-title">Your reading list is empty</h2>
          <p className="empty-state-text">
            Save interesting space discoveries and mission updates to read them later.
          </p>
          <button
            type="button"
            className="empty-state-action-btn"
            onClick={() => navigate('/')}
          >
            Explore Live Feed →
          </button>
        </div>
      )}

      {/* Empty State: Filter/search yielded 0 matches */}
      {savedArticles.length > 0 && processed.length === 0 && (
        <div className="empty-state-container">
          <div className="empty-state-icon">📡</div>
          <h2 className="empty-state-title">No transmissions found</h2>
          <p className="empty-state-text">
            Try different keywords or clear your active search filter.
          </p>
          <button
            type="button"
            className="empty-state-action-btn"
            onClick={() => {
              handleClearSearch()
              setFilter('all')
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Saved Articles Grid */}
      {processed.length > 0 && (
        <div className="cosmos-grid">
          {processed.map((article, i) => (
            <NewsCard
              key={article.id || article.link + i}
              article={article}
              summaries={article.summaries}
              index={i}
              prefs={prefs}
              onExpand={openModal}
            />
          ))}
        </div>
      )}
    </div>
  )
}
