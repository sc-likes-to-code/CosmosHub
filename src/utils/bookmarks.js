// ── bookmarks.js ──────────────────────────────────────
// Persistent save & bookmark management for CosmosHub space intelligence

import { useState, useEffect, useCallback } from 'react'
import { generateArticleId } from './rss.js'
import { showToast } from './alerts.js'

export const BOOKMARKS_STORAGE_KEY = 'cosmoshub_saved_articles'
export const BOOKMARKS_CHANGED_EVENT = 'cosmos-bookmarks-changed'

/**
 * Safely retrieves all saved articles from localStorage.
 * Always returns an array and handles corrupted storage gracefully.
 */
export function getSavedArticles() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    
    // Validate each article entry has at least an ID and title
    return parsed.filter(item => item && typeof item === 'object' && item.id && item.title)
  } catch (err) {
    console.error('Failed to parse saved articles from localStorage:', err)
    return []
  }
}

/**
 * Resolves a stable article identifier from either an ID string or an article object.
 */
export function resolveArticleId(articleOrId) {
  if (!articleOrId) return ''
  if (typeof articleOrId === 'string') return articleOrId
  if (articleOrId.id) return String(articleOrId.id)
  return generateArticleId(articleOrId)
}

/**
 * Checks whether an article is currently bookmarked.
 */
export function isArticleSaved(articleOrId) {
  const targetId = resolveArticleId(articleOrId)
  if (!targetId) return false
  const list = getSavedArticles()
  return list.some(item => item.id === targetId)
}

/**
 * Normalizes an article with sufficient metadata to be rendered standalone/offline.
 */
export function normalizeSavedArticle(article, summaries = null) {
  const id = resolveArticleId(article)
  const canonicalLink = article.link || article.canonicalUrl || '#'
  
  // Ensure source object has all required styling classes
  const rawSource = article.source || {}
  const sourceName = typeof rawSource === 'string' ? rawSource : (rawSource.name || 'Space Intelligence')
  const sourceKey = rawSource.key || 'spacedotcom'
  const badgeClass = rawSource.badgeClass || 'badge-spacedotcom'
  const cardClass = rawSource.cardClass || 'spacedotcom'
  const tags = Array.isArray(rawSource.tags) && rawSource.tags.length > 0
    ? rawSource.tags
    : [sourceName, article.category || 'Space'].filter(Boolean)

  const finalSource = {
    name: sourceName,
    key: sourceKey,
    badgeClass,
    cardClass,
    tags,
  }

  const finalSummaries = summaries || (article.summaries ? article.summaries : {
    shortSummary: article.desc ? article.desc.slice(0, 180) : '',
    detailedSummary: article.desc || '',
    eli12Summary: article.desc ? article.desc.slice(0, 180) : '',
  })

  return {
    id,
    title: String(article.title || 'Untitled Transmission').trim(),
    link: canonicalLink,
    desc: String(article.desc || finalSummaries.shortSummary || '').trim(),
    pubDate: article.pubDate || new Date().toISOString(),
    category: article.category || 'Missions & Exploration',
    source: finalSource,
    summaries: finalSummaries,
    savedAt: article.savedAt || new Date().toISOString(),
  }
}

/**
 * Saves an article to localStorage.
 */
export function saveArticle(article, summaries = null) {
  if (typeof window === 'undefined' || !article) return null
  const normalized = normalizeSavedArticle(article, summaries)
  const list = getSavedArticles()

  // Prevent duplicate entries
  const existingIdx = list.findIndex(item => item.id === normalized.id)
  let updatedList
  if (existingIdx !== -1) {
    updatedList = [...list]
    updatedList[existingIdx] = { ...list[existingIdx], ...normalized }
  } else {
    updatedList = [normalized, ...list]
  }

  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updatedList))
  } catch (err) {
    console.error('Failed to write bookmark to localStorage:', err)
    return null
  }

  notifyBookmarksChanged(updatedList)
  showToast('🔖', 'Article saved')
  return normalized
}

/**
 * Removes an article from localStorage.
 */
export function removeSavedArticle(articleOrId) {
  if (typeof window === 'undefined' || !articleOrId) return false
  const targetId = resolveArticleId(articleOrId)
  if (!targetId) return false

  const list = getSavedArticles()
  const filtered = list.filter(item => item.id !== targetId)

  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(filtered))
  } catch (err) {
    console.error('Failed to update bookmarks in localStorage:', err)
    return false
  }

  notifyBookmarksChanged(filtered)
  showToast('🔖', 'Article removed from saved articles')
  return true
}

/**
 * Toggles the saved status of an article.
 */
export function toggleSaveArticle(article, summaries = null) {
  if (isArticleSaved(article)) {
    removeSavedArticle(article)
    return false
  } else {
    saveArticle(article, summaries)
    return true
  }
}

/**
 * Broadcasts bookmark updates to all active listeners and components.
 */
function notifyBookmarksChanged(articles) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(BOOKMARKS_CHANGED_EVENT, {
        detail: { articles, count: articles.length }
      })
    )
  }
}

/**
 * React hook to access saved articles in real-time.
 */
export function useSavedArticles() {
  const [savedArticles, setSavedArticles] = useState(getSavedArticles)

  useEffect(() => {
    function handleUpdate(e) {
      if (e?.detail?.articles) {
        setSavedArticles(e.detail.articles)
      } else {
        setSavedArticles(getSavedArticles())
      }
    }

    function handleStorage(e) {
      if (e.key === BOOKMARKS_STORAGE_KEY) {
        setSavedArticles(getSavedArticles())
      }
    }

    window.addEventListener(BOOKMARKS_CHANGED_EVENT, handleUpdate)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener(BOOKMARKS_CHANGED_EVENT, handleUpdate)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const isSaved = useCallback(
    (articleOrId) => {
      const id = resolveArticleId(articleOrId)
      return savedArticles.some(item => item.id === id)
    },
    [savedArticles]
  )

  const toggleSave = useCallback(
    (article, summaries = null) => {
      return toggleSaveArticle(article, summaries)
    },
    []
  )

  const removeSave = useCallback(
    (articleOrId) => {
      return removeSavedArticle(articleOrId)
    },
    []
  )

  return {
    savedArticles,
    savedCount: savedArticles.length,
    isSaved,
    toggleSave,
    removeSave,
  }
}
