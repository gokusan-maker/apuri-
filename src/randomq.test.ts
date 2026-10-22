import { expect, it } from 'vitest'
import { GRAMMAR, randomQuestion } from './grammar'

it('ランダム1問は全単元の確認問題から1問', () => {
  const all = GRAMMAR.flatMap((u) => u.questions)
  expect(randomQuestion(0)).toBe(all[0])
  expect(randomQuestion(0.9999)).toBe(all[all.length - 1])
  expect(randomQuestion(1)).toBe(all[all.length - 1])
})
