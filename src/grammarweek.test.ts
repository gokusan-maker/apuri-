import { expect, it } from 'vitest'
import { addGrammarCorrect, last7, loadGrammarWeek, saveGrammarWeek } from './grammarweek'

it('文法の今週の成績：日ごとの正解数を数え、7日分を古い順に出す', () => {
  let w = addGrammarCorrect({}, '2026-10-22')
  w = addGrammarCorrect(w, '2026-10-22')
  w = addGrammarCorrect(w, '2026-10-20')
  const days = last7(w, '2026-10-22')
  expect(days.map((d) => d.day)).toEqual(['2026-10-16', '2026-10-17', '2026-10-18', '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22'])
  expect(days.at(-1)).toEqual({ day: '2026-10-22', label: '木', count: 2 })
  expect(days[4].count).toBe(1)
  let big = {}
  for (let i = 1; i <= 20; i++) big = addGrammarCorrect(big, `2026-09-${String(i).padStart(2, '0')}`)
  expect(Object.keys(big)).toHaveLength(14)
  localStorage.clear()
  saveGrammarWeek(w)
  expect(loadGrammarWeek()).toEqual(w)
})
