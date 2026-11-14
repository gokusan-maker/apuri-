import { expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'

it('高校入試の長文はどれも150語以上（空所は1語と数える）', () => {
  const short = ADV_PASSAGES.filter((p) => p.level.startsWith('高校入試')).filter((p) => p.paragraphs.join(' ').split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).length < 150)
  expect(short.map((p) => p.id)).toEqual([])
})

it('難関大の長文の「下線部の意味」は本文にあり、「語句整序」は語を並べると答えになる', () => {
  const ps = ADV_PASSAGES.filter((p) => p.underline || p.order)
  expect(ps.length).toBeGreaterThanOrEqual(4)
  for (const p of ps) {
    if (p.underline) {
      expect(p.paragraphs.join(' '), p.id).toContain(p.underline.phrase)
      expect(p.underline.choices).toHaveLength(4)
      expect(new Set(p.underline.choices).size).toBe(4)
    }
    if (p.order) {
      expect([...p.order.words].sort().join(' '), p.id).toBe(p.order.answer.split(' ').sort().join(' '))
      expect(p.paragraphs.join(' ').toLowerCase(), p.id).toContain(p.order.answer.toLowerCase())
    }
  }
})

it('読解データの各ファイルは 24MB 未満（Cloudflare Pages は1ファイル25MiBまでしか公開できない）', async () => {
  const { readFileSync, readdirSync } = await import('node:fs')
  const files = readdirSync('src').filter((f) => /^advread(ing|\d)\.ts$/.test(f))
  expect(files.length).toBeGreaterThanOrEqual(4)
  for (const f of files) expect(readFileSync(`src/${f}`).length).toBeLessThan(24_000_000)
})
