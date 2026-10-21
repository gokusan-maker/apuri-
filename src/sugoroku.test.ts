import { expect, it } from 'vitest'
import { BOARD, loadSugoroku, moveAfter, rollDice, saveSugoroku } from './sugoroku'

it('サイコロは1〜6', () => {
  expect(rollDice(0)).toBe(1)
  expect(rollDice(0.99)).toBe(6)
  expect(rollDice(1)).toBe(6)
})

it('正解で進み、ゴールで0にもどる。まちがいは進まない', () => {
  const s = { pos: 3, day: '', laps: 0 }
  expect(moveAfter(s, 4, true, 'd').next).toEqual({ pos: 7, day: 'd', laps: 0 })
  expect(moveAfter(s, 4, false, 'd').next).toEqual({ pos: 3, day: 'd', laps: 0 })
  const g = moveAfter({ pos: BOARD - 2, day: '', laps: 1 }, 5, true, 'd')
  expect(g.goal).toBe(true)
  expect(g.next).toEqual({ pos: 0, day: 'd', laps: 2 })
  localStorage.clear()
  expect(loadSugoroku()).toEqual({ pos: 0, day: '', laps: 0 })
  saveSugoroku({ pos: 7, day: 'x', laps: 1 })
  expect(loadSugoroku()).toEqual({ pos: 7, day: 'x', laps: 1 })
})
