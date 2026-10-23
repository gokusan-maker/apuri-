import { describe, expect, it } from 'vitest'
import { LONG_PASSAGES } from './longreading'
import { passageQs, readingBossQs, readingPoolFor } from './readingboss'

it('読解ボスの問題：読解の空所・○×・英問英答から作り、答えが選択肢の中にある', () => {
  const p = LONG_PASSAGES[0]
  const qs = passageQs(p)
  expect(qs.length).toBe(p.blanks.length + p.tf.length + (p.qa?.length ?? 0))
  for (const q of qs) {
    expect(q.choices[q.answer]).toBeDefined()
    expect(q.passage).toBe(p)
  }
  expect(qs[0].word.en).toContain(`( ${p.blanks[0].id} )`)
})

it('ボス1戦は学年に合う読解2本から最大20問', () => {
  const qs = readingBossQs('中3', () => 0)
  expect(qs.length).toBeGreaterThanOrEqual(12)
  expect(qs.length).toBeLessThanOrEqual(20)
  expect(new Set(qs.map((q) => q.passage.id)).size).toBe(2)
  expect(qs.every((q) => q.passage.level.startsWith('中3'))).toBe(true)
  expect(readingPoolFor('中1').every((p) => p.level.startsWith('中2'))).toBe(true)
  expect(readingPoolFor('熟語').length).toBeGreaterThanOrEqual(2)
})

describe('答えがわかった空所を本文にうめる', () => {
  it('うめた空所は語に、まだの空所はそのまま', async () => {
    const { filledParts } = await import('./readingboss')
    const { LONG_PASSAGES } = await import('./longreading')
    const p = LONG_PASSAGES.find((x) => x.blanks.length >= 2 && x.paragraphs.some((t) => t.includes(`( ${x.blanks[0].id} )`)))!
    const t = p.paragraphs.find((x) => x.includes(`( ${p.blanks[0].id} )`))!
    const b = p.blanks[0]
    expect(filledParts(t, p, [])).toEqual([t])
    const parts = filledParts(t, p, [b.id])
    expect(parts).toContainEqual({ id: b.id, word: b.choices[b.answer] })
    expect(parts.filter((x) => typeof x === 'string').join('')).not.toContain(`( ${b.id} )`)
  })

  it('空所の問題には記号がつく', async () => {
    const { passageQs } = await import('./readingboss')
    const { LONG_PASSAGES } = await import('./longreading')
    const qs = passageQs(LONG_PASSAGES[0])
    expect(qs.filter((q) => q.blank).length).toBe(LONG_PASSAGES[0].blanks.length)
  })
})
