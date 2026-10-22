import { expect, it } from 'vitest'
import { choiceOrder } from './grammar'

it('選択肢の順番は元の番号の並べかえで、seed によって答えの位置がかわる', () => {
  for (let seed = 0; seed < 10; seed++) {
    const o = choiceOrder(3, seed)
    expect([...o].sort()).toEqual([0, 1, 2])
  }
  expect(new Set(Array.from({ length: 6 }, (_, s) => choiceOrder(3, s)[0])).size).toBe(3)
})
