#!/usr/bin/env node

/**
 * CosmosHub — Git Commit Orchestration for Scheduled Archives
 *
 * Requirements:
 * - Each changed Markdown archive file gets its own separate commit.
 * - The persistent index gets a separate commit.
 * - Stage only the exact intended files (no `git add .`).
 * - No empty or fake commits.
 */

import { execSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'

function runGit(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function getChangedFiles() {
  try {
    const status = runGit('git status --porcelain')
    if (!status) return []
    return status
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        // Status format: "XY path/to/file" or "XY path -> path"
        const parts = line.split(/\s+/)
        const statusCode = parts[0]
        const filePath = parts.slice(1).join(' ').replace(/^["']|["']$/g, '')
        return { statusCode, filePath }
      })
  } catch (err) {
    console.error('Failed to get git status:', err.message)
    return []
  }
}

function determineCollectionFromArchive(filePath) {
  try {
    if (!existsSync(filePath)) return 'daily'
    const content = readFileSync(filePath, 'utf8')
    const headers = [...content.matchAll(/##\s+(Morning|Evening)\s+Collection/gi)]
    if (headers.length > 0) {
      const lastHeader = headers[headers.length - 1][1].toLowerCase()
      return lastHeader // 'morning' | 'evening'
    }
    return 'daily'
  } catch {
    return 'daily'
  }
}

export function commitArchiveChanges() {
  const changed = getChangedFiles()
  if (changed.length === 0) {
    console.log('✓ Working directory clean. No files to commit.')
    return []
  }

  const archiveFiles = changed.filter(f => f.filePath.startsWith('news-archive/') && f.filePath.endsWith('.md'))
  const dataFiles = changed.filter(f => f.filePath === 'data/news-index.json' || f.filePath === 'data/latest-news.json')

  const commitsCreated = []

  // 1. Commit each changed Markdown archive file separately
  for (const item of archiveFiles) {
    const dateMatch = item.filePath.match(/(\d{4}-\d{2}-\d{2})\.md$/)
    const dateStr = dateMatch ? dateMatch[1] : 'latest'
    const collection = determineCollectionFromArchive(item.filePath)

    const commitMsg = `docs(archive): add ${collection} CosmosHub collection for ${dateStr}`
    try {
      runGit(`git add "${item.filePath}"`)
      runGit(`git commit -m "${commitMsg}"`)
      console.log(`✓ Committed archive: "${commitMsg}" (${item.filePath})`)
      commitsCreated.push({ type: 'archive', file: item.filePath, message: commitMsg })
    } catch (err) {
      console.error(`Failed to commit ${item.filePath}:`, err.message)
      throw err
    }
  }

  // 2. Commit persistent data index separately
  if (dataFiles.length > 0) {
    const nowIST = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date())

    const commitMsg = `chore(data): update persistent news index for ${nowIST}`
    try {
      for (const d of dataFiles) {
        runGit(`git add "${d.filePath}"`)
      }
      runGit(`git commit -m "${commitMsg}"`)
      console.log(`✓ Committed index: "${commitMsg}" (${dataFiles.map(d => d.filePath).join(', ')})`)
      commitsCreated.push({ type: 'data', files: dataFiles.map(d => d.filePath), message: commitMsg })
    } catch (err) {
      console.error('Failed to commit index changes:', err.message)
      throw err
    }
  }

  if (commitsCreated.length === 0) {
    console.log('ℹ No archive or index files were modified. 0 commits created.')
  } else {
    console.log(`🎉 Total commits created: ${commitsCreated.length}`)
  }

  return commitsCreated
}

if (process.argv[1] && process.argv[1].endsWith('commit-archive.js')) {
  try {
    commitArchiveChanges()
  } catch (err) {
    console.error('💥 Commit script failed:', err.message)
    process.exit(1)
  }
}
