import { expect, it } from 'vitest'
import { correctSentence, GRAMMAR } from './grammar'

it('答えあわせの正しい英文：空所に正解を入れる（日本語がまじる問題は読まない）', () => {
  expect(correctSentence({ sentence: 'I ___ a student.', choices: ['is', 'am'], answer: 1, why: '' })).toBe('I am a student.')
  expect(correctSentence({ sentence: 'Cooking → ___', choices: ['料理すること', 'x'], answer: 0, why: '' })).toBeNull()
  const n = GRAMMAR.flatMap((u) => u.questions).filter((q) => correctSentence(q) && correctSentence(q)!.includes('___')).length
  expect(n).toBe(0)
})
