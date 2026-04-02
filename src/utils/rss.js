// ── rss.js ──────────────────────────────────────────

import { getTrustMeta } from './trust'

const CORS_PROXY = '/rss-proxy?url='
const MAX_PER_SOURCE = Number(import.meta.env.VITE_RSS_MAX_PER_SOURCE || 20)

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
    name:       'Sky & Telescope',
    key:        'skyandtelescope',
    badgeClass: 'badge-universe',
    cardClass:  'universe',
    url:        'https://skyandtelescope.org/astronomy-news/feed/',
    tags:       ['Astronomy', 'Observing', 'Sky'],
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

function parseRSS(xmlText, source) {
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

  return articles.slice(0, Math.max(1, MAX_PER_SOURCE))
}

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function meaningfulTokens(text) {
  return normalizeText(text)
    .split(' ')
    .filter(t => t.length > 2 && !STOP_WORDS.has(t))
}

function buildTokenSet(text) {
  return new Set(meaningfulTokens(text))
}

function topicFingerprint(article) {
  const titleTokens = meaningfulTokens(article.title)
  const descTokens = meaningfulTokens(article.desc)
  const topTitle = titleTokens.slice(0, 4).join(' ')
  const topDesc = descTokens.slice(0, 6).join(' ')
  return `${article.source?.key || 'source'}|${topTitle}|${topDesc}`
}

function titleLead(article) {
  return meaningfulTokens(article.title).slice(0, 3).join(' ')
}

function jaccardSimilarity(a, b) {
  if (!a.size || !b.size) return 0
  let intersection = 0
  a.forEach(token => {
    if (b.has(token)) intersection += 1
  })
  const union = a.size + b.size - intersection
  return union ? intersection / union : 0
}

function isNearDuplicate(article, existing) {
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

function dedupeArticles(articles) {
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