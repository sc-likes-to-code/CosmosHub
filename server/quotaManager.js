import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, copyFileSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

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

export function loadUsageData(filePath = USAGE_PATH) {
  const today = getTodayISTDate()
  const defaultData = {
    version: 1,
    date: today,
    dailyLimit: 15,
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

    // Rollover check: If date stored is from a previous calendar day, reset for today
    if (parsed.date !== today) {
      return {
        version: 1,
        date: today,
        dailyLimit: parseInt(process.env.AI_DAILY_SUMMARY_LIMIT, 10) || 15,
        usedCount: 0,
        requests: []
      }
    }

    return parsed
  } catch (err) {
    console.warn(`[QuotaManager] Warning: Corrupt usage file at ${filePath}. Initializing fresh usage tracker:`, err.message)
    return defaultData
  }
}

export function saveUsageDataAtomic(filePath = USAGE_PATH, usageData) {
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
}

export class QuotaManager {
  constructor(filePath = USAGE_PATH) {
    this.filePath = filePath
    this.data = loadUsageData(filePath)
    this.inFlightRequests = new Map()
    this.rateLimitMap = new Map() // ip -> [timestamps]
  }

  get dailyLimit() {
    return parseInt(process.env.AI_DAILY_SUMMARY_LIMIT, 10) || this.data.dailyLimit || 15
  }

  get isEnabled() {
    return process.env.AI_SUMMARIZATION_ENABLED !== 'false'
  }

  refreshDay() {
    const today = getTodayISTDate()
    if (this.data.date !== today) {
      this.data.date = today
      this.data.usedCount = 0
      this.data.requests = []
      this.data.dailyLimit = this.dailyLimit
      saveUsageDataAtomic(this.filePath, this.data)
    }
  }

  getStatus() {
    this.refreshDay()
    const limit = this.dailyLimit
    const used = this.data.usedCount || 0
    return {
      enabled: this.isEnabled,
      configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
      date: this.data.date,
      dailyLimit: limit,
      usedToday: used,
      remainingToday: Math.max(0, limit - used)
    }
  }

  canConsume() {
    if (!this.isEnabled) return false
    this.refreshDay()
    return (this.data.usedCount || 0) < this.dailyLimit
  }

  recordUsage(articleId, model, status = 'success') {
    this.refreshDay()
    this.data.usedCount = (this.data.usedCount || 0) + 1
    this.data.requests.push({
      articleId,
      model,
      status,
      timestamp: new Date().toISOString()
    })
    // Retain only last 50 requests in log to keep file compact
    if (this.data.requests.length > 50) {
      this.data.requests = this.data.requests.slice(-50)
    }
    saveUsageDataAtomic(this.filePath, this.data)
  }

  // Check IP rate limit: max 10 requests / 60 seconds
  checkRateLimit(ip) {
    if (!ip) return true
    const now = Date.now()
    const windowMs = 60 * 1000
    const maxRequests = 10

    let timestamps = this.rateLimitMap.get(ip) || []
    timestamps = timestamps.filter(t => now - t < windowMs)

    if (timestamps.length >= maxRequests) {
      this.rateLimitMap.set(ip, timestamps)
      return false
    }

    timestamps.push(now)
    this.rateLimitMap.set(ip, timestamps)
    return true
  }

  // Importance scoring algorithm:
  // Evaluates title, description, category, and source credibility
  scoreImportance(article = {}) {
    let score = 0
    const text = `${article.title || ''} ${article.desc || ''}`.toLowerCase()

    // High-impact astronomy / physics keywords
    if (/\b(james webb|jwst|hubble|exoplanet|gravitational wave|supernova|black hole|dark matter|pulsar|neutron star)\b/i.test(text)) {
      score += 3
    }

    // Breakthrough & scientific discoveries
    if (/\b(discovery|breakthrough|reveals|first time|detected|found evidence|confirms|observation)\b/i.test(text)) {
      score += 2
    }

    // Major planetary / exploration missions
    if (/\b(artemis|mars|chandrayaan|moon|sample return|perseverance|europa clipper|voyager|gaganyaan)\b/i.test(text)) {
      score += 2
    }

    // Official scientific source bonus
    const sourceName = (article.source?.name || article.source || '').toLowerCase()
    if (sourceName.includes('nasa') || sourceName.includes('esa') || sourceName.includes('isro') || sourceName.includes('webb')) {
      score += 1
    }

    // Preferred categories
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
