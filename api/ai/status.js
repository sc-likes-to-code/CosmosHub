import { getAiServices, setCorsHeaders } from '../_lib/aiServices.js'

export default async function handler(req, res) {
  setCorsHeaders(res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' })
  }

  try {
    const { quotaManager } = getAiServices()
    const status = await quotaManager.getStatus()
    return res.status(200).json(status)
  } catch (err) {
    console.error('[Vercel API] /api/ai/status error:', err.message)
    return res.status(500).json({
      error: 'Failed to retrieve AI status',
      details: err.message
    })
  }
}
