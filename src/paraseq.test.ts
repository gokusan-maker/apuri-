import { expect, it } from 'vitest'
import { LONG_PASSAGES, paraSeqQ, scoreLong, splitSentences, totalOf, typeResults } from './longreading'

it('段落の文の並べかえ：2本以上の読解にあり、正しい順で並べると本文の段落にもどる', () => {
  const ps = LONG_PASSAGES.filter((p) => p.paraSeq)
  expect(ps.length).toBeGreaterThanOrEqual(8)
  for (const p of ps) {
    const q = paraSeqQ(p)!
    expect(splitSentences(p.paragraphs[p.paraSeq!.at])).toHaveLength(3)
    expect(q.answer.map((i) => q.events[i]).join(' ')).toBe(p.paragraphs[p.paraSeq!.at])
    expect(q.answer).not.toEqual([0, 1, 2])
    const full = scoreLong(p, {}, {}, [], { pseq: q.answer })
    expect(full.score).toBe(1)
    expect(full.total).toBe(totalOf(p))
    expect(scoreLong(p, {}, {}, [], { pseq: [0, 1, 2] }).score).toBe(0)
    expect(typeResults(p, { blanks: {}, tf: {}, picks: [], pseq: q.answer }).pseq).toEqual([1, 1])
  }
})
