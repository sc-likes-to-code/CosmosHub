#!/usr/bin/env node

/**
 * CosmosHub — Scheduled RSS News Ingestion & Archival Pipeline
 *
 * Runs twice daily (9:00 AM IST & 9:00 PM IST) via GitHub Actions.
 * Reuses existing RSS sources, normalization, validation, and deduplication.
 * Maintains persistent article index and permanent Markdown archives.
 */

import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync, copyFileSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
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

/* ── CLI Arguments ── */
function parseArgs() {
  const args = process.argv.slice(2)
  const options = {
    collection: 'auto', // 'auto' | 'morning' | 'evening'
    date: null,         // 'YYYY-MM-DD'
    dryRun: false,
    summaryFile: null,
    concurrency: 4,
    timeoutMs: 10000,
    maxPerSource: parseInt(process.env.VITE_RSS_MAX_PER_SOURCE, 10) || 50
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--collection' && args[i + 1]) {
      options.collection = args[++i].toLowerCase()
    } else if (arg === '--date' && args[i + 1]) {
      options.date = args[++i]
    } else if (arg === '--summary-file' && args[i + 1]) {
      options.summaryFile = args[++i]
    } else if (arg === '--concurrency' && args[i + 1]) {
      options.concurrency = parseInt(args[++i], 10) || 4
    } else if (arg === '--timeout' && args[i + 1]) {
      options.timeoutMs = parseInt(args[++i], 10) || 10000
    } else if (arg === '--max-per-source' && args[i + 1]) {
      options.maxPerSource = parseInt(args[++i], 10) || 50
    }
  }

  return options
}

/* ── Asia/Kolkata Timezone Helpers ── */
export function getNowIST(dateOverride = null, collectionType = 'auto', baseDateInput = null) {
  let baseDate
  if (dateOverride) {
    baseDate = new Date(`${dateOverride}T12:00:00+05:30`)
  } else if (baseDateInput instanceof Date) {
    baseDate = baseDateInput
  } else {
    baseDate = new Date()
  }

  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  const parts = formatter.formatToParts(baseDate)
  const map = {}
  for (const p of parts) map[p.type] = p.value

  const hour = parseInt(map.hour, 10)

  // Handle midnight boundary delay for evening collections:
  // If an evening collection (scheduled at 21:00 IST) starts late between 00:00 and 05:00 IST,
  // attribute it to the preceding calendar day in IST.
  if (!dateOverride && collectionType === 'evening' && hour >= 0 && hour < 5) {
    const yesterday = new Date(baseDate.getTime() - 24 * 60 * 60 * 1000)
    const prevParts = formatter.formatToParts(yesterday)
    const prevMap = {}
    for (const p of prevParts) prevMap[p.type] = p.value
    map.year = prevMap.year
    map.month = prevMap.month
    map.day = prevMap.day
  }

  const dateStr = dateOverride || `${map.year}-${map.month}-${map.day}`
  const timeStr = `${map.hour}:${map.minute}:${map.second}`

  return {
    date: baseDate,
    dateStr,
    timeStr,
    hour,
    year: map.year,
    month: map.month,
    isoIST: `${dateStr} ${timeStr} IST`
  }
}

export function determineCollection(collectionOpt, hour) {
  if (collectionOpt === 'morning' || collectionOpt === 'evening') {
    return {
      type: collectionOpt,
      label: collectionOpt === 'morning' ? 'Morning Collection — 9:00 AM IST' : 'Evening Collection — 9:00 PM IST',
      isManual: true
    }
  }

  // Auto detection based on current IST hour
  // Morning: 04:00 - 16:59 IST
  // Evening: 17:00 - 03:59 IST
  if (hour >= 4 && hour < 17) {
    return {
      type: 'morning',
      label: 'Morning Collection — 9:00 AM IST',
      isManual: false
    }
  }

  return {
    type: 'evening',
    label: 'Evening Collection — 9:00 PM IST',
    isManual: false
  }
}

/* ── Bounded Concurrency Fetcher ── */
async function fetchWithTimeout(url, timeoutMs, headers = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CosmosHub/2.0 (Scheduled RSS Ingestion Pipeline; +https://cosmos-hub-sc.vercel.app)',
        'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        ...headers
      }
    })
    clearTimeout(timer)
    return res
  } catch (err) {
    clearTimeout(timer)
    throw err
  }
}

async function fetchAllSources(sources, concurrency, timeoutMs, etags = {}) {
  const results = []
  let cursor = 0

  async function worker() {
    while (cursor < sources.length) {
      const idx = cursor++
      const source = sources[idx]
      const customHeaders = {}
      if (etags[source.url]) {
        customHeaders['If-None-Match'] = etags[source.url]
      }

      try {
        const res = await fetchWithTimeout(source.url, timeoutMs, customHeaders)
        if (res.status === 304) {
          results[idx] = { status: 'not_modified', source }
          continue
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const newEtag = res.headers.get('etag')
        const contents = await res.text()
        results[idx] = {
          status: 'success',
          source,
          contents,
          etag: newEtag
        }
      } catch (err) {
        results[idx] = {
          status: 'failed',
          source,
          error: err.name === 'AbortError' ? 'Request timed out after 10s' : err.message
        }
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, sources.length) }, () => worker())
  await Promise.all(workers)
  return results
}

/* ── Persistent Index Management ── */
export function loadIndex(indexPath) {
  if (!existsSync(indexPath)) {
    return {
      version: 1,
      lastUpdated: null,
      lastRunId: null,
      stats: { totalStories: 0, lastRunAdded: 0 },
      etags: {},
      articles: {}
    }
  }

  const raw = readFileSync(indexPath, 'utf8').trim()
  if (!raw) {
    return {
      version: 1,
      lastUpdated: null,
      lastRunId: null,
      stats: { totalStories: 0, lastRunAdded: 0 },
      etags: {},
      articles: {}
    }
  }

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || typeof parsed.articles !== 'object') {
      throw new Error('Index JSON structure invalid: missing articles object')
    }
    if (!parsed.etags) parsed.etags = {}
    return parsed
  } catch (err) {
    throw new Error(`Corrupt persistent index file at ${indexPath}: ${err.message}`)
  }
}

export function saveIndexAtomic(indexPath, indexData) {
  mkdirSync(dirname(indexPath), { recursive: true })
  const tmpPath = `${indexPath}.tmp.${Date.now()}`
  writeFileSync(tmpPath, JSON.stringify(indexData, null, 2) + '\n', 'utf8')
  renameSync(tmpPath, indexPath)
}

/* ── Markdown Archive Management ── */
export function escapeMarkdown(str) {
  if (!str) return ''
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .trim()
}

export function updateArchiveFile(archivePath, dateStr, collectionLabel, collectionType, articlesToArchive) {
  mkdirSync(dirname(archivePath), { recursive: true })

  let currentContent = ''
  if (existsSync(archivePath)) {
    currentContent = readFileSync(archivePath, 'utf8')
  } else {
    currentContent = `# CosmosHub News Archive — ${dateStr}\n\n> Timezone: Asia/Kolkata\n`
  }

  const categoryOrder = [
    'Astronomy & Astrophysics',
    'Missions & Exploration',
    'Space Industry & Policy',
    'Research & Science',
    'Other Space Transmissions'
  ]

  const sectionHeaderRegex = new RegExp(`(##\\s+${collectionLabel.replace(/[—–-]/g, '[—–-]')}[\\s\\S]*?)(?=(?:\\n## |$))`, 'i')
  const sectionMatch = currentContent.match(sectionHeaderRegex)

  if (!sectionMatch) {
    let sectionMarkdown = `## ${collectionLabel}\n\n`
    if (articlesToArchive.length === 0) {
      sectionMarkdown += `_No new articles were archived during this collection._\n`
    } else {
      const byCategory = {}
      for (const cat of categoryOrder) byCategory[cat] = []
      for (const item of articlesToArchive) {
        const cat = item.category || 'Other Space Transmissions'
        if (!byCategory[cat]) byCategory[cat] = []
        byCategory[cat].push(item)
      }
      for (const cat of categoryOrder) {
        const items = byCategory[cat]
        if (!items || items.length === 0) continue
        sectionMarkdown += `### ${cat}\n`
        for (const a of items) {
          const headline = a.title.replace(/\s+/g, ' ').trim()
          const pubText = formatDateIST(a.pubDate)
          const safeUrl = a.canonicalUrl || a.link
          sectionMarkdown += `- **${headline}**\n`
          sectionMarkdown += `  - Source: ${a.source.name}\n`
          sectionMarkdown += `  - Published: ${pubText}\n`
          sectionMarkdown += `  - URL: ${safeUrl}\n`
        }
        sectionMarkdown += `\n`
      }
    }
    const updatedContent = currentContent.trimEnd() + '\n\n' + sectionMarkdown.trim() + '\n'
    const tmpPath = `${archivePath}.tmp.${Date.now()}`
    writeFileSync(tmpPath, updatedContent, 'utf8')
    renameSync(tmpPath, archivePath)
    return { filePath: archivePath, bytesWritten: Buffer.byteLength(updatedContent, 'utf8') }
  }

  // Section already exists
  if (articlesToArchive.length === 0) {
    return { filePath: archivePath, bytesWritten: Buffer.byteLength(currentContent, 'utf8') }
  }

  let existingSection = sectionMatch[1].trim()
  existingSection = existingSection.replace(/_No new articles were archived during this collection\._/gi, '').trim()

  const existingUrls = new Set(
    [...existingSection.matchAll(/-\s+URL:\s*([^\s]+)/gi)].map(m => canonicalizeUrl(m[1]))
  )

  const toAdd = articlesToArchive.filter(a => !existingUrls.has(canonicalizeUrl(a.canonicalUrl || a.link)))
  if (toAdd.length === 0) {
    return { filePath: archivePath, bytesWritten: Buffer.byteLength(currentContent, 'utf8') }
  }

  const byCategory = {}
  for (const cat of categoryOrder) byCategory[cat] = []
  for (const item of toAdd) {
    const cat = item.category || 'Other Space Transmissions'
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(item)
  }

  let newSection = existingSection
  for (const cat of categoryOrder) {
    const items = byCategory[cat]
    if (!items || items.length === 0) continue

    let itemsMarkdown = ''
    for (const a of items) {
      const headline = a.title.replace(/\s+/g, ' ').trim()
      const pubText = formatDateIST(a.pubDate)
      const safeUrl = a.canonicalUrl || a.link
      itemsMarkdown += `- **${headline}**\n`
      itemsMarkdown += `  - Source: ${a.source.name}\n`
      itemsMarkdown += `  - Published: ${pubText}\n`
      itemsMarkdown += `  - URL: ${safeUrl}\n`
    }

    const catHeaderRegex = new RegExp(`(###\\s+${cat.replace(/[—–-]/g, '[—–-]')}[\\s\\S]*?)(?=(?:\\n### |\\n## |$))`, 'i')
    const catMatch = newSection.match(catHeaderRegex)
    if (catMatch) {
      const updatedCatBlock = catMatch[1].trimEnd() + '\n' + itemsMarkdown
      newSection = newSection.replace(catMatch[1], updatedCatBlock)
    } else {
      newSection = newSection.trimEnd() + '\n\n### ' + cat + '\n' + itemsMarkdown
    }
  }

  const updatedContent = currentContent.replace(sectionMatch[1], newSection.trim() + '\n')
  const tmpPath = `${archivePath}.tmp.${Date.now()}`
  writeFileSync(tmpPath, updatedContent, 'utf8')
  try {
    renameSync(tmpPath, archivePath)
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EBUSY') {
      copyFileSync(tmpPath, archivePath)
      try { unlinkSync(tmpPath) } catch {}
    } else {
      throw err
    }
  }

  return {
    filePath: archivePath,
    bytesWritten: Buffer.byteLength(updatedContent, 'utf8')
  }
}

/* ── Snapshot Management ── */
export function saveSnapshotAtomic(snapshotPath, articles, generatedAt) {
  mkdirSync(dirname(snapshotPath), { recursive: true })

  // Sort articles newest-first before applying 500-article slice.
  // Invalid/missing timestamps return 0 and are sorted to the end.
  const sorted = [...articles].sort((a, b) => {
    const da = toTimestampIST(a.pubDate)
    const db = toTimestampIST(b.pubDate)
    if (db !== da) return db - da
    const titleDiff = String(a.title || '').localeCompare(String(b.title || ''))
    if (titleDiff !== 0) return titleDiff
    return String(a.canonicalUrl || a.link || a.id || '').localeCompare(String(b.canonicalUrl || b.link || b.id || ''))
  })

  const sliced = sorted.slice(0, 500)
  const snapshotData = {
    version: 1,
    generatedAt,
    count: sliced.length,
    articles: sliced.map(a => ({
      id: a.articleId || a.id,
      title: a.title,
      link: a.canonicalUrl || a.link,
      desc: a.desc,
      pubDate: a.pubDate,
      category: a.category,
      source: {
        name: a.source?.name || a.source,
        key: a.source?.key,
        badgeClass: a.source?.badgeClass,
        cardClass: a.source?.cardClass,
        tags: a.source?.tags
      }
    }))
  }
  const tmpPath = `${snapshotPath}.tmp.${Date.now()}`
  writeFileSync(tmpPath, JSON.stringify(snapshotData, null, 2) + '\n', 'utf8')
  try {
    renameSync(tmpPath, snapshotPath)
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EBUSY') {
      copyFileSync(tmpPath, snapshotPath)
      try { unlinkSync(tmpPath) } catch {}
    } else {
      throw err
    }
  }
}

/* ── Main Ingestion Runner ── */
export async function runIngestion(cliOptions = {}) {
  const startTime = Date.now()
  const runId = `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const collectionTypeInput = cliOptions.collection || 'auto'
  const nowIST = getNowIST(cliOptions.date, collectionTypeInput)
  const collection = determineCollection(collectionTypeInput, nowIST.hour)

  console.log(`🌌 CosmosHub Ingestion Pipeline — [${runId}]`)
  console.log(`📅 Execution Date: ${nowIST.isoIST}`)
  console.log(`📦 Collection: ${collection.label} (${collection.type}${collection.isManual ? ' [manual]' : ''})`)
  if (cliOptions.dryRun) console.log('⚠️ Running in DRY RUN mode (no changes will be written to disk)')

  // 1. Load persistent index
  const indexPath = resolve(process.cwd(), 'data/news-index.json')
  const index = loadIndex(indexPath)

  // 2. Fetch all RSS feeds
  console.log(`📡 Fetching ${RSS_SOURCES.length} configured space news feeds...`)
  const fetchResults = await fetchAllSources(
    RSS_SOURCES,
    cliOptions.concurrency || 4,
    cliOptions.timeoutMs || 10000,
    index.etags || {}
  )

  const feedWarnings = []
  let feedsSucceeded = 0
  let feedsFailed = 0
  let rawArticles = []
  let ingestOrder = 0

  for (const res of fetchResults) {
    if (res.status === 'success') {
      feedsSucceeded++
      if (res.etag) index.etags[res.source.url] = res.etag
      const parsed = parseRSS(res.contents, res.source, cliOptions.maxPerSource || 50)
      for (const a of parsed) {
        rawArticles.push({ ...a, ingestOrder: ingestOrder++ })
      }
    } else if (res.status === 'not_modified') {
      feedsSucceeded++
    } else {
      feedsFailed++
      feedWarnings.push(`${res.source.name}: ${res.error}`)
      console.warn(`  ⚠️ Warning: Failed to fetch feed [${res.source.name}]: ${res.error}`)
    }
  }

  console.log(`✓ Feeds response: ${feedsSucceeded} ok, ${feedsFailed} failed. Articles fetched: ${rawArticles.length}`)

  // 3. Normalize, validate & compute identities
  let malformedCount = 0
  const validatedArticles = []

  for (const raw of rawArticles) {
    const val = validateArticle(raw)
    if (!val.valid) {
      malformedCount++
      continue
    }

    const canonicalUrl = canonicalizeUrl(raw.link)
    const articleId = generateArticleId({ ...raw, link: canonicalUrl })
    const category = categorizeArticle(raw)

    validatedArticles.push({
      ...raw,
      canonicalUrl,
      articleId,
      category,
      pubDateValid: val.pubDateValid
    })
  }

  // 4. Deduplicate articles within current batch
  const initialBatchCount = validatedArticles.length
  const dedupedBatch = dedupeArticles(validatedArticles)
  const duplicatesInRun = initialBatchCount - dedupedBatch.length

  // 5. Deduplicate against persistent index
  const newStories = []
  let alreadyInIndexCount = 0

  for (const candidate of dedupedBatch) {
    if (index.articles[candidate.articleId]) {
      alreadyInIndexCount++
      continue
    }
    newStories.push(candidate)
  }

  // 6. Sort accepted new stories deterministically (newest first by IST timestamp)
  newStories.sort((a, b) => {
    const da = toTimestampIST(a.pubDate)
    const db = toTimestampIST(b.pubDate)
    if (db !== da) return db - da
    return a.title.localeCompare(b.title)
  })

  console.log(`✓ Validation: ${validatedArticles.length} accepted, ${malformedCount} malformed.`)
  console.log(`✓ Deduplication: ${duplicatesInRun} internal duplicates, ${alreadyInIndexCount} already in index.`)
  console.log(`⭐ Newly accepted stories for archive: ${newStories.length}`)

  // 7. Write Markdown archive and update persistent index
  const archivePath = resolve(process.cwd(), `news-archive/${nowIST.year}/${nowIST.month}/${nowIST.dateStr}.md`)
  const snapshotPath = resolve(process.cwd(), 'data/latest-news.json')

  let archiveResult = null
  let indexChanged = false

  if (!cliOptions.dryRun) {
    // Update daily Markdown archive
    archiveResult = updateArchiveFile(
      archivePath,
      nowIST.dateStr,
      collection.label,
      collection.type,
      newStories
    )
    console.log(`📝 Archive updated: ${archivePath}`)

    // Update persistent index only AFTER archive update succeeds
    if (newStories.length > 0 || !index.lastUpdated) {
      for (const story of newStories) {
        index.articles[story.articleId] = {
          id: story.articleId,
          canonicalUrl: story.canonicalUrl,
          title: story.title,
          source: story.source.name,
          sourceKey: story.source.key,
          category: story.category,
          pubDate: story.pubDate,
          archivedDate: nowIST.dateStr,
          collection: collection.type,
          archivedAt: new Date().toISOString()
        }
      }

      index.lastUpdated = new Date().toISOString()
      index.lastRunId = runId
      index.stats.totalStories = Object.keys(index.articles).length
      index.stats.lastRunAdded = newStories.length

      saveIndexAtomic(indexPath, index)
      indexChanged = true
      console.log(`💾 Persistent index updated: ${indexPath} (Total indexed: ${index.stats.totalStories})`)
    }

    // Update latest news snapshot for web client fallback only when new stories were found or snapshot missing
    if (newStories.length > 0 || !existsSync(snapshotPath)) {
      let priorSnapshotArticles = []
      if (existsSync(snapshotPath)) {
        try {
          const prior = JSON.parse(readFileSync(snapshotPath, 'utf8'))
          if (Array.isArray(prior.articles)) {
            priorSnapshotArticles = prior.articles
          }
        } catch {}
      }
      const allKnownArticles = [...newStories, ...dedupedBatch, ...priorSnapshotArticles]
      const uniqueSnapshotPool = dedupeArticles(allKnownArticles)
      saveSnapshotAtomic(snapshotPath, uniqueSnapshotPool, new Date().toISOString())
      console.log(`📦 Web client snapshot saved: ${snapshotPath} (${Math.min(uniqueSnapshotPool.length, 500)} articles)`)
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2)

  const report = {
    runId,
    executionTimeIST: nowIST.isoIST,
    collectionType: collection.type,
    collectionLabel: collection.label,
    isManual: collection.isManual,
    feedsConfigured: RSS_SOURCES.length,
    feedsSucceeded,
    feedsFailed,
    feedWarnings,
    articlesFetched: rawArticles.length,
    articlesAccepted: validatedArticles.length,
    duplicatesInRun,
    alreadyInIndexCount,
    newStoriesArchived: newStories.length,
    malformedCount,
    archivePath,
    indexChanged,
    durationSec,
    dryRun: Boolean(cliOptions.dryRun)
  }

  // 8. Output GitHub Actions step summary if requested
  if (cliOptions.summaryFile) {
    writeStepSummary(cliOptions.summaryFile, report)
  }

  printRunSummary(report)
  return report
}

function printRunSummary(report) {
  console.log('\n========================================')
  console.log('📊 COSMOSHUB INGESTION RUN SUMMARY')
  console.log('========================================')
  console.log(`Run ID:            ${report.runId}`)
  console.log(`IST Time:          ${report.executionTimeIST}`)
  console.log(`Collection:        ${report.collectionLabel}`)
  console.log(`Feeds:             ${report.feedsSucceeded} succeeded, ${report.feedsFailed} failed`)
  console.log(`Articles Fetched:  ${report.articlesFetched}`)
  console.log(`Accepted:          ${report.articlesAccepted} (malformed: ${report.malformedCount})`)
  console.log(`Deduplication:     ${report.duplicatesInRun} internal dups, ${report.alreadyInIndexCount} already indexed`)
  console.log(`Archived:          ${report.newStoriesArchived} new stories`)
  console.log(`Index Changed:     ${report.indexChanged}`)
  console.log(`Execution Time:    ${report.durationSec}s`)
  if (report.feedWarnings.length) {
    console.log('\nWarnings:')
    report.feedWarnings.forEach(w => console.log(`  - ${w}`))
  }
  console.log('========================================\n')
}

function writeStepSummary(filePath, r) {
  try {
    const md = `
## 🌌 CosmosHub News Ingestion Run Summary

| Metric | Value |
| :--- | :--- |
| **Run ID** | \`${r.runId}\` |
| **Local IST Time** | ${r.executionTimeIST} |
| **Collection Type** | ${r.collectionLabel} |
| **Configured Feeds** | ${r.feedsConfigured} |
| **Feeds Succeeded** | ${r.feedsSucceeded} |
| **Feeds Failed** | ${r.feedsFailed} |
| **Articles Fetched** | ${r.articlesFetched} |
| **Validated & Accepted** | ${r.articlesAccepted} |
| **Duplicates in Run** | ${r.duplicatesInRun} |
| **Already Indexed** | ${r.alreadyInIndexCount} |
| **Newly Archived Stories** | **${r.newStoriesArchived}** |
| **Malformed Entries** | ${r.malformedCount} |
| **Archive File** | \`${r.archivePath}\` |
| **Index Changed** | \`${r.indexChanged}\` |
| **Execution Duration** | ${r.durationSec}s |

${r.feedWarnings.length > 0 ? `### ⚠️ Feed Warnings (${r.feedWarnings.length})\n` + r.feedWarnings.map(w => `- ${w}`).join('\n') : '✅ *All configured feeds fetched successfully.*'}
`
    writeFileSync(filePath, md, { flag: 'a', encoding: 'utf8' })
  } catch (err) {
    console.error('Failed to write GitHub step summary:', err.message)
  }
}

/* ── Auto-execute when run as script ── */
if (process.argv[1] && process.argv[1].endsWith('ingest.js')) {
  const options = parseArgs()
  runIngestion(options).catch(err => {
    console.error('💥 Fatal ingestion error:', err)
    process.exit(1)
  })
}
