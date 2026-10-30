import { describe, expect, it } from 'vitest'
import { makeQuestion, makeQuiz, shuffle, trimChoices } from './quiz'
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

it('日→英の選択肢（英単語）も4つで重複しない', () => {
  for (const w of WORDS) {
    const q = makeQuestion(w, WORDS, (x) => x.en)
    expect(new Set(q.choices).size).toBe(4)
    expect(q.choices[q.answer]).toBe(w.en)
  }
})

it('空の選択肢は作らない（例文のないマイ単語が混ざっていても）', () => {
  const my = { id: 'my:1', en: 'sunflower', ja: 'ひまわり', example: '', exampleJa: '' }
  const all = [...WORDS.slice(0, 6), my]
  for (let i = 0; i < 20; i++) {
    const q = makeQuestion(all[0], all, (w) => w.exampleJa)
    expect(q.choices.every((c) => c !== '')).toBe(true)
  }
})

describe('trimChoices', () => {
  it('正解を残して選択肢を減らす', () => {
    const q = { word: { id: 'a' }, choices: ['w', 'x', 'y', 'z'], answer: 2 }
    const t = trimChoices(q, 3)
    expect(t.choices).toHaveLength(3)
    expect(t.choices[t.answer]).toBe('y')
    expect(trimChoices(t, 3)).toBe(t)
  })
})

describe('レベルに合った誤答（CEFR の点検①）', () => {
  it('出題レベルの単語が十分あれば、誤答はそのレベルから選ぶ', async () => {
    const { distractorPool, DISTRACTOR_MIN } = await import('./quiz')
    const level = WORDS.slice(0, DISTRACTOR_MIN)
    expect(distractorPool(level, WORDS)).toBe(level)
    expect(distractorPool(WORDS.slice(0, 3), WORDS)).toBe(WORDS)
  })
})

describe('レベルに合った誤答（CEFR の点検②）', () => {
  it('ボス戦・ライバル戦・対戦・タイムアタックの単語問題は、誤答も出題レベルの訳から出る', async () => {
    const { bossQuestions } = await import('./boss')
    const { wordsOf } = await import('./words')
    for (const lv of ['中3', '高校基礎'] as const) {
      const words = wordsOf([lv])
      const jas = new Set(words.map((w) => w.ja))
      for (const q of bossQuestions(words, false)) for (const c of q.choices) expect(jas.has(c), `${lv}:${c}`).toBe(true)
      for (const q of makeQuiz(words, (w) => w.ja, 20)) for (const c of q.choices) expect(jas.has(c)).toBe(true)
    }
  })
})
