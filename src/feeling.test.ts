import { describe, expect, it } from 'vitest'
import { feelingFor } from './feeling'

describe('相棒のごきげん', () => {
  it('今日の学習数でごきげんが上がる', () => {
    expect(feelingFor(0).text).toContain('ねむそう')
    expect(feelingFor(5).text).toBe('ふつう')
    expect(feelingFor(10).text).toBe('ごきげん')
    expect(feelingFor(25).icon).toBe('🤩')
  })

  it('夜おそく（22時〜朝5時）は寝ようと言う', () => {
    expect(feelingFor(30, 23).icon).toBe('🌙')
    expect(feelingFor(0, 2).text).toContain('寝よう')
    expect(feelingFor(0, 5).icon).toBe('😪')
    expect(feelingFor(10, 21).text).toBe('ごきげん')
  })
})
