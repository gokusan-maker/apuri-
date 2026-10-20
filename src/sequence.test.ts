import { describe, expect, it } from 'vitest'
import { makeSeqQ, SEQUENCES } from './sequence'

describe('順番クイズ', () => {
  it('次・前の正解が正しく、選択肢は4つで重複しない', () => {
    for (let k = 0; k < 200; k++) {
      const q = makeSeqQ()
      const seq = SEQUENCES.find((s) => s.name === q.seq)!
      const i = seq.items.indexOf(q.word)
      const n = seq.items.length
      const want = seq.items[(i + (q.dir === 'next' ? 1 : -1) + n) % n]
      expect(q.choices[q.answer]).toBe(want)
      expect(new Set(q.choices).size).toBe(4)
      if (!seq.loop) expect(q.dir === 'next' ? i < n - 1 : i > 0).toBe(true)
    }
  })

  it('日曜の次は月曜、1月の前は12月', () => {
    const days = SEQUENCES[0].items
    expect(days[(days.indexOf('Sunday') + 1) % 7]).toBe('Monday')
    const months = SEQUENCES[1].items
    expect(months[(months.indexOf('January') - 1 + 12) % 12]).toBe('December')
  })
})
