import { describe, expect, it } from 'vitest'
import { claimFeatured, FEATURED_POOL, featuredClaimed, featuredFor } from './featured'

describe('今日のおすすめクイズ', () => {
  it('日付で決まり、同じ日は同じ', () => {
    expect(featuredFor('2026-10-20')).toBe(featuredFor('2026-10-20'))
    expect(FEATURED_POOL).toContain(featuredFor('2026-10-21'))
    const days = Array.from({ length: 30 }, (_, i) => featuredFor(`2026-11-${String(i + 1).padStart(2, '0')}`))
    expect(new Set(days).size).toBeGreaterThan(3)
  })
  it('1日1回だけ', () => {
    localStorage.clear()
    expect(featuredClaimed('2026-10-20')).toBe(false)
    claimFeatured('2026-10-20')
    expect(featuredClaimed('2026-10-20')).toBe(true)
    expect(featuredClaimed('2026-10-21')).toBe(false)
  })
})

it('おすすめの候補に新しいパズルも入る', () => {
  for (const id of ['abc', 'opposite', 'odd', 'emoji-rev', 'count', 'clock', 'color', 'alphabet']) expect(FEATURED_POOL).toContain(id)
})
