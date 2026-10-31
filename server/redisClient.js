import { Redis } from '@upstash/redis'

let cachedRedisClient = null

/**
 * Resolves Upstash Redis credentials supporting:
 * 1. Vercel Upstash integration-generated variables:
 *    - UPSTASH_REDIS_REST_KV_REST_API_URL (REST endpoint)
 *    - UPSTASH_REDIS_REST_KV_REST_API_TOKEN (Read-write REST token)
 * 2. Vercel KV aliases:
 *    - KV_REST_API_URL / KV_REST_API_TOKEN
 * 3. Local development and manual fallback variables:
 *    - UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 *
 * Explicitly guards against using read-only tokens for write-heavy
 * operations (cache writes, atomic quota reservations, distributed locks, rate limiting).
 */
export function resolveRedisCredentials() {
  const rawUrl = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ||
                 process.env.KV_REST_API_URL ||
                 process.env.UPSTASH_REDIS_REST_URL ||
                 ''

  const rawToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ||
                   process.env.KV_REST_API_TOKEN ||
                   process.env.UPSTASH_REDIS_REST_TOKEN ||
                   ''

  const url = typeof rawUrl === 'string' ? rawUrl.trim() : ''
  const token = typeof rawToken === 'string' ? rawToken.trim() : ''

  // Identify read-only token
  const readOnlyToken = (
    process.env.UPSTASH_REDIS_REST_KV_REST_API_READ_ONLY_TOKEN ||
    process.env.KV_REST_API_READ_ONLY_TOKEN ||
    ''
  ).trim()

  const isConfiguredWithReadOnlyToken = Boolean(
    token.length > 0 &&
    readOnlyToken.length > 0 &&
    token === readOnlyToken
  )

  const isTcpUrl = Boolean(url.startsWith('redis://') || url.startsWith('rediss://'))

  let urlVar = null
  if (process.env.UPSTASH_REDIS_REST_KV_REST_API_URL) urlVar = 'UPSTASH_REDIS_REST_KV_REST_API_URL'
  else if (process.env.KV_REST_API_URL) urlVar = 'KV_REST_API_URL'
  else if (process.env.UPSTASH_REDIS_REST_URL) urlVar = 'UPSTASH_REDIS_REST_URL'

  let tokenVar = null
  if (process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN) tokenVar = 'UPSTASH_REDIS_REST_KV_REST_API_TOKEN'
  else if (process.env.KV_REST_API_TOKEN) tokenVar = 'KV_REST_API_TOKEN'
  else if (process.env.UPSTASH_REDIS_REST_TOKEN) tokenVar = 'UPSTASH_REDIS_REST_TOKEN'

  return {
    url,
    token,
    isConfigured: Boolean(url.length > 0 && token.length > 0 && !isConfiguredWithReadOnlyToken && !isTcpUrl),
    isReadOnly: isConfiguredWithReadOnlyToken,
    isTcpUrl,
    resolvedVarNames: { urlVar, tokenVar }
  }
}

export function isRedisConfigured() {
  return resolveRedisCredentials().isConfigured
}

export function getRedisClient() {
  if (cachedRedisClient) {
    return cachedRedisClient
  }

  const creds = resolveRedisCredentials()

  if (creds.isReadOnly) {
    console.warn('[Redis] Configuration warning: Read-only token detected for Upstash Redis. CosmosHub requires a write-capable token (UPSTASH_REDIS_REST_KV_REST_API_TOKEN) for quota management, summary caching, and rate limiting.')
    return null
  }

  if (creds.isTcpUrl) {
    console.warn('[Redis] Configuration warning: Native TCP Redis protocol URL detected (redis://). @upstash/redis requires the REST API HTTPS endpoint (UPSTASH_REDIS_REST_KV_REST_API_URL).')
    return null
  }

  if (!creds.isConfigured) {
    return null
  }

  try {
    cachedRedisClient = new Redis({
      url: creds.url,
      token: creds.token
    })
    return cachedRedisClient
  } catch (err) {
    console.warn('[Redis] Failed to initialize Upstash Redis client:', err.message)
    return null
  }
}

// Reset client for testing
export function _resetRedisClient(client = null) {
  cachedRedisClient = client
}
