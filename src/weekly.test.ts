import { describe, expect, it } from 'vitest'
import { isWeekend, weekCount, weekStart } from './weekly'

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

it('土日は週末', () => {
  expect(isWeekend('2026-10-24')).toBe(true) // 土
  expect(isWeekend('2026-10-25')).toBe(true) // 日
  expect(isWeekend('2026-10-26')).toBe(false) // 月
})
