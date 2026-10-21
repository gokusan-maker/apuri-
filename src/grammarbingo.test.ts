import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { bingoCount, makeBingo } from './grammarbingo'

it('ビンゴは9問で、ちがう単元から出る', () => {
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  const qs = makeBingo(rnd)
  expect(qs).toHaveLength(9)
  const units = qs.map((q) => GRAMMAR.findIndex((u) => u.questions.includes(q)))
  expect(units.every((i) => i >= 0)).toBe(true)
  expect(new Set(units).size).toBe(9)
})

it('たて・よこ・ななめの列を数える', () => {
  const c = (idx: number[]) => Array.from({ length: 9 }, (_, i) => idx.includes(i))
  expect(bingoCount(c([0, 1]))).toBe(0)
  expect(bingoCount(c([0, 1, 2]))).toBe(1)
  expect(bingoCount(c([0, 4, 8]))).toBe(1)
  expect(bingoCount(c([0, 1, 2, 4, 6, 3]))).toBe(3) // よこ1・ななめ1・たて1
  expect(bingoCount(c([0, 1, 2, 3, 4, 5, 6, 7, 8]))).toBe(8)
})
