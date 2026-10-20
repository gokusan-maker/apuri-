import { describe, expect, it } from 'vitest'
import { monthGrid } from './calendar'

describe('学習カレンダー', () => {
  it('2026年10月は木曜はじまり、31日まで、週ごとに7マス', () => {
    const w = monthGrid('2026-10-20')
    expect(w[0].slice(0, 4)).toEqual([null, null, null, null])
    expect(w[0][4]).toEqual({ day: '2026-10-01', date: 1 })
    expect(w.every((wk) => wk.length === 7)).toBe(true)
    expect(w.flat().filter(Boolean)).toHaveLength(31)
  })

  it('2月（うるう年でない）は28日', () => {
    expect(monthGrid('2027-02-10').flat().filter(Boolean)).toHaveLength(28)
  })
})
