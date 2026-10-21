import { beforeEach, expect, it } from 'vitest'
import { LONG_PASSAGES, loadLongRecord, saveLongRecord, scoreLong } from './longreading'

beforeEach(() => localStorage.clear())

it('長文は3本以上で、空所が本文にあり、選択肢は4つで正解がその中にある', () => {
  expect(LONG_PASSAGES.length).toBeGreaterThanOrEqual(3)
  expect(new Set(LONG_PASSAGES.map((p) => p.id)).size).toBe(LONG_PASSAGES.length)
  for (const p of LONG_PASSAGES) {
    const text = p.paragraphs.join(' ')
    const words = text.split(/\s+/).length
    expect(words, p.id).toBeGreaterThanOrEqual(120)
    expect(p.ja).toHaveLength(p.paragraphs.length)
    for (const b of p.blanks) {
      expect(text.split(`( ${b.id} )`), `${p.id} ${b.id}`).toHaveLength(2)
      expect(b.choices).toHaveLength(4)
      expect(new Set(b.choices).size).toBe(4)
      expect(b.choices[b.answer]).toBeDefined()
    }
    expect(p.tf.length).toBeGreaterThanOrEqual(4)
    expect(p.tf.some((t) => t.answer) && p.tf.some((t) => !t.answer)).toBe(true)
  }
})

it('採点と最高点の保存', () => {
  const p = LONG_PASSAGES[0]
  const allRight = Object.fromEntries(p.blanks.map((b) => [b.id, b.answer]))
  const tfRight = Object.fromEntries(p.tf.map((t, i) => [i, t.answer]))
  expect(scoreLong(p, allRight, tfRight)).toEqual({ score: 10, total: 10 })
  expect(scoreLong(p, {}, {}).score).toBe(0)
  saveLongRecord({ [p.id]: 8 })
  expect(loadLongRecord()).toEqual({ [p.id]: 8 })
})
