import { describe, expect, it } from 'vitest'
import { eventFor } from './events'

describe('季節のイベント', () => {
  it('期間中だけ', () => {
    expect(eventFor('2026-10-20')).toBeNull()
    expect(eventFor('2026-10-24')?.id).toBe('halloween')
    expect(eventFor('2026-10-31')?.id).toBe('halloween')
    expect(eventFor('2026-11-01')).toBeNull()
    expect(eventFor('2027-01-03')?.id).toBe('newyear')
    expect(eventFor('2026-12-25')?.id).toBe('christmas')
    expect(eventFor('2026-07-07')?.id).toBe('tanabata')
  })
})
