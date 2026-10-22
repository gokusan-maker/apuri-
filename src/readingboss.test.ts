import { expect, it } from 'vitest'
import { LONG_PASSAGES } from './longreading'
import { passageQs, readingBossQs, readingPoolFor } from './readingboss'

it('読解ボスの問題：長文の空所・○×・英問英答から作り、答えが選択肢の中にある', () => {
  const p = LONG_PASSAGES[0]
  const qs = passageQs(p)
  expect(qs.length).toBe(p.blanks.length + p.tf.length + (p.qa?.length ?? 0))
  for (const q of qs) {
    expect(q.choices[q.answer]).toBeDefined()
    expect(q.passage).toBe(p)
  }
  expect(qs[0].word.en).toContain(`( ${p.blanks[0].id} )`)
})

it('ボス1戦は学年に合う長文2本から最大20問', () => {
  const qs = readingBossQs('中3', () => 0)
  expect(qs.length).toBeGreaterThanOrEqual(12)
  expect(qs.length).toBeLessThanOrEqual(20)
  expect(new Set(qs.map((q) => q.passage.id)).size).toBe(2)
  expect(qs.every((q) => q.passage.level.startsWith('中3'))).toBe(true)
  expect(readingPoolFor('中1').every((p) => p.level.startsWith('中2'))).toBe(true)
  expect(readingPoolFor('熟語').length).toBeGreaterThanOrEqual(2)
})
