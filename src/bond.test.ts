import { describe, expect, it } from 'vitest'
import { bondHearts, bondLevel, daysToNext } from './bond'

describe('なつき度', () => {
  it('学習した日数でふえる', () => {
    expect([0, 1, 2, 3, 7, 13, 14, 30, 100].map(bondLevel)).toEqual([0, 1, 1, 2, 3, 3, 4, 5, 5])
    expect(bondHearts(2)).toBe('❤️❤️🤍🤍🤍')
    expect(daysToNext(5)).toBe(2)
    expect(daysToNext(30)).toBeNull()
  })
})
