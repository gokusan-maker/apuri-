import { expect, it } from 'vitest'
import { LONG_PASSAGES } from './longreading'
import { makeTfQuiz } from './longtf'

it('○×だけチャレンジは解いた長文の○×から重ならずに10問', () => {
  const ps = LONG_PASSAGES.slice(0, 3)
  const qs = makeTfQuiz(ps, () => 0)
  expect(qs).toHaveLength(10)
  expect(new Set(qs.map((q) => q.statement)).size).toBe(10)
  expect(qs.every((q) => ps.some((p) => p.title === q.title && p.tf.some((t) => t.statement === q.statement)))).toBe(true)
  expect(makeTfQuiz(LONG_PASSAGES.slice(0, 1), () => 0.5).length).toBe(LONG_PASSAGES[0].tf.length)
  expect(makeTfQuiz([], () => 0)).toEqual([])
})
