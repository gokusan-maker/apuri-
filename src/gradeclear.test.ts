import { expect, it } from 'vitest'
import { GRAMMAR, gradeClearRates, gradeOf } from './grammar'

it('学年別クリア率は学年ごとの全問正解の単元数を数える', () => {
  const u = GRAMMAR[0]
  const rates = gradeClearRates({ [u.id]: u.questions.length, [GRAMMAR[1].id]: 0 })
  expect(rates.map((r) => r.grade)).toEqual(['中1', '中2', '中3', '高校'])
  expect(rates.reduce((a, r) => a + r.total, 0)).toBe(GRAMMAR.length)
  expect(rates.find((r) => r.grade === gradeOf(u.id))!.cleared).toBe(1)
  expect(rates.reduce((a, r) => a + r.cleared, 0)).toBe(1)
})
