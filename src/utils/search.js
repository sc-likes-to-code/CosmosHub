// ── search.js ─────────────────────────────────────────
// Global Space Intelligence Search across Live feeds and Historical Archives

import { RSS_SOURCES, generateArticleId, toTimestampIST } from './rss.js'

let cachedHistoricalPool = null
let historicalLoadPromise = null

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Universal JSON loader compatible with both Vite bundler and Node test runner.
 */
async function loadJsonResource(type) {
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      const fsMod = 'node:fs'
      const urlMod = 'node:url'
      const { readFileSync } = await import(/* @vite-ignore */ fsMod)
      const { fileURLToPath } = await import(/* @vite-ignore */ urlMod)
      const relPath = type === 'latest'
        ? '../../data/latest-news.json'
        : '../../data/news-index.json'
      const filePath = fileURLToPath(new URL(relPath, import.meta.url))
      return JSON.parse(readFileSync(filePath, 'utf8'))
    } catch (e) {
      // Fall through to standard dynamic import
    }
  }

  if (type === 'latest') {
    const mod = await import('../../data/latest-news.json')
    return mod.default || mod
  } else {
    const mod = await import('../../data/news-index.json')
    return mod.default || mod
  }
}

/**
 * Loads and caches historical articles from both the latest snapshot and the persistent news index.
 * Returns a deduplicated array of unified article objects.
 */
export async function loadHistoricalArticles() {
  if (cachedHistoricalPool) return cachedHistoricalPool
  if (historicalLoadPromise) return historicalLoadPromise

  historicalLoadPromise = (async () => {
    const articleMap = new Map()

    // 1. Ingest latest snapshot if available (full descriptions and categories)
    try {
      const latestData = await loadJsonResource('latest')
      if (latestData && Array.isArray(latestData.articles)) {
        for (const a of latestData.articles) {
          const id = a.id || generateArticleId(a)
          articleMap.set(id, {
            ...a,
            id,
            link: a.link || a.canonicalUrl || '#',
            isArchived: false,
          })
        }
      }
    } catch (err) {
      console.warn('Could not load latest-news.json for search pool:', err.message)
    }

    // 2. Ingest persistent archive index (485+ historical transmissions)
    try {
      const indexData = await loadJsonResource('index')
      const historical = indexData?.articles || {}

      for (const [id, item] of Object.entries(historical)) {
        if (articleMap.has(id)) continue // Keep snapshot version if already present

        // Resolve source mapping to full source branding
        const matchedSource = RSS_SOURCES.find(
          s => s.name?.toLowerCase() === item.source?.toLowerCase() || s.key === item.sourceKey
        ) || {
          name: item.source || 'Space Intelligence Archive',
          key: item.sourceKey || 'archive',
          badgeClass: 'badge-spacedotcom',
          cardClass: 'spacedotcom',
          tags: [item.source, item.category].filter(Boolean),
        }

        articleMap.set(id, {
          id,
          title: item.title,
          link: item.canonicalUrl || item.link || '#',
          desc: `Archived space transmission from ${item.archivedDate || 'CosmosHub Historical Archives'}.`,
          pubDate: item.pubDate || item.archivedAt,
          category: item.category || 'Missions & Exploration',
          source: matchedSource,
          isArchived: true,
          archivedDate: item.archivedDate,
        })
      }
    } catch (err) {
      console.warn('Could not load news-index.json for search pool:', err.message)
    }

    cachedHistoricalPool = Array.from(articleMap.values())
    return cachedHistoricalPool
  })()

  return historicalLoadPromise
}

/**
 * Executes a multi-token, relevance-ranked search across an article pool.
 *
 * Ranking criteria:
 * 1. Exact title match
 * 2. Title keyword match (bonus for complete word boundary matches)
 * 3. Source & Category keyword match
 * 4. Description & Summary keyword match
 * + Recency tie-breaker
 *
 * @param {string} rawQuery Search input
 * @param {Array} pool Array of article items (or `{ article, summaries }` objects)
 * @returns {Array} Filtered and relevance-ordered results
 */
export function searchArticles(rawQuery, pool = []) {
  if (!rawQuery || typeof rawQuery !== 'string') return []
  const query = rawQuery.trim().toLowerCase()
  if (!query) return []

  // Tokenize by whitespace
  const tokens = query.split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []

  const matches = []

  for (const item of pool) {
    const article = item.article || item
    const summaries = item.summaries || {}

    const title = (article.title || '').toLowerCase()
    const desc = (article.desc || '').toLowerCase()
    const shortSum = (summaries.shortSummary || '').toLowerCase()
    const detailSum = (summaries.detailedSummary || '').toLowerCase()
    const sourceName = (article.source?.name || '').toLowerCase()
    const category = (article.category || '').toLowerCase()
    const tags = Array.isArray(article.source?.tags)
      ? article.source.tags.join(' ').toLowerCase()
      : ''

    const searchableBlob = `${title} ${desc} ${shortSum} ${detailSum} ${sourceName} ${category} ${tags}`

    // All tokens must be present in at least one searchable field (AND operation)
    const matchesAll = tokens.every(token => searchableBlob.includes(token))
    if (!matchesAll) continue

    // Compute relevance score
    let score = 0

    // 1. Exact title match
    if (title === query) {
      score += 1200
    } else if (title.startsWith(query)) {
      score += 600
    } else if (title.includes(query)) {
      score += 350
    }

    // 2. Title keyword matches
    for (const token of tokens) {
      if (title.includes(token)) {
        score += 120
        const boundaryRegex = new RegExp(`\\b${escapeRegex(token)}\\b`, 'i')
        if (boundaryRegex.test(article.title)) {
          score += 40
        }
      }
    }

    // 3. Source & Category matches
    for (const token of tokens) {
      if (sourceName.includes(token)) score += 50
      if (category.includes(token)) score += 40
      if (tags.includes(token)) score += 30
    }

    // 4. Description & Summary matches
    for (const token of tokens) {
      if (desc.includes(token)) score += 20
      if (shortSum.includes(token) || detailSum.includes(token)) score += 15
    }

    // Recency bonus: slightly favor newer articles when scores tie
    const ts = toTimestampIST(article.pubDate)
    if (ts > 0) {
      score += (ts / 1e13)
    }

    matches.push({ item, score, article })
  }

  // Sort descending by relevance score
  matches.sort((a, b) => b.score - a.score)
  return matches.map(m => m.item)
}
