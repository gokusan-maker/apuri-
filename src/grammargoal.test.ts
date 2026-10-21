import { beforeEach, expect, it } from 'vitest'
import { clearForGoal, loadGrammarGoal, saveGrammarGoal } from './grammargoal'

beforeEach(() => localStorage.clear())

it('今週の目標：決めた数の単元を全問正解すると1回だけ達成', () => {
  let g = { ...loadGrammarGoal('2026-10-20'), goal: 3 }
  expect(g.week).toBe('2026-10-19')
  let r = clearForGoal(g, 'a')
  r = clearForGoal(r.goal, 'a') // 同じ単元は1回
  expect(r.goal.cleared).toEqual(['a'])
  r = clearForGoal(r.goal, 'b')
  expect(r.reached).toBe(false)
  r = clearForGoal(r.goal, 'c')
  expect(r.reached).toBe(true)
  r = clearForGoal(r.goal, 'd')
  expect(r.reached).toBe(false)
  g = r.goal
  saveGrammarGoal(g)
  expect(loadGrammarGoal('2026-10-25').cleared).toHaveLength(4) // 同じ週（日曜）
  const next = loadGrammarGoal('2026-10-26') // 次の週
  expect(next).toEqual({ week: '2026-10-26', goal: 3, cleared: [], rewarded: false })
})

it('目標を決めていなければ達成しない・こわれたデータは初期値', () => {
  expect(clearForGoal(loadGrammarGoal('2026-10-20'), 'a').reached).toBe(false)
  localStorage.setItem('eitan:grammar-goal', '{"week":"2026-10-19","goal":7,"cleared":[1,"x"]}')
  expect(loadGrammarGoal('2026-10-20')).toEqual({ week: '2026-10-19', goal: 0, cleared: ['x'], rewarded: false })
})
