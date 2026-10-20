import { describe, expect, it } from 'vitest'
import { addDays, grade, isDue } from './srs'

describe('srs', () => {
  it('正解で箱が上がり、出題日が延びる', () => {
    const p1 = grade(undefined, true, '2026-10-20')
    expect(p1).toEqual({ box: 1, due: '2026-10-21' })
    const p2 = grade(p1, true, '2026-10-21')
    expect(p2).toEqual({ box: 2, due: '2026-10-24' })
  })

  it('不正解で箱0に戻り、今日また出題される', () => {
    const p = grade({ box: 3, due: '2026-10-20' }, false, '2026-10-20')
    expect(p).toEqual({ box: 0, due: '2026-10-20' })
    expect(isDue(p, '2026-10-20')).toBe(true)
  })

  it('月またぎの日付計算', () => {
    expect(addDays('2026-10-30', 3)).toBe('2026-11-02')
  })
})
