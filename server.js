import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { SummaryCache } from './server/summaryCache.js'
import { QuotaManager } from './server/quotaManager.js'
import { GeminiService, generateFallbackSummary } from './server/geminiService.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const summaryCache = new SummaryCache()
const quotaManager = new QuotaManager()
const geminiService = new GeminiService(summaryCache, quotaManager)

app.use(cors())
app.use(express.json())

async function handleRssProxy(req, res) {
  const { url } = req.query
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter required' })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CosmosHub/1.0'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const contents = await response.text()
    res.json({ contents, success: true })
  } catch (error) {
    console.error(`[RSS] Failed to fetch ${url}:`, error.message)
    res.status(500).json({ error: error.message, contents: '' })
  }
}

// ── RSS Proxy Endpoint ──
app.get(['/rss-proxy', '/api/rss-proxy'], handleRssProxy)

// ── Health Check ──
app.get(['/health', '/api/health'], (req, res) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0)

  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    geminiConfigured: hasGeminiKey ? '✓ configured' : '✗ missing',
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash'
  })
})

// ── AI Status & Quota Check ──
app.get('/api/ai/status', (req, res) => {
  res.json(quotaManager.getStatus())
})

// ── Retrieve Cached Summary by Article ID or URL ──
app.get('/api/ai/summary/:articleId', (req, res) => {
  const { articleId } = req.params
  const canonicalUrl = req.query?.url
  const cached = summaryCache.get(articleId, canonicalUrl)

  if (!cached) {
    return res.status(404).json({
      cached: false,
      error: 'Summary not found in cache'
    })
  }

  res.json({
    cached: true,
    articleId: cached.articleId,
    canonicalUrl: cached.canonicalUrl,
    summary: cached.summary,
    model: cached.model,
    createdAt: cached.createdAt,
    status: cached.status
  })
})

// ── Request Summary (Auto or Manual) ──
app.post('/api/ai/summary', async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress
  if (!quotaManager.checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Maximum 10 summary requests per minute.',
      fallback: true,
      summary: generateFallbackSummary(req.body?.desc)
    })
  }

  const { articleId, title, canonicalUrl, desc, category, source, isManual } = req.body || {}

  if (!title || typeof title !== 'string' || title.trim().length < 5) {
    return res.status(400).json({
      error: 'Article title is required and must be at least 5 characters long'
    })
  }

  if (!articleId && !canonicalUrl) {
    return res.status(400).json({
      error: 'Either articleId or canonicalUrl is required'
    })
  }

  try {
    const result = await geminiService.getOrGenerateSummary({
      articleId: articleId || canonicalUrl,
      title: title.trim(),
      canonicalUrl: canonicalUrl || '',
      desc: desc || '',
      category: category || '',
      source: source || {},
      isManual: Boolean(isManual)
    })

    res.json(result)
  } catch (err) {
    console.error('[AI] Summary endpoint error:', err.message)
    res.status(500).json({
      success: false,
      fallback: true,
      error: 'Internal server error processing summary',
      summary: generateFallbackSummary(desc)
    })
  }
})

// ── Static Files (serve Vite dist) ──
app.use(express.static('dist'))

// ── Fallback to index.html for SPA ──
app.get('*', (req, res) => {
  res.sendFile(fileURLToPath(new URL('./dist/index.html', import.meta.url)))
})

// Export app and services for testability
export { app, summaryCache, quotaManager, geminiService }

// Only start listening when run directly
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  app.listen(PORT, () => {
    console.log(`🚀 CosmosHub server running on http://localhost:${PORT}`)
    console.log(`📡 RSS Proxy: http://localhost:${PORT}/api/rss-proxy?url=<feed-url>`)
    console.log(`🤖 Gemini AI Summary: http://localhost:${PORT}/api/ai/summary`)
  })
}
