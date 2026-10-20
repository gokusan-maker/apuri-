import { describe, expect, it } from 'vitest'
import { abcQ, countQ, GROUPS, oddQ, OPPOSITES, oppositeQ } from './puzzles'
import { WORDS } from './words'

describe('パズル', () => {
  it('ABC順：4つとも頭文字がちがい、正解がいちばん最初', () => {
    for (let i = 0; i < 50; i++) {
      const q = abcQ()
      expect(q.choices).toHaveLength(4)
      expect(new Set(q.choices.map((c) => c[0])).size).toBe(4)
      expect(q.choices[q.answer]).toBe([...q.choices].sort()[0])
    }
  })

  it('反対の意味：どのペアも単語帳にある語をふくみ、語は重ならない', () => {
    for (const [a, b] of OPPOSITES) expect(WORDS.some((w) => w.en === a || w.en === b), a).toBe(true)
    expect(new Set(OPPOSITES.flat()).size).toBe(OPPOSITES.length * 2)
    for (let i = 0; i < 50; i++) {
      const q = oppositeQ()
      expect(new Set(q.choices).size).toBe(4)
      const ask = q.prompt.match(/「(.+)」/)![1]
      expect(OPPOSITES.some(([a, b]) => (a === ask && b === q.choices[q.answer]) || (b === ask && a === q.choices[q.answer]))).toBe(true)
      expect(q.wordId).not.toBe('')
    }
  })

  it('仲間はずれ：どの単語も単語帳にあり、正解だけ別の仲間', () => {
    for (const g of GROUPS) for (const id of g.ids) expect(WORDS.some((w) => w.id === id), id).toBe(true)
    expect(new Set(GROUPS.flatMap((g) => g.ids)).size).toBe(GROUPS.flatMap((g) => g.ids).length)
    const groupOf = (en: string) => GROUPS.find((g) => g.ids.includes(WORDS.find((w) => w.en === en)!.id))!.name
    for (let i = 0; i < 50; i++) {
      const q = oddQ()
      const names = q.choices.map(groupOf)
      const odd = names[q.answer]
      expect(names.filter((n) => n === odd)).toHaveLength(1)
      expect(new Set(names.filter((_, k) => k !== q.answer)).size).toBe(1)
      for (const c of q.choices) expect(q.why).toContain(c)
    }
  })

  it('いくつある？：絵文字の数と正解が合い、選択肢は4つ', () => {
    for (let i = 0; i < 50; i++) {
      const q = countQ()
      const n = [...q.prompt.split('\n')[0]].length
      expect(['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][n]).toBe(q.choices[q.answer])
      expect(new Set(q.choices).size).toBe(4)
      expect(WORDS.some((w) => w.id === q.wordId)).toBe(true)
    }
  })
})
