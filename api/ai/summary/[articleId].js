import { getAiServices, setCorsHeaders } from '../../_lib/aiServices.js'

export default async function handler(req, res) {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' })
  }

  const { articleId, url } = req.query || {}

  if (!articleId) {
    return res.status(400).json({ error: 'articleId route parameter required' })
  }

  try {
    const { summaryCache } = getAiServices()
    const cached = await summaryCache.get(articleId, url)

    if (!cached) {
      return res.status(404).json({
        cached: false,
        error: 'Summary not found in cache'
      })
    }

    return res.status(200).json({
      cached: true,
      articleId: cached.articleId,
      canonicalUrl: cached.canonicalUrl,
      summary: cached.summary,
      model: cached.model,
      createdAt: cached.createdAt,
      status: cached.status
    })
  } catch (err) {
    console.error('[Vercel API] /api/ai/summary/:articleId error:', err.message)
    return res.status(500).json({
      cached: false,
      error: 'Internal server error retrieving cached summary',
      details: err.message
    })
  }
}
