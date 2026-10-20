import { describe, expect, it } from 'vitest'
import { makeQuestion, makeQuiz, shuffle } from './quiz'
import { WORDS } from './words'

// 決まった並びを返す乱数（テスト用）
function seeded(seed = 1) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

describe('quiz', () => {
  it('shuffle は要素を失わない', () => {
    const a = [1, 2, 3, 4, 5]
    expect(shuffle(a, seeded()).sort()).toEqual(a)
  })

  it('4択で、正解が1つだけ含まれ、選択肢は重複しない', () => {
    for (const w of WORDS) {
      const q = makeQuestion(w, WORDS, (x) => x.ja, seeded(w.id.length))
      expect(q.choices).toHaveLength(4)
      expect(new Set(q.choices).size).toBe(4)
      expect(q.choices[q.answer]).toBe(w.ja)
    }
  })

  it('1プレイは10問で、同じ単語は出ない', () => {
    const quiz = makeQuiz(WORDS, (w) => w.ja, 10, seeded(7))
    expect(quiz).toHaveLength(10)
    expect(new Set(quiz.map((q) => q.word.id)).size).toBe(10)
  })
})
