import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, copyFileSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import crypto from 'node:crypto'
import { getRedisClient, isRedisConfigured } from './redisClient.js'

const CACHE_PATH = resolve(process.cwd(), 'data/summary-cache.json')
const REDIS_TTL_SECONDS = 180 * 24 * 60 * 60 // 180 days

export function computeContentHash(title, desc) {
  const content = `${String(title || '').trim()}::${String(desc || '').trim()}`
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16)
}

export function computeUrlHash(url) {
  return crypto.createHash('sha256').update(String(url || '').trim()).digest('hex').slice(0, 16)
}

/* ── Local File Cache Fallback (for local dev & offline test suite) ── */
export function loadSummaryCache(filePath = CACHE_PATH) {
  if (!existsSync(filePath)) {
    return { version: 1, lastUpdated: null, articles: {} }
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
  try {
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
  } catch (err) {
    // Read-only filesystem in serverless environments
    console.warn('[SummaryCache] Could not write local cache file:', err.message)
  }
}

export class SummaryCache {
  constructor(filePath = CACHE_PATH) {
    this.filePath = filePath
    this.localData = loadSummaryCache(filePath)
  }

  async get(articleId, canonicalUrl) {
    const redis = getRedisClient()

    if (redis) {
      try {
        if (articleId) {
          const raw = await redis.get(`cosmos:summary:${articleId}`)
          if (raw) {
            return typeof raw === 'string' ? JSON.parse(raw) : raw
          }
        }
        if (canonicalUrl) {
          const urlHash = computeUrlHash(canonicalUrl)
          const raw = await redis.get(`cosmos:summary:url:${urlHash}`)
          if (raw) {
            return typeof raw === 'string' ? JSON.parse(raw) : raw
          }
        }
      } catch (err) {
        console.warn('[SummaryCache] Redis get error:', err.message)
        // If Redis error in production, do not fall back to local disk if in serverless
        if (process.env.VERCEL) {
          throw new Error(`Upstash Redis storage error: ${err.message}`)
        }
      }
    }

    // Local in-memory / file fallback
    if (articleId && this.localData.articles[articleId]) {
      return this.localData.articles[articleId]
    }
    if (canonicalUrl) {
      const match = Object.values(this.localData.articles).find(a => a.canonicalUrl === canonicalUrl)
      if (match) return match
    }
    return null
  }

  async set(articleId, canonicalUrl, summary, model, contentHash, status = 'completed') {
    const key = articleId || canonicalUrl
    if (!key) return null

    const record = {
      articleId: articleId || key,
      canonicalUrl: canonicalUrl || '',
      summary,
      model: model || process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
      createdAt: new Date().toISOString(),
      contentHash: contentHash || '',
      status
    }

    const redis = getRedisClient()

    if (redis) {
      try {
        const payloadStr = JSON.stringify(record)
        const pipeline = redis.pipeline()

        if (articleId) {
          pipeline.set(`cosmos:summary:${articleId}`, payloadStr, { ex: REDIS_TTL_SECONDS })
        }
        if (canonicalUrl) {
          const urlHash = computeUrlHash(canonicalUrl)
          pipeline.set(`cosmos:summary:url:${urlHash}`, payloadStr, { ex: REDIS_TTL_SECONDS })
        }

        await pipeline.exec()
      } catch (err) {
        console.warn('[SummaryCache] Redis set error:', err.message)
        if (process.env.VERCEL) {
          throw new Error(`Upstash Redis storage error on write: ${err.message}`)
        }
      }
    }

    // Always update local cache copy for fast lookup and local dev
    this.localData.articles[key] = record
    if (canonicalUrl && key !== canonicalUrl) {
      this.localData.articles[canonicalUrl] = record
    }

    saveSummaryCacheAtomic(this.filePath, this.localData)
    return record
  }

  async has(articleId, canonicalUrl) {
    const record = await this.get(articleId, canonicalUrl)
    return Boolean(record)
  }

  getAllLocal() {
    return this.localData.articles
  }
}
