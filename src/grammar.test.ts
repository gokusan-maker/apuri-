import { beforeEach, describe, expect, it } from 'vitest'
import { GRAMMAR, loadGrammar, saveGrammar } from './grammar'

describe('文法', () => {
  beforeEach(() => localStorage.clear())

  it('46単元、各3問。空欄は1つ、正解が選択肢に含まれ、選択肢は重複しない', () => {
    expect(GRAMMAR).toHaveLength(56)
    expect(new Set(GRAMMAR.map((u) => u.id)).size).toBe(56)
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
