import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, copyFileSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { getRedisClient, isRedisConfigured } from './redisClient.js'

const USAGE_PATH = resolve(process.cwd(), 'data/ai-usage.json')

export function getTodayISTDate() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  return formatter.format(new Date()) // YYYY-MM-DD
}

/* ── Local File Quota Fallback (for local dev & offline test suite) ── */
export function loadUsageData(filePath = USAGE_PATH) {
  const today = getTodayISTDate()
  const defaultData = {
    version: 1,
    date: today,
    dailyLimit: parseInt(process.env.AI_DAILY_SUMMARY_LIMIT || process.env.DAILY_AI_BUDGET, 10) || 15,
    usedCount: 0,
    requests: []
  }

  if (!existsSync(filePath)) {
    return defaultData
  }

  try {
    const raw = readFileSync(filePath, 'utf8').trim()
    if (!raw) return defaultData
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return defaultData

    if (parsed.date !== today) {
      return {
        version: 1,
        date: today,
        dailyLimit: parseInt(process.env.AI_DAILY_SUMMARY_LIMIT || process.env.DAILY_AI_BUDGET, 10) || 15,
        usedCount: 0,
        requests: []
      }
    }

    return parsed
  } catch (err) {
    console.warn(`[QuotaManager] Warning: Corrupt usage file at ${filePath}:`, err.message)
    return defaultData
  }
}

export function saveUsageDataAtomic(filePath = USAGE_PATH, usageData) {
  try {
    mkdirSync(dirname(filePath), { recursive: true })
    const tmpPath = `${filePath}.tmp.${Date.now()}`
    writeFileSync(tmpPath, JSON.stringify(usageData, null, 2) + '\n', 'utf8')

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
    console.warn('[QuotaManager] Could not write local usage file:', err.message)
  }
}

export class QuotaManager {
  constructor(filePath = USAGE_PATH) {
    this.filePath = filePath
    this.localData = loadUsageData(filePath)
    this.inFlightRequests = new Map()
    this.localRateLimitMap = new Map()
  }

  get dailyLimit() {
    return parseInt(process.env.AI_DAILY_SUMMARY_LIMIT || process.env.DAILY_AI_BUDGET, 10) || this.localData.dailyLimit || 15
  }

  get isEnabled() {
    return process.env.AI_SUMMARIZATION_ENABLED !== 'false'
  }

  refreshDayLocal() {
    const today = getTodayISTDate()
    if (this.localData.date !== today) {
      this.localData.date = today
      this.localData.usedCount = 0
      this.localData.requests = []
      this.localData.dailyLimit = this.dailyLimit
      saveUsageDataAtomic(this.filePath, this.localData)
    }
  }

  async getStatus() {
    const today = getTodayISTDate()
    const limit = this.dailyLimit
    const redis = getRedisClient()

    if (redis) {
      try {
        const rawUsed = await redis.get(`cosmos:quota:${today}`)
        const used = rawUsed ? parseInt(rawUsed, 10) || 0 : 0
        return {
          enabled: this.isEnabled,
          configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
          storageProvider: 'upstash-redis',
          storageConfigured: true,
          date: today,
          dailyLimit: limit,
          usedToday: used,
          remainingToday: Math.max(0, limit - used)
        }
      } catch (err) {
        console.warn('[QuotaManager] Redis status error:', err.message)
        if (process.env.VERCEL) {
          return {
            enabled: false,
            configured: false,
            storageProvider: 'upstash-redis',
            storageConfigured: false,
            error: `Upstash Redis unavailable: ${err.message}`,
            date: today,
            dailyLimit: limit,
            usedToday: 0,
            remainingToday: 0
          }
        }
      }
    }

    // Local fallback status
    this.refreshDayLocal()
    const used = this.localData.usedCount || 0
    return {
      enabled: this.isEnabled,
      configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
      storageProvider: 'local-file',
      storageConfigured: isRedisConfigured(),
      date: this.localData.date,
      dailyLimit: limit,
      usedToday: used,
      remainingToday: Math.max(0, limit - used)
    }
  }

  /**
   * Atomically reserves a generation slot before calling Gemini.
   * Prevents concurrency race conditions from exceeding the 15/day quota.
   */
  async reserveQuota() {
    if (!this.isEnabled) {
      return { allowed: false, reason: 'AI_SUMMARIZATION_DISABLED', remainingToday: 0 }
    }

    const today = getTodayISTDate()
    const limit = this.dailyLimit
    const redis = getRedisClient()

    if (redis) {
      const quotaKey = `cosmos:quota:${today}`
      try {
        const currentCount = await redis.incr(quotaKey)
        if (currentCount === 1) {
          // Key newly created, expire after 48 hours (covers timezone discrepancies)
          await redis.expire(quotaKey, 48 * 60 * 60)
        }

        if (currentCount > limit) {
          // Over quota! Atomically release slot
          await redis.decr(quotaKey)
          return { allowed: false, reason: 'DAILY_BUDGET_EXCEEDED', remainingToday: 0, usedToday: limit }
        }

        return {
          allowed: true,
          remainingToday: limit - currentCount,
          usedToday: currentCount,
          isRedis: true
        }
      } catch (err) {
        console.warn('[QuotaManager] Redis atomic quota reservation error:', err.message)
        if (process.env.VERCEL) {
          throw new Error(`Upstash Redis storage error: ${err.message}`)
        }
      }
    }

    // Serverless safety rule: In production on Vercel, do NOT silently fall back to ephemeral memory
    if (process.env.VERCEL) {
      return {
        allowed: false,
        reason: 'STORAGE_UNAVAILABLE',
        error: 'Upstash Redis storage is not configured or unavailable in production.'
      }
    }

    // Local dev fallback
    this.refreshDayLocal()
    if ((this.localData.usedCount || 0) >= limit) {
      return { allowed: false, reason: 'DAILY_BUDGET_EXCEEDED', remainingToday: 0, usedToday: limit }
    }

    this.localData.usedCount = (this.localData.usedCount || 0) + 1
    saveUsageDataAtomic(this.filePath, this.localData)

    return {
      allowed: true,
      remainingToday: limit - this.localData.usedCount,
      usedToday: this.localData.usedCount,
      isRedis: false
    }
  }

  /**
   * Releases a previously reserved quota slot if generation fails or times out.
   */
  async releaseQuota() {
    const today = getTodayISTDate()
    const redis = getRedisClient()

    if (redis) {
      const quotaKey = `cosmos:quota:${today}`
      try {
        await redis.decr(quotaKey)
        return
      } catch (err) {
        console.warn('[QuotaManager] Redis release quota error:', err.message)
      }
    }

    if (!process.env.VERCEL) {
      this.refreshDayLocal()
      if (this.localData.usedCount > 0) {
        this.localData.usedCount -= 1
        saveUsageDataAtomic(this.filePath, this.localData)
      }
    }
  }

  /**
   * Logs summary generation metadata upon successful completion.
   */
  async recordSuccessfulUsage(articleId, model) {
    const today = getTodayISTDate()
    const redis = getRedisClient()

    if (redis) {
      try {
        const logEntry = JSON.stringify({
          articleId,
          model,
          timestamp: new Date().toISOString()
        })
        const logKey = `cosmos:quota_log:${today}`
        await redis.lpush(logKey, logEntry)
        await redis.ltrim(logKey, 0, 49) // Retain last 50 logs
        await redis.expire(logKey, 48 * 60 * 60)
      } catch (err) {
        console.warn('[QuotaManager] Redis log usage error:', err.message)
      }
    }

    if (!process.env.VERCEL) {
      this.localData.requests.push({
        articleId,
        model,
        status: 'success',
        timestamp: new Date().toISOString()
      })
      if (this.localData.requests.length > 50) {
        this.localData.requests = this.localData.requests.slice(-50)
      }
      saveUsageDataAtomic(this.filePath, this.localData)
    }
  }

  /**
   * Distributed rate limit check: max 10 requests per minute per IP.
   */
  async checkRateLimit(ip) {
    if (!ip) return true
    const redis = getRedisClient()

    if (redis) {
      try {
        const minuteEpoch = Math.floor(Date.now() / 60000)
        const safeIp = String(ip).replace(/[^a-zA-Z0-9:._-]/g, '')
        const rateKey = `cosmos:ratelimit:${safeIp}:${minuteEpoch}`
        const count = await redis.incr(rateKey)

        if (count === 1) {
          await redis.expire(rateKey, 70) // 70-second TTL
        }

        return count <= 10
      } catch (err) {
        console.warn('[QuotaManager] Redis rate limit error:', err.message)
        // If Redis has temporary error, don't crash request
      }
    }

    // Local in-memory rate limiting fallback
    const now = Date.now()
    const windowMs = 60 * 1000
    const maxRequests = 10

    let timestamps = this.localRateLimitMap.get(ip) || []
    timestamps = timestamps.filter(t => now - t < windowMs)

    if (timestamps.length >= maxRequests) {
      this.localRateLimitMap.set(ip, timestamps)
      return false
    }

    timestamps.push(now)
    this.localRateLimitMap.set(ip, timestamps)
    return true
  }

  scoreImportance(article = {}) {
    let score = 0
    const text = `${article.title || ''} ${article.desc || ''}`.toLowerCase()

    if (/\b(james webb|jwst|hubble|exoplanet|gravitational wave|supernova|black hole|dark matter|pulsar|neutron star)\b/i.test(text)) {
      score += 3
    }
    if (/\b(discovery|breakthrough|reveals|first time|detected|found evidence|confirms|observation)\b/i.test(text)) {
      score += 2
    }
    if (/\b(artemis|mars|chandrayaan|moon|sample return|perseverance|europa clipper|voyager|gaganyaan)\b/i.test(text)) {
      score += 2
    }
    const sourceName = (article.source?.name || article.source || '').toLowerCase()
    if (sourceName.includes('nasa') || sourceName.includes('esa') || sourceName.includes('isro') || sourceName.includes('webb')) {
      score += 1
    }
    const cat = article.category || ''
    if (cat === 'Astronomy & Astrophysics' || cat === 'Research & Science' || cat === 'Missions & Exploration') {
      score += 1
    }

    return score
  }

  isEligibleForAutoSummary(article) {
    return this.scoreImportance(article) >= 3
  }
}
