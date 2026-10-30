import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { searchArticles, loadHistoricalArticles } from '../src/utils/search.js'
import {
  getSavedArticles,
  saveArticle,
  removeSavedArticle,
  toggleSaveArticle,
  isArticleSaved,
  resolveArticleId,
  normalizeSavedArticle,
  BOOKMARKS_STORAGE_KEY
} from '../src/utils/bookmarks.js'

// Mock browser localStorage and window dispatchEvent for Node test environment
class MockLocalStorage {
  constructor() {
    this.store = {}
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null
  }
  setItem(key, value) {
    this.store[key] = String(value)
  }
  removeItem(key) {
    delete this.store[key]
  }
  clear() {
    this.store = {}
  }
}

globalThis.localStorage = new MockLocalStorage()
globalThis.window = {
  dispatchEvent: () => true,
  addEventListener: () => {},
  removeEventListener: () => {},
}
globalThis.CustomEvent = class CustomEvent {
  constructor(name, options = {}) {
    this.name = name
    this.detail = options.detail
  }
}

describe('CosmosHub Global Article Search Tests', () => {
  const samplePool = [
    {
      article: {
        id: 'art-1',
        title: 'Artemis II Moon Mission Crew Prepares for Launch',
        link: 'https://nasa.gov/artemis-2',
        desc: 'NASA astronauts completed integrated simulation testing for the upcoming lunar flyby.',
        pubDate: '2026-10-30T10:00:00Z',
        category: 'Missions & Exploration',
        source: {
          name: 'NASA',
          key: 'nasa',
          tags: ['NASA', 'Moon', 'Artemis']
        }
      },
      summaries: {
        shortSummary: 'Astronauts ready for lunar orbit flight.',
        detailedSummary: 'Deep space spacecraft systems verified.'
      }
    },
    {
      article: {
        id: 'art-2',
        title: 'JWST Detects Water Vapor in Habitable Exoplanet Atmosphere',
        link: 'https://esa.int/jwst-water',
        desc: 'New spectroscopic data confirms atmospheric water molecules on rocky world.',
        pubDate: '2026-10-29T14:00:00Z',
        category: 'Astronomy & Astrophysics',
        source: {
          name: 'ESA',
          key: 'esa',
          tags: ['ESA', 'JWST', 'Exoplanet']
        }
      },
      summaries: {
        shortSummary: 'JWST finds biosignature indicator.',
        detailedSummary: 'Spectroscopy details published in Nature.'
      }
    },
    {
      article: {
        id: 'art-3',
        title: 'SpaceX Starship Completes Orbital Refueling Demonstration',
        link: 'https://spacenews.com/starship-refuel',
        desc: 'Cryogenic propellant transfer successfully completed in low Earth orbit.',
        pubDate: '2026-10-28T09:00:00Z',
        category: 'Space Industry & Policy',
        source: {
          name: 'SpaceNews',
          key: 'spacenews',
          tags: ['Industry', 'SpaceX', 'Starship']
        }
      },
      summaries: {
        shortSummary: 'Orbital refueling test successful.',
        detailedSummary: 'Milestone for Artemis lunar landing architecture.'
      }
    }
  ]

  it('performs case-insensitive keyword search', () => {
    const results = searchArticles('jwst', samplePool)
    assert.equal(results.length, 1)
    assert.equal(results[0].article.id, 'art-2')
  })

  it('performs multi-word matching across different fields (AND logic)', () => {
    // NASA is in source.name, Artemis is in title
    const results = searchArticles('NASA Artemis', samplePool)
    assert.equal(results.length, 1)
    assert.equal(results[0].article.id, 'art-1')
  })

  it('normalizes whitespace and ignores extra spaces', () => {
    const results = searchArticles('   starship    refueling   ', samplePool)
    assert.equal(results.length, 1)
    assert.equal(results[0].article.id, 'art-3')
  })

  it('supports partial keyword matching', () => {
    const results = searchArticles('spectro', samplePool)
    assert.equal(results.length, 1)
    assert.equal(results[0].article.id, 'art-2')
  })

  it('prioritizes exact title matches over description/summary matches in relevance ranking', () => {
    const customPool = [
      {
        article: {
          id: 'desc-match',
          title: 'International Astronauts Arrive at Space Station',
          desc: 'The mission involves deep space Artemis technology testing.',
          source: { name: 'ISS Blog', tags: [] }
        }
      },
      {
        article: {
          id: 'exact-match',
          title: 'Artemis',
          desc: 'Official lunar program overview.',
          source: { name: 'NASA', tags: [] }
        }
      },
      {
        article: {
          id: 'title-contains',
          title: 'NASA Announces New Artemis Schedule',
          desc: 'Press conference held at Kennedy Space Center.',
          source: { name: 'NASA', tags: [] }
        }
      }
    ]

    const results = searchArticles('Artemis', customPool)
    assert.equal(results.length, 3)
    assert.equal(results[0].article.id, 'exact-match')
    assert.equal(results[1].article.id, 'title-contains')
    assert.equal(results[2].article.id, 'desc-match')
  })

  it('returns empty array when query does not match any transmission', () => {
    const results = searchArticles('nonexistenttelemetryquery999', samplePool)
    assert.equal(results.length, 0)
  })

  it('loads historical archive pool from news-index.json and latest-news.json', async () => {
    const historical = await loadHistoricalArticles()
    assert.ok(Array.isArray(historical))
    assert.ok(historical.length > 100, `Expected at least 100 historical articles, found ${historical.length}`)
    
    // Verify an article has necessary rendering attributes
    const first = historical[0]
    assert.ok(first.id)
    assert.ok(first.title)
    assert.ok(first.link)
    assert.ok(first.source?.name)
  })
})

describe('CosmosHub Bookmark / Saved Articles Tests', () => {
  beforeEach(() => {
    globalThis.localStorage.clear()
  })

  const testArticle = {
    id: 'test-article-101',
    title: 'James Webb Discovers Most Distant Black Hole Ever Recorded',
    link: 'https://www.nasa.gov/news/webb-distant-black-hole',
    desc: 'Astronomers using JWST confirmed an active supermassive black hole 13.2 billion years ago.',
    pubDate: '2026-10-30T12:00:00Z',
    category: 'Astronomy & Astrophysics',
    source: {
      name: 'NASA',
      key: 'nasa',
      badgeClass: 'badge-nasa',
      cardClass: 'nasa',
      tags: ['NASA', 'Black Hole', 'JWST']
    }
  }

  it('normalizes saved article and provides fallback summaries if missing', () => {
    const normalized = normalizeSavedArticle(testArticle)
    assert.equal(normalized.id, 'test-article-101')
    assert.equal(normalized.title, testArticle.title)
    assert.ok(normalized.summaries?.shortSummary)
    assert.ok(normalized.savedAt)
  })

  it('resolves stable article ID deterministically', () => {
    const id1 = resolveArticleId(testArticle)
    assert.equal(id1, 'test-article-101')

    const withoutId = {
      title: 'Voyager 1 Telemetry Restored',
      link: 'https://jpl.nasa.gov/voyager-1',
      source: { name: 'NASA JPL', key: 'nasa' }
    }
    const generated1 = resolveArticleId(withoutId)
    const generated2 = resolveArticleId(withoutId)
    assert.ok(generated1 && generated1.length >= 8)
    assert.equal(generated1, generated2)
  })

  it('saves an article to persistent storage', () => {
    assert.equal(isArticleSaved(testArticle), false)
    const saved = saveArticle(testArticle)
    assert.ok(saved)
    assert.equal(isArticleSaved(testArticle), true)
    
    const all = getSavedArticles()
    assert.equal(all.length, 1)
    assert.equal(all[0].id, 'test-article-101')
  })

  it('prevents duplicate bookmarks when saving same article again', () => {
    saveArticle(testArticle)
    saveArticle(testArticle)
    const all = getSavedArticles()
    assert.equal(all.length, 1)
  })

  it('removes a saved article by ID or article object', () => {
    saveArticle(testArticle)
    assert.equal(isArticleSaved(testArticle), true)

    const removed = removeSavedArticle(testArticle.id)
    assert.equal(removed, true)
    assert.equal(isArticleSaved(testArticle), false)
    assert.equal(getSavedArticles().length, 0)
  })

  it('toggles saved status cleanly', () => {
    assert.equal(isArticleSaved(testArticle), false)
    
    // Toggle ON
    const state1 = toggleSaveArticle(testArticle)
    assert.equal(state1, true)
    assert.equal(isArticleSaved(testArticle), true)

    // Toggle OFF
    const state2 = toggleSaveArticle(testArticle)
    assert.equal(state2, false)
    assert.equal(isArticleSaved(testArticle), false)
  })

  it('handles corrupted localStorage data without crashing', () => {
    globalThis.localStorage.setItem(BOOKMARKS_STORAGE_KEY, '{ invalid json garbage [[[')
    const list = getSavedArticles()
    assert.deepEqual(list, [])
    assert.equal(isArticleSaved(testArticle), false)
  })
})
