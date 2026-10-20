import { describe, expect, it } from 'vitest'
import { pickWordOfDay } from './wordOfDay'
import { WORDS } from './words'

describe('今日のことば', () => {
  it('同じ日は同じ単語、日によって変わる', () => {
    const a = pickWordOfDay(WORDS, '2026-10-20')!
    expect(pickWordOfDay(WORDS, '2026-10-20')).toBe(a)
    const days = ['2026-10-21', '2026-10-22', '2026-10-23'].map((d) => pickWordOfDay(WORDS, d)!.id)
    expect(days.some((id) => id !== a.id)).toBe(true)
    expect(a.example).not.toBe('')
  })
})
