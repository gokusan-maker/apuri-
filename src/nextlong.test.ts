import { expect, it } from 'vitest'
import { LONG_PASSAGES, nextLong } from './longreading'

it('次の長文は、今のあとのまだ解いていない長文（全部解いたら次）', () => {
  const [a, b, c] = LONG_PASSAGES
  expect(nextLong(a.id, {})).toBe(b)
  expect(nextLong(a.id, { [b.id]: 3 })).toBe(c)
  const all = Object.fromEntries(LONG_PASSAGES.map((x) => [x.id, 1]))
  expect(nextLong(a.id, all)).toBe(b)
  const last = LONG_PASSAGES[LONG_PASSAGES.length - 1]
  expect(nextLong(last.id, {})).toBe(a)
})
