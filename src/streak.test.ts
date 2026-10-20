import { beforeEach, describe, expect, it } from 'vitest'
import { currentStreak, currentStreakWithFreeze, loadStreak, recordStudy, recordStudyWithFreeze, saveStreak } from './streak'

describe('streak', () => {
  beforeEach(() => localStorage.clear())

  it('初めての学習で1日目', () => {
    expect(recordStudy(null, '2026-10-20')).toEqual({ last: '2026-10-20', count: 1 })
  })

  it('同じ日に何回学習しても増えない、翌日なら+1、1日あくと1に戻る', () => {
    const d1 = recordStudy(null, '2026-10-20')
    expect(recordStudy(d1, '2026-10-20')).toEqual(d1)
    const d2 = recordStudy(d1, '2026-10-21')
    expect(d2.count).toBe(2)
    expect(recordStudy(d2, '2026-10-23').count).toBe(1)
  })

  it('月またぎも連続になる', () => {
    expect(recordStudy({ last: '2026-10-31', count: 5 }, '2026-11-01').count).toBe(6)
  })

  it('表示は昨日まで続いていれば有効、それより前なら0', () => {
    const s = { last: '2026-10-19', count: 4 }
    expect(currentStreak(s, '2026-10-19')).toBe(4)
    expect(currentStreak(s, '2026-10-20')).toBe(4)
    expect(currentStreak(s, '2026-10-21')).toBe(0)
    expect(currentStreak(null, '2026-10-21')).toBe(0)
  })

  it('保存と読み込み', () => {
    saveStreak({ last: '2026-10-20', count: 3 })
    expect(loadStreak()).toEqual({ last: '2026-10-20', count: 3 })
    localStorage.setItem('eitan:streak', '{"foo":1}')
    expect(loadStreak()).toBeNull()
  })
})

describe('お休みチケット', () => {
  it('1日休んでもチケットがあれば連続がつながり、1枚使う', () => {
    const s = { last: '2026-10-18', count: 5 }
    expect(currentStreakWithFreeze(s, '2026-10-20', 1)).toBe(5)
    expect(currentStreakWithFreeze(s, '2026-10-20', 0)).toBe(0)
    expect(recordStudyWithFreeze(s, '2026-10-20', 1)).toEqual({ streak: { last: '2026-10-20', count: 6 }, used: true })
    expect(recordStudyWithFreeze(s, '2026-10-20', 0)).toEqual({ streak: { last: '2026-10-20', count: 1 }, used: false })
  })

  it('2日以上休むとチケットがあっても切れる。ふつうの翌日は使わない', () => {
    expect(recordStudyWithFreeze({ last: '2026-10-17', count: 5 }, '2026-10-20', 2).used).toBe(false)
    expect(recordStudyWithFreeze({ last: '2026-10-19', count: 5 }, '2026-10-20', 2)).toEqual({
      streak: { last: '2026-10-20', count: 6 },
      used: false,
    })
  })
})
