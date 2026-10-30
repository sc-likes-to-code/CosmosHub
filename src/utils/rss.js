// ── rss.js ──────────────────────────────────────────

import { getTrustMeta } from './trust.js'

const CORS_PROXY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RSS_PROXY_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_RSS_PROXY_URL) ||
  '/api/rss-proxy?url='

const MAX_PER_SOURCE = Number(
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RSS_MAX_PER_SOURCE) ||
  (typeof process !== 'undefined' && process.env?.VITE_RSS_MAX_PER_SOURCE) ||
  50
)

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'to', 'of', 'in', 'on', 'for', 'with', 'from', 'by',
  'at', 'is', 'are', 'was', 'were', 'as', 'it', 'this', 'that', 'its', 'their', 'into',
])

export const RSS_SOURCES = [
  {
    name:       'NASA',
    key:        'nasa',
    badgeClass: 'badge-nasa',
    cardClass:  'nasa',
    url:        'https://www.nasa.gov/news-release/feed/',
    tags:       ['NASA', 'Space', 'Science'],
  },
  {
    name:       'NASA JPL',
    key:        'nasa',
    badgeClass: 'badge-nasa',
    cardClass:  'nasa',
    url:        'https://www.jpl.nasa.gov/feeds/news',
    tags:       ['NASA', 'JPL', 'Missions'],
  },
  {
    name:       'ESA',
    key:        'esa',
    badgeClass: 'badge-esa',
    cardClass:  'esa',
    url:        'https://www.esa.int/rssfeed/Our_Activities/Space_Science',
    tags:       ['ESA', 'Europe', 'Science'],
  },
  {
    name:       'Space.com',
    key:        'spacedotcom',
    badgeClass: 'badge-spacedotcom',
    cardClass:  'spacedotcom',
    url:        'https://www.space.com/feeds/all',
    tags:       ['Space', 'News'],
  },
  {
    name:       'Universe Today',
    key:        'universe',
    badgeClass: 'badge-universe',
    cardClass:  'universe',
    url:        'https://www.universetoday.com/feed',
    tags:       ['Astronomy', 'Science'],
  },
  {
    name:       'ISS Blog',
    key:        'iss',
    badgeClass: 'badge-iss',
    cardClass:  'iss',
    url:        'https://blogs.nasa.gov/stationreport/feed/',
    tags:       ['ISS', 'NASA', 'Station'],
  },
  {
    name:       'ScienceDaily Space',
    key:        'sciencedaily',
    badgeClass: 'badge-spacedotcom',
    cardClass:  'spacedotcom',
    url:        'https://www.sciencedaily.com/rss/space_time.xml',
    tags:       ['Research', 'Science'],
  },
  {
    name:       'Phys.org Space',
    key:        'physorg',
    badgeClass: 'badge-spacedotcom',
    cardClass:  'spacedotcom',
    url:        'https://phys.org/rss-feed/space-news/',
    tags:       ['Physics', 'Space', 'Research'],
  },
  {
    name:       'ArXiv Astronomy',
    key:        'arxiv',
    badgeClass: 'badge-esa',
    cardClass:  'esa',
    url:        'http://arxiv.org/rss/astro-ph',
    tags:       ['Astronomy', 'Research', 'Papers'],
  },
  {
    name:       'SpaceNews',
    key:        'spacenews',
    badgeClass: 'badge-spacedotcom',
    cardClass:  'spacedotcom',
    url:        'https://spacenews.com/feed/',
    tags:       ['Industry', 'Policy', 'Launches'],
  },
  {
    name:       'Astronomy Magazine',
    key:        'astronomymagazine',
    badgeClass: 'badge-universe',
    cardClass:  'universe',
    url:        'https://www.astronomy.com/feed/',
    tags:       ['Astronomy', 'Science'],
  },
  {
    name:       'SpacePolicyOnline',
    key:        'spacepolicyonline',
    badgeClass: 'badge-spacedotcom',
    cardClass:  'spacedotcom',
    url:        'https://spacepolicyonline.com/feed/',
    tags:       ['Policy', 'Law', 'Industry'],
  },
  {
    name:       'NOIRLab News',
    key:        'noirlab',
    badgeClass: 'badge-esa',
    cardClass:  'esa',
    url:        'https://noirlab.edu/public/news/feed/',
    tags:       ['Observatories', 'Astronomy', 'Research'],
  },
]

/* ── Node-compatible XML extraction helpers ── */
function parseXmlEntities(str) {
  if (!str) return ''
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
}

function extractXmlTag(xmlChunk, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const match = xmlChunk.match(regex)
  if (!match) return ''
  let content = match[1]
  content = content.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
  return parseXmlEntities(content.trim())
}

function extractLink(xmlChunk) {
  const hrefMatch = xmlChunk.match(/<link[^>]+href=["']([^"']+)["']/i)
  if (hrefMatch && hrefMatch[1]) {
    return parseXmlEntities(hrefMatch[1].trim())
  }
  const tagMatch = xmlChunk.match(/<link[^>]*>([\s\S]*?)<\/link>/i)
  if (tagMatch && tagMatch[1]) {
    let content = tagMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
    return parseXmlEntities(content.trim())
  }
  return '#'
}

function parseRSSNode(xmlText, source, maxCount = MAX_PER_SOURCE) {
  const itemMatches = xmlText.match(/<(?:item|entry)[\s\S]*?<\/(?:item|entry)>/gi) || []
  const articles = []

  for (const item of itemMatches) {
    const title = extractXmlTag(item, 'title')
    const link = extractLink(item)
    const desc =
      extractXmlTag(item, 'description') ||
      extractXmlTag(item, 'summary') ||
      extractXmlTag(item, 'content')
    const pubDate =
      extractXmlTag(item, 'pubDate') ||
      extractXmlTag(item, 'published') ||
      extractXmlTag(item, 'updated')

    const cleanDesc = desc
      .replace(/<[^>]+>/g, '')
      .replace(/&[a-z]+;/gi, ' ')
      .trim()
      .slice(0, 300)

    if (title && title.length > 10) {
      articles.push({ title, link, desc: cleanDesc, pubDate, source })
    }
  }

  return articles.slice(0, Math.max(1, maxCount))
}

export function parseRSS(xmlText, source, maxCount = MAX_PER_SOURCE) {
  if (typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser()
      const doc    = parser.parseFromString(xmlText, 'application/xml')
      const items  = doc.querySelectorAll('item, entry')
      const articles = []

      items.forEach(item => {
        const title   = item.querySelector('title')?.textContent?.trim() || ''
        const link    =
          item.querySelector('link')?.textContent?.trim() ||
          item.querySelector('link')?.getAttribute('href') || '#'
        const desc    =
          item.querySelector('description, summary, content')?.textContent?.trim() || ''
        const pubDate =
          item.querySelector('pubDate, published, updated')?.textContent?.trim() || ''
        const cleanDesc = desc
          .replace(/<[^>]+>/g, '')
          .replace(/&[a-z]+;/gi, ' ')
          .trim()
          .slice(0, 300)

        if (title && title.length > 10) {
          articles.push({ title, link, desc: cleanDesc, pubDate, source })
        }
      })

      return articles.slice(0, Math.max(1, maxCount))
    } catch {
      return parseRSSNode(xmlText, source, maxCount)
    }
  }

  return parseRSSNode(xmlText, source, maxCount)
}

/* ── URL Canonicalization ── */
export function canonicalizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return ''
  const trimmed = rawUrl.trim()
  if (trimmed === '#' || !trimmed) return ''
  try {
    const parsed = new URL(trimmed)
    parsed.protocol = 'https:'
    parsed.host = parsed.host.toLowerCase()
    parsed.hash = ''

    const trackingParams = new Set([
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
      'fbclid', 'gclid', 'mc_cid', 'mc_eid', 'igshid', '_ga', '_gl', 'ref', 'cmpid', 'xtor'
    ])

    const keys = Array.from(parsed.searchParams.keys())
    for (const key of keys) {
      if (trackingParams.has(key.toLowerCase())) {
        parsed.searchParams.delete(key)
      }
    }

    parsed.searchParams.sort()

    let pathname = parsed.pathname.replace(/\/+/g, '/')
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1)
    }
    parsed.pathname = pathname

    return parsed.toString()
  } catch {
    return trimmed.split('#')[0]
  }
}

/* ── Stable Article Identity ── */
export function simpleHash(str) {
  let h1 = 0xdeadbeef ^ 0, h2 = 0x41c6ce57 ^ 0
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  const hex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0')
  return hex.slice(0, 16)
}

export function generateArticleId(article) {
  const canonical = canonicalizeUrl(article.link)
  let base = canonical
  if (!canonical || canonical === '#' || canonical === 'https://' || canonical === 'http://') {
    const srcKey = article.source?.key || article.source?.name || 'unknown'
    const titleNorm = normalizeText(article.title || '')
    const datePart = String(article.pubDate || '').slice(0, 10)
    base = `fallback:${srcKey}:${titleNorm}:${datePart}`
  }
  return simpleHash(base)
}

/* ── Validation ── */
export function validateArticle(article) {
  const errors = []
  if (!article || typeof article !== 'object') {
    return { valid: false, errors: ['Article is not an object'] }
  }

  if (!article.title || typeof article.title !== 'string' || article.title.trim().length < 8) {
    errors.push('Missing or too short title (minimum 8 characters)')
  }

  if (!article.link || typeof article.link !== 'string' || article.link.trim() === '#') {
    errors.push('Missing or invalid link URL')
  }

  if (!article.source || typeof article.source !== 'object' || !article.source.name) {
    errors.push('Missing source attribution metadata')
  }

  const rawPubDate = article.pubDate ? String(article.pubDate).trim() : ''
  const parsedTs = toTimestampIST(rawPubDate)
  const pubDateValid = Boolean(rawPubDate && parsedTs > 0)

  return {
    valid: errors.length === 0,
    pubDateValid,
    errors
  }
}

/* ── Category Classification ── */
export function categorizeArticle(article) {
  const tags = new Set((article.source?.tags || []).map(t => String(t).toLowerCase()))
  const text = `${article.title || ''} ${article.desc || ''}`.toLowerCase()

  if (
    tags.has('missions') ||
    tags.has('station') ||
    tags.has('iss') ||
    tags.has('moon') ||
    /\b(mission|iss|rover|lander|artemis|station|apollo|spacewalk|crew)\b/i.test(text)
  ) {
    return 'Missions & Exploration'
  }

  if (
    tags.has('astronomy') ||
    tags.has('observatories') ||
    /\b(jwst|telescope|galaxy|nebula|exoplanet|star|black hole|cosmology|supernova)\b/i.test(text)
  ) {
    return 'Astronomy & Astrophysics'
  }

  if (
    tags.has('industry') ||
    tags.has('policy') ||
    tags.has('law') ||
    tags.has('launches') ||
    /\b(spacex|isro|launch|rocket|policy|commercial|contract|satellite|faa)\b/i.test(text)
  ) {
    return 'Space Industry & Policy'
  }

  if (
    tags.has('research') ||
    tags.has('physics') ||
    tags.has('science') ||
    tags.has('papers') ||
    /\b(study|discovery|physic|atmosphere|research|paper|experiment)\b/i.test(text)
  ) {
    return 'Research & Science'
  }

  return 'Other Space Transmissions'
}

/* ── Timestamps & Timezones ── */
export function hasTimezoneInfo(value) {
  return /(Z|[+-]\d{2}:?\d{2}|GMT|UTC)$/i.test(String(value || '').trim())
}

export function toTimestampIST(value) {
  if (!value) return 0
  const raw = String(value).trim()
  if (!raw) return 0

  const direct = Date.parse(raw)
  if (hasTimezoneInfo(raw)) {
    return Number.isFinite(direct) && direct > 0 ? direct : 0
  }

  if (Number.isFinite(direct) && direct > 0) {
    const istTs = Date.parse(`${raw} GMT+0530`)
    return Number.isFinite(istTs) && istTs > 0 ? istTs : direct
  }

  return 0
}

export function formatDateIST(dateVal) {
  const ts = toTimestampIST(dateVal)
  if (!ts) return 'Unknown'
  const d = new Date(ts)
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(d)

    const map = {}
    for (const p of parts) map[p.type] = p.value
    return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute} IST`
  } catch {
    return d.toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
  }
}

export function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function meaningfulTokens(text) {
  return normalizeText(text)
    .split(' ')
    .filter(t => t.length > 2 && !STOP_WORDS.has(t))
}

export function buildTokenSet(text) {
  return new Set(meaningfulTokens(text))
}

export function topicFingerprint(article) {
  const titleTokens = meaningfulTokens(article.title)
  const descTokens = meaningfulTokens(article.desc)
  const topTitle = titleTokens.slice(0, 4).join(' ')
  const topDesc = descTokens.slice(0, 6).join(' ')
  return `${article.source?.key || 'source'}|${topTitle}|${topDesc}`
}

export function titleLead(article) {
  return meaningfulTokens(article.title).slice(0, 3).join(' ')
}

export function jaccardSimilarity(a, b) {
  if (!a.size || !b.size) return 0
  let intersection = 0
  a.forEach(token => {
    if (b.has(token)) intersection += 1
  })
  const union = a.size + b.size - intersection
  return union ? intersection / union : 0
}

export function isNearDuplicate(article, existing) {
  const sameSource = article.source?.name === existing.source?.name
  const titleA = buildTokenSet(article.title)
  const titleB = buildTokenSet(existing.title)
  const descA = buildTokenSet(article.desc)
  const descB = buildTokenSet(existing.desc)

  const titleScore = jaccardSimilarity(titleA, titleB)
  const descScore = jaccardSimilarity(descA, descB)
  const sameTopic = topicFingerprint(article) === topicFingerprint(existing)
  const sameTitleLead = titleLead(article) && titleLead(article) === titleLead(existing)
  const sameDay = Boolean(article.pubDate && existing.pubDate) &&
    new Date(article.pubDate).toDateString() === new Date(existing.pubDate).toDateString()

  // Strict for cross-source duplicates, looser for same-source feed spam.
  if (sameSource && sameTitleLead && sameDay) return true
  if (sameSource && sameTopic && sameDay) return true
  if (sameSource && (titleScore >= 0.38 || descScore >= 0.55)) return true
  if (!sameSource && titleScore >= 0.72 && descScore >= 0.55) return true
  return false
}

export function dedupeArticles(articles) {
  const deduped = []
  for (const article of articles) {
    const sameLink = deduped.some(a => a.link && a.link === article.link)
    if (sameLink) continue

    const duplicateIndex = deduped.findIndex(existing => isNearDuplicate(article, existing))
    if (duplicateIndex === -1) {
      deduped.push(article)
      continue
    }

    const existing = deduped[duplicateIndex]
    const currentTrust = getTrustMeta(article.source?.name).trust
    const existingTrust = getTrustMeta(existing.source?.name).trust

    if (currentTrust > existingTrust) {
      deduped[duplicateIndex] = article
      continue
    }

    if (currentTrust === existingTrust) {
      const currentOrder = Number.isFinite(article.ingestOrder) ? article.ingestOrder : Number.MAX_SAFE_INTEGER
      const existingOrder = Number.isFinite(existing.ingestOrder) ? existing.ingestOrder : Number.MAX_SAFE_INTEGER
      if (currentOrder < existingOrder) deduped[duplicateIndex] = article
    }
  }
  return deduped
}

async function fetchSource(source) {
  try {
    const res  = await fetch(CORS_PROXY + encodeURIComponent(source.url), {
      signal: AbortSignal.timeout(8000),
    })
    const data = await res.json()
    return parseRSS(data.contents || '', source)
  } catch {
    return []
  }
}

export async function fetchAllFeeds() {
  const results = await Promise.allSettled(RSS_SOURCES.map(fetchSource))
  let ingestOrder = 0
  const all = results.flatMap((r, i) =>
    r.status === 'fulfilled'
      ? r.value.map(a => ({ ...a, source: RSS_SOURCES[i], ingestOrder: ingestOrder++ }))
      : []
  )

  if (all.length > 0) {
    const deduped = dedupeArticles(all)
    deduped.sort((a, b) => {
      const dateDiff = new Date(b.pubDate) - new Date(a.pubDate)
      if (dateDiff !== 0) return dateDiff
      const trustDiff = getTrustMeta(b.source?.name).trust - getTrustMeta(a.source?.name).trust
      if (trustDiff !== 0) return trustDiff
      return (a.ingestOrder ?? 0) - (b.ingestOrder ?? 0)
    })
    return deduped
  }

  // Fallback: If live feeds are completely unreachable, attempt to load latest scheduled snapshot
  try {
    const snapshotModule = await import('../../data/latest-news.json')
    const snapshot = snapshotModule.default || snapshotModule
    if (snapshot && Array.isArray(snapshot.articles) && snapshot.articles.length > 0) {
      return dedupeArticles(snapshot.articles)
    }
  } catch {
    // Snapshot not available; fallback handled by consumer
  }

  return []
}

export const SAMPLE_ARTICLES = [
  {
    title:   'James Webb Telescope Reveals Atmosphere of a Super-Earth for the First Time',
    link:    'https://www.nasa.gov',
    pubDate: new Date().toISOString(),
    desc:    "NASA's JWST has detected atmospheric signatures on a rocky exoplanet 41 light-years away, marking a historic breakthrough in the search for potentially habitable worlds beyond our solar system.",
    source:  RSS_SOURCES[0],
  },
  {
    title:   "ISRO's Chandrayaan-4 Mission Gets Green Light — Sample Return by 2027",
    link:    'https://www.isro.gov.in',
    pubDate: new Date(Date.now() - 3_600_000).toISOString(),
    desc:    "India's space agency has officially approved the Chandrayaan-4 lunar sample return mission, aiming to bring back 3kg of Moon rocks and advance India's deep space capabilities.",
    source:  RSS_SOURCES[7],
  },
  {
    title:   "ESA's Euclid Mission Releases First Dark Matter Map of the Universe",
    link:    'https://www.esa.int',
    pubDate: new Date(Date.now() - 7_200_000).toISOString(),
    desc:    "The European Space Agency's Euclid telescope produced the most detailed dark matter map ever created, covering one-third of the sky and challenging existing cosmological models.",
    source:  RSS_SOURCES[2],
  },
  {
    title:   'ISS Crew Completes Record Spacewalk to Install New Solar Arrays',
    link:    'https://blogs.nasa.gov',
    pubDate: new Date(Date.now() - 10_800_000).toISOString(),
    desc:    "Astronauts aboard the International Space Station completed an 8-hour EVA installing upgraded solar panels that boost the station's power capacity by 30% through 2030.",
    source:  RSS_SOURCES[5],
  },
  {
    title:   'Astronomers Discover Most Distant Galaxy Ever Observed — 33.6 Billion Light-Years Away',
    link:    'https://www.universetoday.com',
    pubDate: new Date(Date.now() - 14_400_000).toISOString(),
    desc:    'Using gravitational lensing and JWST, an international team confirmed a galaxy existing just 290 million years after the Big Bang, rewriting our understanding of early cosmic structure.',
    source:  RSS_SOURCES[4],
  },
  {
    title:   "JAXA's SLIM Lunar Lander Survives Third Lunar Night",
    link:    'https://global.jaxa.jp',
    pubDate: new Date(Date.now() - 18_000_000).toISOString(),
    desc:    "Japan's SLIM lander defied expectations by surviving three lunar nights, continuing to transmit scientific data from the lunar surface far beyond its original mission scope.",
    source:  {
      name:       'JAXA',
      key:        'jaxa',
      badgeClass: 'badge-jaxa',
      cardClass:  'jaxa',
      tags:       ['JAXA', 'Japan', 'Moon'],
    },
  },
]
