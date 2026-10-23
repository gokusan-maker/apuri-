import { expect, it } from 'vitest'
import { isNewLong, LONG_PASSAGES, NEW_LONG_COUNT } from './longreading'

it('NEW マークは新しい6本のうち、まだ解いていない読解だけ', () => {
  const last = LONG_PASSAGES[LONG_PASSAGES.length - 1]
  expect(isNewLong(last, {})).toBe(true)
  expect(isNewLong(last, { [last.id]: 3 })).toBe(false)
  expect(isNewLong(LONG_PASSAGES[0], {})).toBe(false)
  expect(LONG_PASSAGES.filter((p) => isNewLong(p, {}))).toHaveLength(NEW_LONG_COUNT)
})
