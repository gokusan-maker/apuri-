import { describe, expect, it } from 'vitest'
import { nextTitle, titleFor } from './titles'

describe('称号', () => {
  it('学習した日数で称号が上がる', () => {
    expect(titleFor(0)).toBe('見習い')
    expect(titleFor(7)).toBe('がんばり屋')
    expect(titleFor(99)).toBe('単語名人')
    expect(titleFor(500)).toBe('伝説の学習者')
    expect(nextTitle(7)).toEqual({ days: 14, name: '単語ハンター' })
    expect(nextTitle(100)).toBeUndefined()
  })
})
