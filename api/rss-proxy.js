export default async function handler(req, res) {
  const url = req.query?.url

  if (!url) {
    return res.status(400).json({ error: 'URL parameter required' })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CosmosHub/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': new URL(url).origin + '/',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const contents = await response.text()
    res.status(200).json({ contents, success: true })
  } catch (error) {
    console.error(`[RSS] Failed to fetch ${url}:`, error.message)
    res.status(500).json({ error: error.message, contents: '' })
  }
}