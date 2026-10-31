import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, copyFileSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import crypto from 'node:crypto'

const CACHE_PATH = resolve(process.cwd(), 'data/summary-cache.json')

export function computeContentHash(title, desc) {
  const content = `${String(title || '').trim()}::${String(desc || '').trim()}`
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16)
}

export function loadSummaryCache(filePath = CACHE_PATH) {
  if (!existsSync(filePath)) {
    return {
      version: 1,
      lastUpdated: null,
      articles: {}
    }
  }

  try {
    const raw = readFileSync(filePath, 'utf8').trim()
    if (!raw) return { version: 1, lastUpdated: null, articles: {} }
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || typeof parsed.articles !== 'object') {
      return { version: 1, lastUpdated: null, articles: {} }
    }
    return parsed
  } catch (err) {
    console.warn(`[SummaryCache] Warning: Corrupt cache file at ${filePath}. Initializing fresh cache:`, err.message)
    return { version: 1, lastUpdated: null, articles: {} }
  }
}

export function saveSummaryCacheAtomic(filePath = CACHE_PATH, cacheData) {
  mkdirSync(dirname(filePath), { recursive: true })
  const payload = {
    version: 1,
    lastUpdated: new Date().toISOString(),
    articles: cacheData.articles || {}
  }
  const tmpPath = `${filePath}.tmp.${Date.now()}`
  writeFileSync(tmpPath, JSON.stringify(payload, null, 2) + '\n', 'utf8')

  try {
    renameSync(tmpPath, filePath)
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EBUSY') {
      copyFileSync(tmpPath, filePath)
      try { unlinkSync(tmpPath) } catch {}
    } else {
      throw err
    }
  }
}

export class SummaryCache {
  constructor(filePath = CACHE_PATH) {
    this.filePath = filePath
    this.data = loadSummaryCache(filePath)
  }

  get(articleId, canonicalUrl) {
    if (articleId && this.data.articles[articleId]) {
      return this.data.articles[articleId]
    }
    if (canonicalUrl) {
      const match = Object.values(this.data.articles).find(a => a.canonicalUrl === canonicalUrl)
      if (match) return match
    }
    return null
  }

  set(articleId, canonicalUrl, summary, model, contentHash, status = 'completed') {
    const key = articleId || canonicalUrl
    if (!key) return null

    const record = {
      articleId: articleId || key,
      canonicalUrl: canonicalUrl || '',
      summary,
      model: model || 'gemini-2.0-flash',
      createdAt: new Date().toISOString(),
      contentHash: contentHash || '',
      status
    }

    this.data.articles[key] = record
    if (canonicalUrl && key !== canonicalUrl) {
      // Also index by canonical URL for O(1) resolution
      this.data.articles[canonicalUrl] = record
    }

    saveSummaryCacheAtomic(this.filePath, this.data)
    return record
  }

  has(articleId, canonicalUrl) {
    return Boolean(this.get(articleId, canonicalUrl))
  }

  getAll() {
    return this.data.articles
  }
}
