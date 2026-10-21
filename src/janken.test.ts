import { expect, it } from 'vitest'
import { handOf, judge, loadJanken, saveJanken } from './janken'

it('じゃんけんの勝ち負け', () => {
  expect(judge(0, 1)).toBe(1) // グーはチョキに勝つ
  expect(judge(1, 2)).toBe(1) // チョキはパーに勝つ
  expect(judge(2, 0)).toBe(1) // パーはグーに勝つ
  expect(judge(1, 0)).toBe(-1)
  expect(judge(2, 2)).toBe(0)
  expect(handOf(0)).toBe(0)
  expect(handOf(0.5)).toBe(1)
  expect(handOf(0.99)).toBe(2)
})

it('じゃんけんの回数は日ごとにもどる', () => {
  localStorage.clear()
  expect(loadJanken('2026-10-20')).toEqual({ day: '2026-10-20', count: 0 })
  saveJanken({ day: '2026-10-20', count: 2 })
  expect(loadJanken('2026-10-20').count).toBe(2)
  expect(loadJanken('2026-10-21').count).toBe(0)
})
