import { beforeEach, describe, expect, it } from 'vitest'
import { GRAMMAR, loadGrammar, saveGrammar } from './grammar'

describe('文法', () => {
  beforeEach(() => localStorage.clear())

  it('46単元、各3問。空欄は1つ、正解が選択肢に含まれ、選択肢は重複しない', () => {
    expect(GRAMMAR).toHaveLength(66)
    expect(new Set(GRAMMAR.map((u) => u.id)).size).toBe(66)
    for (const u of GRAMMAR) {
      expect(u.questions, u.id).toHaveLength(3)
      expect(u.points.length).toBeGreaterThan(0)
      for (const q of u.questions) {
        expect(q.sentence.split('___'), q.sentence).toHaveLength(2)
        expect(q.choices[q.answer], q.sentence).toBeDefined()
        expect(new Set(q.choices).size).toBe(q.choices.length)
        expect(q.why).not.toBe('')
      }
    }
  })

  it('記録の保存と読み込み', () => {
    saveGrammar({ be: 3 })
    expect(loadGrammar()).toEqual({ be: 3 })
  })
})

it('全問正解の単元がスタンプになる', async () => {
  const { GRAMMAR, grammarStamps } = await import('./grammar')
  const r = Object.fromEntries(GRAMMAR.slice(0, 3).map((u) => [u.id, u.questions.length]))
  expect(grammarStamps({ ...r, [GRAMMAR[3].id]: 1 })).toBe(3)
  expect(grammarStamps({ 'borrow-lend': 3 })).toBe(0) // まちがえやすい単語は数えない
})

it('まとめテストのランクとベスト記録', async () => {
  const { mixRank, loadMixBest, saveMixBest } = await import('./grammar')
  expect([mixRank(10, 10), mixRank(8, 10), mixRank(7, 10)]).toEqual(['S', 'A', 'B'])
  localStorage.clear()
  saveMixBest({ 文法ミニ解説: 9 })
  expect(loadMixBest()).toEqual({ 文法ミニ解説: 9 })
})

it('全問正解していない単元が苦手な単元', async () => {
  const { GRAMMAR, weakUnits } = await import('./grammar')
  const r = { [GRAMMAR[0].id]: 1, [GRAMMAR[1].id]: GRAMMAR[1].questions.length }
  expect(weakUnits(r).map((u) => u.id)).toEqual([GRAMMAR[0].id])
  expect(weakUnits({})).toEqual([])
})

it('今日の文法は日付で決まる', async () => {
  const { dailyGrammar, GRAMMAR } = await import('./grammar')
  expect(dailyGrammar('2026-10-21')).toBe(dailyGrammar('2026-10-21'))
  const ids = new Set(['2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24'].map((d) => dailyGrammar(d).id))
  expect(ids.size).toBeGreaterThan(1)
  expect(GRAMMAR).toContain(dailyGrammar('2026-10-21'))
})

it('すべての文法単元に学年の目安がある', async () => {
  const { GRAMMAR, gradeOf } = await import('./grammar')
  const { gradeListed } = await import('./grammar')
  for (const u of GRAMMAR) expect(gradeListed(u.id), u.id).toBe(true)
  expect(gradeOf('be')).toBe('中1')
  expect(gradeOf('past-perfect')).toBe('高校')
  const counts = new Map<string, number>()
  for (const u of GRAMMAR) counts.set(gradeOf(u.id), (counts.get(gradeOf(u.id)) ?? 0) + 1)
  expect(counts.size).toBe(4)
})

it('連続正解はまちがえると0にもどり、ベストは残る', async () => {
  const { loadGrammarStreak, saveGrammarStreak, streakAfter } = await import('./grammar')
  localStorage.clear()
  let s = loadGrammarStreak()
  expect(s).toEqual({ now: 0, best: 0 })
  s = streakAfter(streakAfter(s, true), true)
  expect(s).toEqual({ now: 2, best: 2 })
  s = streakAfter(s, false)
  expect(s).toEqual({ now: 0, best: 2 })
  saveGrammarStreak(s)
  expect(loadGrammarStreak()).toEqual({ now: 0, best: 2 })
  localStorage.setItem('eitan:grammar-streak', '{"now":4,"best":1}')
  expect(loadGrammarStreak()).toEqual({ now: 4, best: 4 })
})
