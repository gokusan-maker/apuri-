import { describe, expect, it } from 'vitest'
import { canScramble, isCorrectOrder, scramble, split } from './scramble'
import { WORDS } from './words'

describe('並べ替え', () => {
  it('文末の記号を分けて単語に分ける', () => {
    expect(split('Can I borrow your pen?')).toEqual({ words: ['Can', 'I', 'borrow', 'your', 'pen'], end: '?' })
    expect(split('See you tomorrow!')).toEqual({ words: ['See', 'you', 'tomorrow'], end: '!' })
  })

  it('混ぜた並びは元と違い、同じ単語がそろっている', () => {
    const w = split('I eat an apple every morning.').words
    for (let i = 0; i < 20; i++) {
      const s = scramble(w)
      expect(s.join(' ')).not.toBe(w.join(' '))
      expect([...s].sort()).toEqual([...w].sort())
    }
  })

  it('正しい順なら正解', () => {
    expect(isCorrectOrder(['I', 'like', 'it'], ['I', 'like', 'it'])).toBe(true)
    expect(isCorrectOrder(['like', 'I', 'it'], ['I', 'like', 'it'])).toBe(false)
  })

  it('単語帳の例文の多くが出題できる（3〜9語）', () => {
    expect(WORDS.filter((w) => canScramble(w.example)).length / WORDS.length).toBeGreaterThan(0.8)
  })
})
