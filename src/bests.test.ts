import { describe, expect, it } from 'vitest'
import { loadLowBest, recordLowBest } from './bests'

describe('小さいほどよい自己ベスト', () => {
  it('少ないときだけ更新', () => {
    localStorage.clear()
    expect(loadLowBest('k')).toBeNull()
    expect(recordLowBest('k', 10)).toBe(true)
    expect(recordLowBest('k', 12)).toBe(false)
    expect(recordLowBest('k', 8)).toBe(true)
    expect(loadLowBest('k')).toBe(8)
  })
})
