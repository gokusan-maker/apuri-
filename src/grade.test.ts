import { describe, expect, it } from 'vitest'
import { GRADES } from './grade'
import { LEVELS } from './words'

describe('学年', () => {
  it('どの学年も、ある単語帳だけを選ぶ', () => {
    for (const g of GRADES) {
      expect(g.levels.length).toBeGreaterThan(0)
      expect(g.levels.every((l) => LEVELS.includes(l))).toBe(true)
    }
  })
})
