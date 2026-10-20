import { beforeEach, describe, expect, it } from 'vitest'
import { addToday, loadTodayCount, saveTodayCount } from './stats'

describe('今日の学習数', () => {
  beforeEach(() => localStorage.clear())

  it('答えるたびに+1、日付が変わると1から', () => {
    const d = addToday({ day: '2026-10-20', count: 4 }, '2026-10-20')
    expect(d).toEqual({ day: '2026-10-20', count: 5 })
    expect(addToday(d, '2026-10-21')).toEqual({ day: '2026-10-21', count: 1 })
  })

  it('前日の保存は今日には0として読む', () => {
    saveTodayCount({ day: '2026-10-19', count: 9 })
    expect(loadTodayCount('2026-10-20')).toEqual({ day: '2026-10-20', count: 0 })
    saveTodayCount({ day: '2026-10-20', count: 2 })
    expect(loadTodayCount('2026-10-20').count).toBe(2)
  })
})
