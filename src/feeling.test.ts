import { describe, expect, it } from 'vitest'
import { feelingFor } from './feeling'

describe('相棒のごきげん', () => {
  it('今日の学習数でごきげんが上がる', () => {
    expect(feelingFor(0).text).toContain('ねむそう')
    expect(feelingFor(5).text).toBe('ふつう')
    expect(feelingFor(10).text).toBe('ごきげん')
    expect(feelingFor(25).icon).toBe('🤩')
  })
})
