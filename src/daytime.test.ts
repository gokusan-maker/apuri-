import { expect, it } from 'vitest'
import { daypartOf, isNight } from './daytime'

it('19時〜翌5時は夜', () => {
  expect([18, 19, 23, 0, 4, 5, 12].map(isNight)).toEqual([false, true, true, true, true, false, false])
})

it('時間帯：朝・昼・夕方・夜で相棒の部屋の背景が変わる', () => {
  expect([6, 9, 10, 15, 16, 18, 19, 2].map(daypartOf)).toEqual(['morning', 'morning', 'day', 'day', 'evening', 'evening', 'night', 'night'])
})
