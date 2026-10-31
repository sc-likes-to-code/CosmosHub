import { getAiServices, setCorsHeaders } from '../_lib/aiServices.js'
import { generateFallbackSummary } from '../../server/geminiService.js'

export default async function handler(req, res) {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  const { quotaManager, geminiService } = getAiServices()

  // Distributed IP rate limiting
  const forwarded = req.headers['x-forwarded-for']
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown'
  const rateLimitOk = await quotaManager.checkRateLimit(clientIp)

  if (!rateLimitOk) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Maximum 10 summary requests per minute.',
      fallback: true,
      summary: generateFallbackSummary(req.body?.desc)
    })
  }

  let body = req.body || {}
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON request body' })
    }
  }

  const { articleId, title, canonicalUrl, desc, category, source, isManual } = body

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

    return res.status(200).json(result)
  } catch (err) {
    console.error('[Vercel API] /api/ai/summary error:', err.message)
    return res.status(500).json({
      success: false,
      fallback: true,
      error: 'Temporary service error processing summary',
      summary: generateFallbackSummary(desc)
    })
  }
}
