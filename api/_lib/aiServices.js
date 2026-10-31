import { SummaryCache } from '../../server/summaryCache.js'
import { QuotaManager } from '../../server/quotaManager.js'
import { GeminiService } from '../../server/geminiService.js'

let summaryCache = null
let quotaManager = null
let geminiService = null

export function getAiServices() {
  if (!summaryCache) {
    summaryCache = new SummaryCache()
    quotaManager = new QuotaManager()
    geminiService = new GeminiService(summaryCache, quotaManager)
  }
  return { summaryCache, quotaManager, geminiService }
}

export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}
