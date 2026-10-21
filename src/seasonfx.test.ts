import { expect, it } from 'vitest'
import { seasonFxOf } from './seasonfx'

it('月で季節の演出が決まる', () => {
  expect(seasonFxOf('2026-04-01').id).toBe('spring')
  expect(seasonFxOf('2026-07-15').id).toBe('summer')
  expect(seasonFxOf('2026-10-21').icon).toBe('🍁')
  expect(seasonFxOf('2026-12-24').id).toBe('winter')
  expect(seasonFxOf('2027-02-01').id).toBe('winter')
})
