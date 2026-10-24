import { describe, expect, it } from 'vitest'
import { LONG_PASSAGES } from './longreading'
import { passageQs, readingBossQs, readingPoolFor } from './readingboss'
import { splitSentences } from './longreading'

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

it('文に分けるとき Mr. / Mrs. のピリオドでは切らない（空所の問題文に前の文のかけらが入らない）', () => {
  expect(splitSentences('Dear Mr. and Mrs. Green, thank you. I had fun!')).toEqual(['Dear Mr. and Mrs. Green, thank you.', 'I had fun!'])
  for (const p of LONG_PASSAGES) for (const q of passageQs(p)) if (q.blank) expect(q.word.en).not.toMatch(/は？ (Green|Smith|Brown|Tanaka),/)
})

it('ボスのヒント：前置詞などの核心をふくむくわしい解説（オーナー要望）と、○×・英問英答は根拠の1文', () => {
  for (const p of LONG_PASSAGES.slice(0, 30)) {
    for (const q of passageQs(p)) expect(q.hint?.note).toBeTruthy()
  }
  const b = LONG_PASSAGES.flatMap(passageQs).find((q) => q.blank && /^[a-z]+$/.test(q.choices[q.answer]) && q.hint!.note!.includes(q.choices[q.answer]))
  expect(b).toBeTruthy() // 答えの前置詞などもかくさずに出す
  const p = LONG_PASSAGES[0]
  const qs = passageQs(p).filter((q) => !q.blank)
  const withQuote = qs.filter((q) => q.hint?.quote)
  expect(withQuote.length).toBeGreaterThan(0)
  for (const q of withQuote) expect(p.paragraphs.some((t) => t.includes(q.hint!.quote!))).toBe(true)
})

it('ボスのヒント：○×・英問英答の9割以上に根拠の1文が出る（あいまいなときは出さない）', () => {
  const qs = LONG_PASSAGES.filter((p) => !p.titleQ && !p.paraSeq).flatMap(passageQs).filter((q) => !q.blank)
  const withQuote = qs.filter((q) => q.hint?.quote).length
  expect(withQuote / qs.length).toBeGreaterThan(0.9)
})
