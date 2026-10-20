import { describe, expect, it } from 'vitest'
import { makePlacement, PER_LEVEL, recommend } from './placement'

describe('レベル診断', () => {
  it('4レベル×4問', () => {
    const qs = makePlacement()
    expect(qs).toHaveLength(4 * PER_LEVEL)
    expect(qs[0].level).toBe('中1')
  })
  it('できたレベルの次をすすめる', () => {
    expect(recommend({})).toBe('中1')
    expect(recommend({ 中1: 4 })).toBe('中2')
    expect(recommend({ 中1: 4, 中2: 3, 中3: 1 })).toBe('中3')
    expect(recommend({ 中1: 4, 中2: 4, 中3: 4, 高校基礎: 4 })).toBe('高校基礎')
  })
})
