// ── rss.js ──────────────────────────────────────────

const CORS_PROXY = '/rss-proxy?url='

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
    name:       'ISS',
    key:        'iss',
    badgeClass: 'badge-iss',
    cardClass:  'iss',
    url:        'https://blogs.nasa.gov/stationreport/feed/',
    tags:       ['ISS', 'NASA', 'Station'],
  },
  {
    name:       'ScienceDaily Space',
    key:        'spacedotcom',
    badgeClass: 'badge-spacedotcom',
    cardClass:  'spacedotcom',
    url:        'https://www.sciencedaily.com/rss/space_time.xml',
    tags:       ['Research', 'Science'],
  },
  {
    name:       'ISRO',
    key:        'isro',
    badgeClass: 'badge-isro',
    cardClass:  'isro',
    url:        'https://www.isro.gov.in/rss.xml',
    tags:       ['ISRO', 'India', 'Missions'],
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

  return articles.slice(0, 5)
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
  const all = results.flatMap((r, i) =>
    r.status === 'fulfilled'
      ? r.value.map(a => ({ ...a, source: RSS_SOURCES[i] }))
      : []
  )
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
  return all
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