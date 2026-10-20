import { describe, expect, it } from 'vitest'
import { makeVerbDrill, makeVerbQuestion, regularize, VERBS } from './irregular'

describe('不規則動詞', () => {
  it('40語以上あり、原形は重複しない', () => {
    expect(VERBS.length).toBeGreaterThanOrEqual(40)
    expect(new Set(VERBS.map((v) => v.base)).size).toBe(VERBS.length)
  })

  it('うっかり規則変化の形を作れる', () => {
    expect(regularize('go')).toBe('goed')
    expect(regularize('make')).toBe('maked')
    expect(regularize('fly')).toBe('flied')
    expect(regularize('buy')).toBe('buyed')
  })

  it('すべての動詞・形で、4択に正解が1つだけ・重複なし', () => {
    for (const v of VERBS) {
      for (const t of ['past', 'pp'] as const) {
        const q = makeVerbQuestion(v, t)
        expect(q.choices).toHaveLength(4)
        expect(new Set(q.choices).size).toBe(4)
        expect(q.choices[q.answer]).toBe(v[t])
        expect(q.choices.filter((c) => c === v[t])).toHaveLength(1)
      }
    }
  })

  it('過去形を聞くとき、同じ動詞の別の形やまちがいやすい形が混ざる', () => {
    const q = makeVerbQuestion(VERBS.find((v) => v.base === 'go')!, 'past')
    expect(q.choices).toEqual(expect.arrayContaining(['went', 'gone', 'goed', 'go']))
  })

  it('1回10問、同じ動詞は出ない', () => {
    const d = makeVerbDrill(10)
    expect(d).toHaveLength(10)
    expect(new Set(d.map((q) => q.verb.base)).size).toBe(10)
  })
})
