import { expect, it } from 'vitest'
import { LONG_PASSAGES } from './longreading'
import { keyWords } from './longvocab'

it('読解から熟語とむずかしめの単語を拾う', () => {
  const bee = keyWords(LONG_PASSAGES.find((p) => p.id === 'honeybees')!)
  expect(bee.length).toBeGreaterThan(0)
  for (const p of LONG_PASSAGES) {
    const ws = keyWords(p)
    expect(ws.length, p.id).toBeLessThanOrEqual(14)
    expect(new Set(ws.map((w) => w.id)).size).toBe(ws.length)
  }
  const all = LONG_PASSAGES.flatMap((p) => keyWords(p).map((w) => w.en))
  expect(all.some((e) => /\s/.test(e))).toBe(true) // 熟語もふくむ
})

it('重要語句クイズは5問で、正解の意味が選択肢にある', async () => {
  const { makeVocabQuiz, keyWords } = await import('./longvocab')
  const { LONG_PASSAGES } = await import('./longreading')
  let seed = 5
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  const qs = makeVocabQuiz(LONG_PASSAGES.slice(0, 3).flatMap((p) => keyWords(p)), rnd)
  expect(qs).toHaveLength(5)
  for (const q of qs) {
    expect(q.choices).toContain(q.w.ja)
    expect(new Set(q.choices).size).toBe(q.choices.length)
  }
  expect(makeVocabQuiz([], rnd)).toEqual([])
})
