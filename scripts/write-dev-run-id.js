import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const target = resolve('scripts/.dev-run-id')
const scope = `dev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, scope, 'utf8')
