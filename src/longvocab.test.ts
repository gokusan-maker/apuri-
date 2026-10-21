import { expect, it } from 'vitest'
import { LONG_PASSAGES } from './longreading'
import { keyWords } from './longvocab'

it('長文から熟語とむずかしめの単語を拾う', () => {
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
