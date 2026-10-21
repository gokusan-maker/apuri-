import { expect, it } from 'vitest'
import { isNight } from './daytime'

it('19時〜翌5時は夜', () => {
  expect([18, 19, 23, 0, 4, 5, 12].map(isNight)).toEqual([false, true, true, true, true, false, false])
})
