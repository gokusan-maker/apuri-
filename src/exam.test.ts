import { describe, expect, it } from 'vitest'
import { daysUntil, perDay } from './exam'

describe('定期テストモード', () => {
  it('テストまでの日数と1日の目安', () => {
    expect(daysUntil('2026-10-20', '2026-10-30')).toBe(10)
    expect(daysUntil('2026-10-20', '2026-10-20')).toBe(0)
    expect(perDay(95, 10)).toBe(10)
    expect(perDay(5, 0)).toBe(5)
  })
})
