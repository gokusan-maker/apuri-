import { beforeEach, describe, expect, it } from 'vitest'
import { addHistory, lastDays, loadHistory, saveHistory } from './history'

describe('学習の記録（グラフ用）', () => {
  beforeEach(() => localStorage.clear())

  it('日ごとに数え、60日より古い記録は消す', () => {
    let h = addHistory({ '2026-08-01': 5 }, '2026-10-20')
    h = addHistory(h, '2026-10-20')
    expect(h).toEqual({ '2026-10-20': 2 })
  })

  it('直近7日を古い順に、曜日つきで返す', () => {
    const days = lastDays({ '2026-10-20': 3, '2026-10-18': 1 }, '2026-10-20')
    expect(days).toHaveLength(7)
    expect(days[0]).toEqual({ day: '2026-10-14', count: 0, label: '水' })
    expect(days[6]).toEqual({ day: '2026-10-20', count: 3, label: '火' })
    expect(days[4].count).toBe(1)
  })

  it('保存と読み込み。おかしなキーは捨てる', () => {
    saveHistory({ '2026-10-20': 4 })
    expect(loadHistory()).toEqual({ '2026-10-20': 4 })
    localStorage.setItem('eitan:history', '{"2026-10-20":2,"x":1,"2026-10-19":"a"}')
    expect(loadHistory()).toEqual({ '2026-10-20': 2 })
  })
})
