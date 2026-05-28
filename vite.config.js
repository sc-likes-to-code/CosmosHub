import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
    plugins: [react()],
    define: {
      __COSMOS_DEV_RUN_ID__: JSON.stringify(devRunId),
    },
    server: {
      proxy: {
        '/api/rss-proxy': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    }
  }
})