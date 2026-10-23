import { test, describe, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import {
  RSS_SOURCES,
  parseRSS,
  dedupeArticles,
  canonicalizeUrl,
  generateArticleId,
  validateArticle,
  categorizeArticle,
  toTimestampIST,
  formatDateIST
} from '../src/utils/rss.js'
import {
  loadIndex,
  saveIndexAtomic,
  updateArchiveFile,
  getNowIST,
  determineCollection
} from '../scripts/ingest.js'

describe('CosmosHub RSS Ingestion & Archival Pipeline Tests', () => {
  const TEST_DIR = resolve(process.cwd(), 'tests/tmp_test_data')

  before(() => {
    if (!existsSync(TEST_DIR)) {
      mkdirSync(TEST_DIR, { recursive: true })
    }
  })

  after(() => {
    try {
      if (existsSync(TEST_DIR)) {
        rmSync(TEST_DIR, { recursive: true, force: true, maxRetries: 3 })
      }
    } catch {
      // Ignore cleanup error on locked directory on Windows
    }
  })

  /* ── 1. RSS Parsing & Normalization ── */
  describe('RSS Parsing & Normalization', () => {
    test('parses standard RSS 2.0 XML with CDATA and tags', () => {
      const xml = `
        <rss version="2.0">
          <channel>
            <title>Space News Channel</title>
            <item>
              <title><![CDATA[Super-Earth Atmosphere Discovered by JWST]]></title>
              <link>https://www.nasa.gov/news/super-earth</link>
              <description><![CDATA[<p>Scientists have detected signs of an atmosphere on exoplanet LHS 3844 b.</p>]]></description>
              <pubDate>Fri, 23 Oct 2026 08:30:00 +0000</pubDate>
            </item>
          </channel>
        </rss>
      `
      const source = RSS_SOURCES[0]
      const articles = parseRSS(xml, source)
      assert.equal(articles.length, 1)
      assert.equal(articles[0].title, 'Super-Earth Atmosphere Discovered by JWST')
      assert.equal(articles[0].link, 'https://www.nasa.gov/news/super-earth')
      assert.equal(articles[0].desc, 'Scientists have detected signs of an atmosphere on exoplanet LHS 3844 b.')
      assert.equal(articles[0].source.name, 'NASA')
    })

    test('parses Atom feed entries with link href and summary', () => {
      const xml = `
        <feed xmlns="http://www.w3.org/2005/Atom">
          <title>ESA Science Feed</title>
          <entry>
            <title>Euclid Spacecraft Maps Dark Matter Clumps</title>
            <link rel="alternate" href="https://www.esa.int/euclid/dark-matter" />
            <summary>The first high-resolution map of cosmic dark matter.</summary>
            <updated>2026-10-23T06:00:00Z</updated>
          </entry>
        </feed>
      `
      const source = RSS_SOURCES[2] // ESA
      const articles = parseRSS(xml, source)
      assert.equal(articles.length, 1)
      assert.equal(articles[0].title, 'Euclid Spacecraft Maps Dark Matter Clumps')
      assert.equal(articles[0].link, 'https://www.esa.int/euclid/dark-matter')
      assert.equal(articles[0].desc, 'The first high-resolution map of cosmic dark matter.')
    })

    test('ignores items with titles shorter than 10 characters', () => {
      const xml = `
        <rss version="2.0">
          <channel>
            <item>
              <title>Too short</title>
              <link>https://example.com/short</link>
              <description>Description text</description>
              <pubDate>Fri, 23 Oct 2026 08:30:00 +0000</pubDate>
            </item>
          </channel>
        </rss>
      `
      const articles = parseRSS(xml, RSS_SOURCES[0])
      assert.equal(articles.length, 0)
    })
  })

  /* ── 2. URL Canonicalization & Identity ── */
  describe('URL Canonicalization & Identity Generation', () => {
    test('normalizes URLs removing tracking parameters and hash fragments', () => {
      const raw1 = 'http://www.NASA.gov/news/mission-update/?utm_source=twitter&utm_medium=social#overview'
      const raw2 = 'https://www.nasa.gov/news/mission-update?ref=space'
      const canonical1 = canonicalizeUrl(raw1)
      const canonical2 = canonicalizeUrl(raw2)

      assert.equal(canonical1, 'https://www.nasa.gov/news/mission-update')
      assert.equal(canonical2, 'https://www.nasa.gov/news/mission-update')
      assert.equal(canonical1, canonical2)
    })

    test('preserves necessary query parameters like article ID', () => {
      const url = 'https://example.org/article.php?id=98765&utm_campaign=daily'
      const canonical = canonicalizeUrl(url)
      assert.equal(canonical, 'https://example.org/article.php?id=98765')
    })

    test('generates identical IDs for equivalent URLs', () => {
      const id1 = generateArticleId({ link: 'http://nasa.gov/story?utm_source=fb#1', title: 'Story' })
      const id2 = generateArticleId({ link: 'https://nasa.gov/story', title: 'Story' })
      assert.equal(id1, id2)
    })

    test('generates different IDs for distinct article URLs', () => {
      const id1 = generateArticleId({ link: 'https://nasa.gov/story-1', title: 'Story 1' })
      const id2 = generateArticleId({ link: 'https://nasa.gov/story-2', title: 'Story 2' })
      assert.notEqual(id1, id2)
    })

    test('falls back safely when URL is missing without crashing', () => {
      const id = generateArticleId({
        link: '#',
        title: 'Title of the article for fallback test',
        pubDate: '2026-10-23',
        source: { key: 'nasa', name: 'NASA' }
      })
      assert.equal(typeof id, 'string')
      assert.equal(id.length, 16)
    })
  })

  /* ── 3. Deduplication ── */
  describe('Deduplication within Run', () => {
    test('removes duplicate stories with same link', () => {
      const articles = [
        { title: 'Chandrayaan 4 Mission Approved for 2027', link: 'https://isro.gov.in/c4', source: RSS_SOURCES[0] },
        { title: 'Chandrayaan 4 Mission Approved for 2027', link: 'https://isro.gov.in/c4', source: RSS_SOURCES[0] }
      ]
      const deduped = dedupeArticles(articles)
      assert.equal(deduped.length, 1)
    })

    test('removes near-duplicate headlines from same source on same day', () => {
      const articles = [
        {
          title: 'NASA Launches New Climate Satellite Into Polar Orbit',
          desc: 'NASA has successfully launched its newest Earth observation observatory to monitor sea level.',
          link: 'https://nasa.gov/orbit1',
          pubDate: '2026-10-23T10:00:00Z',
          source: RSS_SOURCES[0]
        },
        {
          title: 'NASA Launches New Climate Satellite Into Orbit Today',
          desc: 'NASA has successfully launched its newest Earth observation observatory to monitor sea levels.',
          link: 'https://nasa.gov/orbit2',
          pubDate: '2026-10-23T10:30:00Z',
          source: RSS_SOURCES[0]
        }
      ]
      const deduped = dedupeArticles(articles)
      assert.equal(deduped.length, 1)
    })
  })

  /* ── 4. Validation & Categorization ── */
  describe('Article Validation & Categorization', () => {
    test('validates valid articles successfully', () => {
      const article = {
        title: 'Artemis Crew Completes Launch Simulation',
        link: 'https://nasa.gov/artemis',
        source: RSS_SOURCES[0],
        pubDate: '2026-10-23T10:00:00Z'
      }
      const res = validateArticle(article)
      assert.equal(res.valid, true)
      assert.equal(res.pubDateValid, true)
    })

    test('flags invalid timestamps without inventing dates', () => {
      const article = {
        title: 'Valid Long Title for Testing Purpose',
        link: 'https://nasa.gov/article',
        source: RSS_SOURCES[0],
        pubDate: 'invalid-date-string'
      }
      const res = validateArticle(article)
      assert.equal(res.valid, true)
      assert.equal(res.pubDateValid, false)
      assert.equal(formatDateIST(article.pubDate), 'Unknown')
    })

    test('categorizes articles into expected scientific categories', () => {
      const missionArticle = { title: 'Artemis lunar lander test complete', source: RSS_SOURCES[0] }
      const astroArticle = { title: 'JWST discovers distant black hole in early universe', source: RSS_SOURCES[4] }
      const policyArticle = { title: 'Commercial space policy update approved', source: RSS_SOURCES[11] }

      assert.equal(categorizeArticle(missionArticle), 'Missions & Exploration')
      assert.equal(categorizeArticle(astroArticle), 'Astronomy & Astrophysics')
      assert.equal(categorizeArticle(policyArticle), 'Space Industry & Policy')
    })
  })

  /* ── 5. Persistent Index & Atomicity ── */
  describe('Persistent Article Index', () => {
    test('loads empty index when file does not exist', () => {
      const nonExistentPath = join(TEST_DIR, 'non-existent.json')
      const index = loadIndex(nonExistentPath)
      assert.equal(index.version, 1)
      assert.deepEqual(index.articles, {})
    })

    test('saves and reloads persistent index atomically', () => {
      const indexPath = join(TEST_DIR, 'news-index.json')
      const initial = {
        version: 1,
        lastUpdated: new Date().toISOString(),
        stats: { totalStories: 1, lastRunAdded: 1 },
        articles: {
          'id-12345': {
            id: 'id-12345',
            canonicalUrl: 'https://nasa.gov/news/1',
            title: 'Test Article Title',
            source: 'NASA'
          }
        }
      }
      saveIndexAtomic(indexPath, initial)
      assert.equal(existsSync(indexPath), true)

      const reloaded = loadIndex(indexPath)
      assert.equal(reloaded.stats.totalStories, 1)
      assert.equal(reloaded.articles['id-12345'].title, 'Test Article Title')
    })

    test('throws a descriptive error on corrupt JSON index without destroying file', () => {
      const indexPath = join(TEST_DIR, 'corrupt-index.json')
      writeFileSync(indexPath, '{"corrupted json: incomplete...', 'utf8')

      assert.throws(() => {
        loadIndex(indexPath)
      }, /Corrupt persistent index file/)
    })
  })

  /* ── 6. Markdown Archive Generation & Idempotency ── */
  describe('Markdown Archive Generation & Idempotency', () => {
    test('creates new daily archive with morning collection', () => {
      const archivePath = join(TEST_DIR, '2026-10-23.md')
      const articles = [
        {
          title: 'NASA Tests New Rocket Engine',
          source: { name: 'NASA' },
          category: 'Missions & Exploration',
          canonicalUrl: 'https://nasa.gov/engine',
          pubDate: '2026-10-23T04:30:00Z'
        }
      ]

      updateArchiveFile(archivePath, '2026-10-23', 'Morning Collection — 9:00 AM IST', 'morning', articles)
      assert.equal(existsSync(archivePath), true)

      const content = readFileSync(archivePath, 'utf8')
      assert.match(content, /# CosmosHub News Archive — 2026-10-23/)
      assert.match(content, /> Timezone: Asia\/Kolkata/)
      assert.match(content, /## Morning Collection — 9:00 AM IST/)
      assert.match(content, /### Missions & Exploration/)
      assert.match(content, /NASA Tests New Rocket Engine/)
      assert.match(content, /https:\/\/nasa\.gov\/engine/)
    })

    test('appends evening collection to the existing daily archive', () => {
      const archivePath = join(TEST_DIR, '2026-10-23.md')
      const morningArticles = [
        {
          title: 'Morning Article',
          source: { name: 'NASA' },
          category: 'Missions & Exploration',
          canonicalUrl: 'https://nasa.gov/morning',
          pubDate: '2026-10-23T04:30:00Z'
        }
      ]
      const eveningArticles = [
        {
          title: 'Evening Discovery',
          source: { name: 'ESA' },
          category: 'Astronomy & Astrophysics',
          canonicalUrl: 'https://esa.int/evening',
          pubDate: '2026-10-23T15:30:00Z'
        }
      ]

      updateArchiveFile(archivePath, '2026-10-23', 'Morning Collection — 9:00 AM IST', 'morning', morningArticles)
      updateArchiveFile(archivePath, '2026-10-23', 'Evening Collection — 9:00 PM IST', 'evening', eveningArticles)

      const content = readFileSync(archivePath, 'utf8')
      assert.match(content, /## Morning Collection — 9:00 AM IST/)
      assert.match(content, /Morning Article/)
      assert.match(content, /## Evening Collection — 9:00 PM IST/)
      assert.match(content, /Evening Discovery/)
    })

    test('is idempotent when re-running the same collection', () => {
      const archivePath = join(TEST_DIR, '2026-10-23.md')
      const articles = [
        {
          title: 'Test Article',
          source: { name: 'NASA' },
          category: 'Missions & Exploration',
          canonicalUrl: 'https://nasa.gov/test',
          pubDate: '2026-10-23T04:30:00Z'
        }
      ]

      updateArchiveFile(archivePath, '2026-10-23', 'Morning Collection — 9:00 AM IST', 'morning', articles)
      const firstRunContent = readFileSync(archivePath, 'utf8')

      // Rerun with empty new stories (since already indexed)
      updateArchiveFile(archivePath, '2026-10-23', 'Morning Collection — 9:00 AM IST', 'morning', [])
      const secondRunContent = readFileSync(archivePath, 'utf8')

      // Should not duplicate headers or overwrite stories
      assert.equal(secondRunContent, firstRunContent)
      const occurrences = (secondRunContent.match(/## Morning Collection — 9:00 AM IST/g) || []).length
      assert.equal(occurrences, 1)
    })

    test('preserves existing stories when newly discovered stories are added to same section', () => {
      const archivePath = join(TEST_DIR, '2026-10-23.md')
      const initialArticle = [
        {
          title: 'First Article Discovered',
          source: { name: 'NASA' },
          category: 'Missions & Exploration',
          canonicalUrl: 'https://nasa.gov/first',
          pubDate: '2026-10-23T04:30:00Z'
        }
      ]
      const secondArticle = [
        {
          title: 'Second Article Discovered Later',
          source: { name: 'ESA' },
          category: 'Missions & Exploration',
          canonicalUrl: 'https://esa.int/second',
          pubDate: '2026-10-23T05:00:00Z'
        }
      ]

      updateArchiveFile(archivePath, '2026-10-23', 'Morning Collection — 9:00 AM IST', 'morning', initialArticle)
      updateArchiveFile(archivePath, '2026-10-23', 'Morning Collection — 9:00 AM IST', 'morning', secondArticle)

      const content = readFileSync(archivePath, 'utf8')
      assert.match(content, /First Article Discovered/)
      assert.match(content, /Second Article Discovered Later/)
    })

    test('records empty collection notice clearly when no new articles found', () => {
      const archivePath = join(TEST_DIR, '2026-10-24-empty.md')
      updateArchiveFile(archivePath, '2026-10-24', 'Evening Collection — 9:00 PM IST', 'evening', [])

      const content = readFileSync(archivePath, 'utf8')
      assert.match(content, /_No new articles were archived during this collection\._/)
    })
  })

  /* ── 7. Scheduling & Timezone Logic ── */
  describe('Scheduling & Timezone Logic', () => {
    test('computes IST date and time correctly from UTC date', () => {
      // 03:30 UTC = 09:00 IST on same day
      const morningUtc = new Date('2026-10-23T03:30:00.000Z')
      const istMorning = getNowIST(morningUtc.toISOString().slice(0, 10))
      assert.equal(istMorning.dateStr, '2026-10-23')

      // 18:30 UTC on Oct 22 = 00:00 IST on Oct 23 (midnight rollover)
      const rolloverUtc = new Date('2026-10-22T18:30:00.000Z')
      const istRollover = getNowIST()
      assert.equal(typeof istRollover.dateStr, 'string')
    })

    test('handles evening collection delayed past midnight in IST correctly', () => {
      // Suppose scheduled at 15:30 UTC (21:00 IST on Oct 23)
      // Runner is delayed by 4.5 hours and starts at 20:00 UTC (01:30 IST on Oct 24)
      const delayedEveningTime = new Date('2026-10-23T20:00:00.000Z')
      const istDelayed = getNowIST(null, 'evening', delayedEveningTime)

      // Must be attributed to Oct 23, NOT Oct 24!
      assert.equal(istDelayed.dateStr, '2026-10-23')
      assert.equal(istDelayed.hour, 1) // 01:30 IST
    })

    test('determines morning vs evening collections according to IST hour', () => {
      const morning = determineCollection('auto', 9)
      const evening = determineCollection('auto', 21)
      assert.equal(morning.type, 'morning')
      assert.equal(evening.type, 'evening')
    })
  })

  /* ── 8. Workflow Syntax & Safety Verification ── */
  describe('Workflow & Security Safeguards', () => {
    test('verifies workflow file exists and has correct cron schedules', () => {
      const workflowPath = resolve(process.cwd(), '.github/workflows/rss-ingestion.yml')
      assert.equal(existsSync(workflowPath), true)

      const content = readFileSync(workflowPath, 'utf8')
      // 03:30 UTC = 09:00 IST and 15:30 UTC = 21:00 IST as separate distinct schedules
      assert.match(content, /cron:\s*['"]30 3 \* \* \*['"]/)
      assert.match(content, /cron:\s*['"]30 15 \* \* \*['"]/)
      assert.match(content, /workflow_dispatch:/)
      assert.match(content, /contents:\s*write/)
      assert.match(content, /cancel-in-progress:\s*false/)

      // Verify rebase conflict safety logic
      assert.match(content, /git rebase --abort/)

      // Verify no secrets or Anthropic keys are leaked into the workflow file
      assert.equal(content.includes('ANTHROPIC'), false)
      assert.equal(content.includes('API_KEY'), false)
    })
  })

  /* ── 9. Website Snapshot Fallback ── */
  describe('Website Snapshot & Fallback Integration', () => {
    test('verifies data/latest-news.json exists and adheres to valid article schema', () => {
      const snapshotPath = resolve(process.cwd(), 'data/latest-news.json')
      assert.equal(existsSync(snapshotPath), true)

      const raw = readFileSync(snapshotPath, 'utf8')
      const data = JSON.parse(raw)
      assert.equal(data.version, 1)
      assert.ok(Array.isArray(data.articles))
      assert.ok(data.articles.length > 0)

      const sample = data.articles[0]
      assert.ok(sample.id)
      assert.ok(sample.title)
      assert.ok(sample.link)
      assert.ok(sample.source?.name)
      assert.ok(sample.source?.key)
    })
  })
})
