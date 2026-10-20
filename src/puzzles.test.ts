import { describe, expect, it } from 'vitest'
import { abcQ, OPPOSITES, oppositeQ } from './puzzles'
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
})
