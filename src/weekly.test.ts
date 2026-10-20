import { describe, expect, it } from 'vitest'
import { weekCount, weekStart } from './weekly'

describe('週間チャレンジ', () => {
  it('週は月曜はじまり', () => {
    expect(weekStart('2026-10-20')).toBe('2026-10-19') // 火曜→月曜
    expect(weekStart('2026-10-19')).toBe('2026-10-19')
    expect(weekStart('2026-10-25')).toBe('2026-10-19') // 日曜は前の月曜から
  })

  it('今週の問題数を数える（先週の分は入れない）', () => {
    const h = { '2026-10-18': 50, '2026-10-19': 30, '2026-10-20': 25 }
    expect(weekCount(h, '2026-10-20')).toBe(55)
  })
})
