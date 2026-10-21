import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

it('Cloudflare Pages 用の設定がある（sw.js はキャッシュしない・Node 22 でビルド）', () => {
  const headers = readFileSync('public/_headers', 'utf8')
  expect(headers).toMatch(/\/sw\.js\n\s+Cache-Control: no-cache/)
  expect(headers).toMatch(/\/assets\/\*\n\s+Cache-Control: public, max-age=31536000, immutable/)
  expect(readFileSync('.node-version', 'utf8').trim()).toBe('22')
})
