import { describe, expect, it } from 'vitest'
import { rate, recordAnswer, type Accuracy } from './accuracy'

describe('正答率', () => {
  it('今日の分と学び方ごとの累計。日がかわると今日の分はリセット', () => {
    let a: Accuracy = { day: '', today: { correct: 0, total: 0 }, by: {} }
    a = recordAnswer(a, '2026-10-20', 'quiz', true)
    a = recordAnswer(a, '2026-10-20', 'quiz', false)
    a = recordAnswer(a, '2026-10-20', 'card', true)
    expect(rate(a.today)).toBe(67)
    expect(rate(a.by.quiz)).toBe(50)
    a = recordAnswer(a, '2026-10-21', 'ear', true)
    expect(a.today).toEqual({ correct: 1, total: 1 })
    expect(rate(a.by.quiz)).toBe(50)
    expect(rate(undefined)).toBeNull()
  })
})
