import { beforeEach, expect, it } from 'vitest'
import { LONG_PASSAGES, loadLongRecord, saveLongRecord, scoreLong } from './longreading'

beforeEach(() => localStorage.clear())

it('長文は3本以上で、空所が本文にあり、選択肢は4つで正解がその中にある', () => {
  expect(LONG_PASSAGES.length).toBeGreaterThanOrEqual(9)
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
    if (p.pick2) {
      expect(p.pick2.statements).toHaveLength(6)
      expect(new Set(p.pick2.answers).size).toBe(2)
    }
  }
  expect(LONG_PASSAGES.filter((p) => p.pick2).length).toBeGreaterThanOrEqual(2)
})

it('採点と最高点の保存', () => {
  const p = LONG_PASSAGES[0]
  const allRight = Object.fromEntries(p.blanks.map((b) => [b.id, b.answer]))
  const tfRight = Object.fromEntries(p.tf.map((t, i) => [i, t.answer]))
  expect(scoreLong(p, allRight, tfRight, p.pick2!.answers)).toEqual({ score: 12, total: 12 })
  expect(scoreLong(p, allRight, tfRight, [p.pick2!.answers[0], 5]).score).toBe(11)
  expect(scoreLong(p, {}, {}).score).toBe(0)
  saveLongRecord({ [p.id]: 8 })
  expect(loadLongRecord()).toEqual({ [p.id]: 8 })
})

it('下線部の語句は本文にあり、並べかえの語は正解の文と同じ語でできている', () => {
  const withExtra = LONG_PASSAGES.filter((p) => p.underline || p.order)
  expect(withExtra.length).toBeGreaterThanOrEqual(2)
  for (const p of withExtra) {
    if (p.underline) {
      expect(p.paragraphs.join(' '), p.id).toContain(p.underline.phrase)
      expect(p.underline.choices).toHaveLength(4)
    }
    if (p.order) expect([...p.order.words].sort().join(' ')).toBe(p.order.answer.split(' ').sort().join(' '))
  }
  const p = LONG_PASSAGES.find((x) => x.id === 'no-phone-trip')!
  expect(scoreLong(p, {}, {}, [], { underline: p.underline!.answer, order: p.order!.answer }).score).toBe(2)
})

it('まちがえた問題の根拠の段落がわかる', async () => {
  const { evidenceParas } = await import('./longreading')
  const p = LONG_PASSAGES.find((x) => x.id === 'library-cat')!
  expect(evidenceParas(p, ['A', 'D'], [])).toEqual([0, 1])
  expect(evidenceParas(p, [], [0])).toEqual([0]) // 「第1段落に…」
  expect(evidenceParas(p, [], [])).toEqual([])
  const q = LONG_PASSAGES.find((x) => x.id === 'no-phone-trip')!
  expect(evidenceParas(q, [], [], true)).toEqual([3])
})
