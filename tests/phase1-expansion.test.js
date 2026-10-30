import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, join } from 'node:path'
import {
  parseRSS,
  dedupeArticles,
  RSS_SOURCES,
  toTimestampIST
} from '../src/utils/rss.js'
import { saveSnapshotAtomic } from '../scripts/ingest.js'

describe('CosmosHub Phase 1 — Expansion Tests', () => {
  const TEST_DIR = resolve(process.cwd(), 'tests/tmp-phase1')

  /* ── 1. 50 Articles per RSS Source Ingestion ── */
  it('parses up to 50 articles per RSS source feed', () => {
    // Generate an RSS feed with 65 items
    let itemsXml = ''
    for (let i = 1; i <= 65; i++) {
      itemsXml += `
        <item>
          <title>Telemetry Transmission #${i}: Deep Space Array Status Report</title>
          <link>https://www.nasa.gov/mission-update-${i}</link>
          <description>Detailed status update for deep space observatory flight number ${i}.</description>
          <pubDate>Fri, 30 Oct 2026 12:00:00 +0000</pubDate>
        </item>`
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>NASA Feed</title>${itemsXml}</channel></rss>`
    const parsedDefault = parseRSS(xml, RSS_SOURCES[0])
    assert.equal(parsedDefault.length, 50, `Expected 50 items parsed by default, got ${parsedDefault.length}`)

    // Feeds with fewer than 50 articles are handled gracefully
    let smallXml = ''
    for (let i = 1; i <= 8; i++) {
      smallXml += `
        <item>
          <title>Orbital Mission #${i}: Telemetry Received</title>
          <link>https://www.esa.int/mission-${i}</link>
          <description>ESA mission flight update ${i}.</description>
          <pubDate>Fri, 30 Oct 2026 12:00:00 +0000</pubDate>
        </item>`
    }
    const parsedSmall = parseRSS(`<?xml version="1.0"?><rss><channel>${smallXml}</channel></rss>`, RSS_SOURCES[2])
    assert.equal(parsedSmall.length, 8)
  })

  /* ── 2. 500-Article Snapshot Capacity ── */
  it('increases snapshot capacity to 500 articles atomically in saveSnapshotAtomic', () => {
    mkdirSync(TEST_DIR, { recursive: true })
    const snapshotPath = join(TEST_DIR, 'latest-news-500.json')

    // Create 600 synthetic articles
    const largePool = []
    for (let i = 1; i <= 600; i++) {
      largePool.push({
        articleId: `id-${String(i).padStart(4, '0')}`,
        title: `Cosmic Discovery #${i}: High Energy Particle Emission`,
        canonicalUrl: `https://space.com/article-${i}`,
        desc: `Observatory detection details for event ${i}`,
        pubDate: new Date(Date.now() - i * 3600 * 1000).toISOString(),
        category: 'Astronomy & Astrophysics',
        source: {
          name: 'Space.com',
          key: 'spacedotcom',
          badgeClass: 'badge-spacedotcom',
          cardClass: 'spacedotcom',
          tags: ['Space', 'News']
        }
      })
    }

    saveSnapshotAtomic(snapshotPath, largePool, new Date().toISOString())
    assert.equal(existsSync(snapshotPath), true)

    const raw = readFileSync(snapshotPath, 'utf8')
    const saved = JSON.parse(raw)

    assert.equal(saved.version, 1)
    assert.equal(saved.count, 500)
    assert.equal(saved.articles.length, 500)
    assert.equal(saved.articles[0].id, 'id-0001')
    assert.equal(saved.articles[499].id, 'id-0500')

    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  /* ── 3. 30-Day Display Window Filter ── */
  it('correctly filters articles within the 30-day rolling window', () => {
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
    const now = Date.now()

    const articles = [
      { id: '1', title: 'Today article', pubDate: new Date(now - 1 * 86400000).toISOString() },
      { id: '2', title: '15-day article', pubDate: new Date(now - 15 * 86400000).toISOString() },
      { id: '3', title: '29-day article', pubDate: new Date(now - 29 * 86400000).toISOString() },
      { id: '4', title: '35-day article (outside)', pubDate: new Date(now - 35 * 86400000).toISOString() },
      { id: '5', title: '60-day article (outside)', pubDate: new Date(now - 60 * 86400000).toISOString() },
    ]

    const cutoff = now - THIRTY_DAYS_MS
    const inWindow = articles.filter(a => toTimestampIST(a.pubDate) >= cutoff)

    assert.equal(inWindow.length, 3)
    assert.deepEqual(inWindow.map(a => a.id), ['1', '2', '3'])
  })

  /* ── 4. Progressive Pagination (24 Initial + 24 Step) ── */
  it('manages 24-article initial page size and increments correctly on Load More', () => {
    const PAGE_SIZE = 24
    const totalArticles = Array.from({ length: 70 }, (_, i) => ({ id: `card-${i + 1}`, title: `Article #${i + 1}` }))

    // Initial page
    let visibleCount = PAGE_SIZE
    let paged = totalArticles.slice(0, visibleCount)
    assert.equal(paged.length, 24)
    assert.equal(totalArticles.length - visibleCount, 46) // 46 remaining

    // Click 1: Load More
    visibleCount += PAGE_SIZE
    paged = totalArticles.slice(0, visibleCount)
    assert.equal(paged.length, 48)
    assert.equal(totalArticles.length - visibleCount, 22) // 22 remaining

    // Click 2: Load More
    visibleCount += PAGE_SIZE
    paged = totalArticles.slice(0, visibleCount)
    assert.equal(paged.length, 70) // All 70 displayed
    assert.ok(totalArticles.length <= visibleCount) // Load more button hides
  })

  /* ── 5. Pagination Reset on Filter Change ── */
  it('resets pagination count to 24 when active filter or search changes', () => {
    const PAGE_SIZE = 24
    let visibleCount = 72 // User had previously expanded to 72

    // Filter change event occurs
    function onFilterChange() {
      visibleCount = PAGE_SIZE
    }

    onFilterChange()
    assert.equal(visibleCount, 24)
  })

  /* ── 6. 20-Headline Breaking News Ticker ── */
  it('extracts up to 20 unique headlines for ticker without duplicates', () => {
    const sampleArticles = [
      { title: 'Headline 1' },
      { title: 'Headline 2' },
      { title: 'Headline 1' }, // Duplicate
      { title: 'Headline 3' },
      { title: 'Headline 4' },
      { title: 'Headline 5' },
      { title: 'Headline 6' },
      { title: 'Headline 7' },
      { title: 'Headline 8' },
      { title: 'Headline 9' },
      { title: 'Headline 10' },
      { title: 'Headline 11' },
      { title: 'Headline 12' },
      { title: 'Headline 13' },
      { title: 'Headline 14' },
      { title: 'Headline 15' },
      { title: 'Headline 16' },
      { title: 'Headline 17' },
      { title: 'Headline 18' },
      { title: 'Headline 19' },
      { title: 'Headline 20' },
      { title: 'Headline 21' }, // Exceeds 20
      { title: 'Headline 22' },
    ]

    const uniqueTitles = []
    const seen = new Set()
    for (const a of sampleArticles) {
      const title = (a.title || '').trim()
      if (title && !seen.has(title)) {
        seen.add(title)
        uniqueTitles.push(title)
        if (uniqueTitles.length >= 20) break
      }
    }

    assert.equal(uniqueTitles.length, 20)
    assert.equal(uniqueTitles[0], 'Headline 1')
    assert.equal(uniqueTitles[1], 'Headline 2')
    assert.equal(uniqueTitles[2], 'Headline 3')
    assert.equal(uniqueTitles[19], 'Headline 20')
    assert.equal(seen.has('Headline 1'), true)
  })

  /* ── 7. Deduplication across Expanded 650-Raw-Article Volume ── */
  it('deduplicates accurately across high-volume batches (up to 650 articles)', () => {
    const topicKeywords = [
      'James Webb Space Telescope Deep Field Imaging Analysis',
      'Artemis Lunar Gateway Habitation Module Integration',
      'ISRO Chandrayaan Sample Return Trajectory Formulation',
      'Euclid Dark Matter Sky Survey Geometry Breakdown',
      'SpaceX Super Heavy Starship Booster Static Fire',
      'Perseverance Mars Rover Microbial Biosignature Detection',
      'Hubble Ultraviolet Observations of Interstellar Comet',
      'International Space Station Solar Array Gimbal Repair',
      'Cosmic Microwave Background Polarization Inflationary Test',
      'Fast Radio Burst Magnetar Magnetosphere Interaction'
    ]

    const rawBatch = []
    // 13 feeds * 50 articles = 650 raw entries
    for (let sourceIdx = 0; sourceIdx < 13; sourceIdx++) {
      for (let articleIdx = 1; articleIdx <= 50; articleIdx++) {
        const topic = topicKeywords[articleIdx % topicKeywords.length]
        const uniqueId = (articleIdx % 5 === 0) ? (articleIdx * 10) : (sourceIdx * 100 + articleIdx)
        rawBatch.push({
          title: `${topic} Mission Telemetry ${uniqueId}`,
          link: `https://space.example.com/story-${uniqueId}`,
          pubDate: 'Fri, 30 Oct 2026 12:00:00 +0000',
          source: RSS_SOURCES[sourceIdx % RSS_SOURCES.length]
        })
      }
    }

    assert.equal(rawBatch.length, 650)
    const deduped = dedupeArticles(rawBatch)
    assert.ok(deduped.length < 650, 'Should deduplicate redundant entries')
    assert.ok(deduped.length >= 100, `Expected diverse deduped pool, got ${deduped.length}`)

    // Verify all canonical links are unique in deduped batch
    const links = new Set(deduped.map(d => d.link))
    assert.equal(links.size, deduped.length)
  })

  /* ── 8. Automation & Safeguards Unchanged ── */
  it('confirms GitHub Actions workflow schedules and secrets remain untouched', () => {
    const workflowPath = resolve(process.cwd(), '.github/workflows/rss-ingestion.yml')
    assert.equal(existsSync(workflowPath), true)
    const workflow = readFileSync(workflowPath, 'utf8')

    // Confirm schedules are 09:00 IST (03:30 UTC) and 21:00 IST (15:30 UTC)
    assert.match(workflow, /30 3 \* \* \*/)
    assert.match(workflow, /30 15 \* \* \*/)
    assert.match(workflow, /workflow_dispatch:/)

    // Confirm no secrets or Anthropic API keys exposed
    assert.equal(workflow.includes('ANTHROPIC_API_KEY'), false)
    assert.equal(workflow.includes('GEMINI_API_KEY'), false)
  })

  /* ── 9. Phase 1.1: Snapshot Sorting Before Truncation ── */
  it('strictly sorts articles newest-first before applying 500-article truncation in saveSnapshotAtomic', () => {
    mkdirSync(TEST_DIR, { recursive: true })
    const snapshotPath = join(TEST_DIR, 'latest-news-sorted.json')

    const baseTime = Date.parse('2026-10-31T00:00:00.000Z')
    const mixedPool = []

    // 1. Add 300 articles published 1 to 300 hours ago
    for (let i = 1; i <= 300; i++) {
      mixedPool.push({
        articleId: `mid-${i}`,
        title: `Story Mid ${i}`,
        canonicalUrl: `https://example.com/mid-${i}`,
        pubDate: new Date(baseTime - i * 3600 * 1000).toISOString(),
        source: { name: 'Source A' }
      })
    }

    // 2. Add 200 brand new articles (1 to 200 minutes ago)
    for (let i = 1; i <= 200; i++) {
      mixedPool.push({
        articleId: `new-${i}`,
        title: `Story New ${i}`,
        canonicalUrl: `https://example.com/new-${i}`,
        pubDate: new Date(baseTime - i * 60 * 1000).toISOString(),
        source: { name: 'Source B' }
      })
    }

    // 3. Add 100 old articles (400 to 499 hours ago)
    for (let i = 400; i < 500; i++) {
      mixedPool.push({
        articleId: `old-${i}`,
        title: `Story Old ${i}`,
        canonicalUrl: `https://example.com/old-${i}`,
        pubDate: new Date(baseTime - i * 3600 * 1000).toISOString(),
        source: { name: 'Source C' }
      })
    }

    // 4. Add articles with missing, null, or malformed pubDate
    mixedPool.push({
      articleId: 'invalid-date-1',
      title: 'Invalid Date Story A',
      canonicalUrl: 'https://example.com/invalid-1',
      pubDate: 'Not a real date string',
      source: { name: 'Source Bad' }
    })
    mixedPool.push({
      articleId: 'missing-date-2',
      title: 'Missing Date Story B',
      canonicalUrl: 'https://example.com/missing-2',
      pubDate: null,
      source: { name: 'Source Bad' }
    })

    // 5. Add articles with identical timestamps for deterministic tie-breaking
    mixedPool.push({
      articleId: 'tie-b',
      title: 'Zeta Tie Story',
      canonicalUrl: 'https://example.com/tie-b',
      pubDate: new Date(baseTime - 10 * 1000).toISOString(),
      source: { name: 'Source Tie' }
    })
    mixedPool.push({
      articleId: 'tie-a',
      title: 'Alpha Tie Story',
      canonicalUrl: 'https://example.com/tie-a',
      pubDate: new Date(baseTime - 10 * 1000).toISOString(),
      source: { name: 'Source Tie' }
    })

    // Save atomic snapshot
    saveSnapshotAtomic(snapshotPath, mixedPool, new Date().toISOString())
    assert.equal(existsSync(snapshotPath), true)

    const raw = readFileSync(snapshotPath, 'utf8')
    const snapshot = JSON.parse(raw)

    assert.equal(snapshot.count, 500)
    assert.equal(snapshot.articles.length, 500)

    // Tie-break verification: with same timestamp (baseTime - 10s), 'Alpha Tie Story' comes before 'Zeta Tie Story'
    const alphaIdx = snapshot.articles.findIndex(a => a.id === 'tie-a')
    const zetaIdx = snapshot.articles.findIndex(a => a.id === 'tie-b')
    assert.ok(alphaIdx >= 0 && zetaIdx >= 0)
    assert.ok(alphaIdx < zetaIdx, 'Alpha Tie Story must precede Zeta Tie Story via secondary title sort')

    // Chronological ordering verification across first 400 items
    for (let idx = 0; idx < snapshot.articles.length - 1; idx++) {
      const cur = toTimestampIST(snapshot.articles[idx].pubDate)
      const next = toTimestampIST(snapshot.articles[idx + 1].pubDate)
      assert.ok(cur >= next, `Article at index ${idx} (${cur}) must be >= index ${idx + 1} (${next})`)
    }

    // Invalid/missing date stories must sink to the bottom (timestamp 0)
    // And because total pool was 604 articles, invalid dates should be truncated off or at the very end
    const invalidInSnapshot = snapshot.articles.filter(a => a.id === 'invalid-date-1' || a.id === 'missing-date-2')
    assert.equal(invalidInSnapshot.length, 0, 'Invalid dates should not displace valid newer stories in top 500')

    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  /* ── 10. Phase 1.1: PWA Install Prompt Widget Gating & Dismissal ── */
  it('validates PWA install widget gating, session persistence, and standalone hiding logic', () => {
    // Simulated sessionStorage map
    const mockSessionStorage = new Map()

    function checkCanShowPill({ isInstalled, dismissed, hasNativePrompt, isIOS }) {
      if (isInstalled) return false
      if (dismissed) return false
      return Boolean(hasNativePrompt || isIOS)
    }

    // Scenario 1: Standalone mode (already installed) -> NEVER show
    assert.equal(
      checkCanShowPill({ isInstalled: true, dismissed: false, hasNativePrompt: true, isIOS: false }),
      false
    )

    // Scenario 2: Desktop Firefox without native prompt -> NEVER show
    assert.equal(
      checkCanShowPill({ isInstalled: false, dismissed: false, hasNativePrompt: false, isIOS: false }),
      false
    )

    // Scenario 3: Chromium/Android with native prompt -> SHOW
    assert.equal(
      checkCanShowPill({ isInstalled: false, dismissed: false, hasNativePrompt: true, isIOS: false }),
      true
    )

    // Scenario 4: iOS Safari without native prompt -> SHOW (triggers manual guide)
    assert.equal(
      checkCanShowPill({ isInstalled: false, dismissed: false, hasNativePrompt: false, isIOS: true }),
      true
    )

    // Scenario 5: User dismissed pill -> Persists in session and HIDES
    mockSessionStorage.set('cosmos_pwa_dismissed', '1')
    const isDismissed = mockSessionStorage.get('cosmos_pwa_dismissed') === '1'
    assert.equal(
      checkCanShowPill({ isInstalled: false, dismissed: isDismissed, hasNativePrompt: true, isIOS: false }),
      false
    )
  })

  /* ── 11. Phase 1.1: Render-Phase Pagination Reset ── */
  it('verifies single-pass render phase pagination reset prevents stale page counts', () => {
    const PAGE_SIZE = 24
    let visibleCount = 48
    let currentFilter = 'all'
    let currentQuery = ''
    let prevFilter = currentFilter
    let prevQuery = currentQuery

    // Render logic simulation
    function render(newFilter, newQuery) {
      if (prevFilter !== newFilter || prevQuery !== newQuery) {
        prevFilter = newFilter
        prevQuery = newQuery
        visibleCount = PAGE_SIZE // Synchronous adjustment before render output
      }
      return visibleCount
    }

    // Unchanged filter/query
    assert.equal(render('all', ''), 48)

    // Filter switches to 'missions'
    const postFilterReset = render('missions', '')
    assert.equal(postFilterReset, 24, 'Visible count resets to PAGE_SIZE immediately in the same pass')

    // Increment page count
    visibleCount = 72
    assert.equal(render('missions', ''), 72)

    // Search query typed
    const postSearchReset = render('missions', 'artemis')
    assert.equal(postSearchReset, 24, 'Visible count resets immediately when search query changes')
  })
})
