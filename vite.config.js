import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function readDevRunId() {
  try {
    return readFileSync(resolve(process.cwd(), 'scripts/.dev-run-id'), 'utf8').trim()
  } catch {
    return ''
  }
}

export default defineConfig(({ command }) => {
  const devRunId = command === 'serve' ? readDevRunId() : ''

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        includeAssets: [
          'favicon.ico',
          'favicon.svg',
          'favicon-32x32.png',
          'favicon-16x16.png',
          'apple-touch-icon.png',
          'logo.svg',
          'logo-mark.svg',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
        ],
        manifest: {
          name: 'CosmosHub — Global Space Intelligence Platform',
          short_name: 'CosmosHub',
          description: 'Verified intelligent space news aggregator covering NASA, ISRO, ESA, JAXA, and planetary exploration.',
          theme_color: '#04080f',
          background_color: '#04080f',
          display: 'standalone',
          display_override: ['standalone', 'window-controls-overlay', 'minimal-ui'],
          orientation: 'any',
          scope: '/',
          start_url: '/',
          lang: 'en',
          categories: ['news', 'science', 'education'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/logo.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
          shortcuts: [
            {
              name: 'Space Transmissions',
              short_name: 'Feed',
              description: 'Latest verified space agency news',
              url: '/',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Active Missions',
              short_name: 'Missions',
              description: 'Global space mission tracker',
              url: '/missions',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: {
                  maxEntries: 16,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /\/api\/rss-proxy.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'rss-feeds-cache',
                networkTimeoutSeconds: 5,
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24, // 24 hours
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
    ],
    define: {
      __COSMOS_DEV_RUN_ID__: JSON.stringify(devRunId),
    },
    server: {
      proxy: {
        '/api/rss-proxy': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  }
})
