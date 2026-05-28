import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

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
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    apiKey: process.env.ANTHROPIC_API_KEY ? '✓ configured' : '✗ missing'
  })
})

// ── Static Files (serve Vite dist) ──
app.use(express.static('dist'))

// ── Fallback to index.html for SPA ──
app.get('*', (req, res) => {
  res.sendFile(new URL('./dist/index.html', import.meta.url).pathname)
})

app.listen(PORT, () => {
  console.log(`🚀 CosmosHub server running on http://localhost:${PORT}`)
  console.log(`📡 RSS Proxy: http://localhost:${PORT}/api/rss-proxy?url=<feed-url>`)
})
