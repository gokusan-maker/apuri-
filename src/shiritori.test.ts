import { describe, expect, it } from 'vitest'
import { lastLetter, makeTurn, usable } from './shiritori'
import { WORDS } from './words'

describe('英語しりとり', () => {
  const pool = WORDS.filter(usable)
  it('正解は最後の文字で始まり、ほかの3つはちがう', () => {
    const cur = pool.find((w) => w.en === 'apple')!
    for (let i = 0; i < 10; i++) {
      const t = makeTurn(cur, pool, new Set([cur.id]))!
      expect(t.choices).toHaveLength(4)
      expect(t.choices[t.answer].en[0]).toBe(lastLetter('apple'))
      expect(t.choices.filter((w) => w.en[0] === 'e')).toHaveLength(1)
    }
  })

  it('使った単語は出さず、つなげる単語がなければ null', () => {
    const cur = { id: 'x', en: 'abcx', ja: '', example: '', exampleJa: '' }
    expect(makeTurn(cur, pool, new Set())).toBeNull()
  })
})
