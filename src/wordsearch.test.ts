import { describe, expect, it } from 'vitest'
import { makeSearch, matchWord, SIZE } from './wordsearch'
import { WORDS } from './words'

describe('ことばさがし', () => {
  it('かくした単語がマスに入っていて、順にえらぶと見つかる', () => {
    for (let n = 0; n < 30; n++) {
      const p = makeSearch(WORDS)
      expect(p.grid).toHaveLength(SIZE * SIZE)
      expect(p.placed.length).toBeGreaterThanOrEqual(2)
      for (const x of p.placed) {
        expect(x.cells.map((k) => p.grid[k]).join('')).toBe(x.word.en)
        expect(matchWord(p, x.cells)).toBe(x)
        expect(matchWord(p, [...x.cells].reverse())).toBeUndefined()
      }
    }
  })
})
