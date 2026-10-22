import { expect, it } from 'vitest'
import { learnProverb, loadProverbs, PROVERBS } from './proverbs'

it('ことわざはまだ持っていないものから出て、ことわざ帳にたまる', () => {
  localStorage.clear()
  const seen = new Set<number>()
  for (let k = 0; k < PROVERBS.length; k++) seen.add(learnProverb(0))
  expect(seen.size).toBe(PROVERBS.length)
  expect(loadProverbs()).toHaveLength(PROVERBS.length)
  expect(learnProverb(0.5)).toBeGreaterThanOrEqual(0)
})
