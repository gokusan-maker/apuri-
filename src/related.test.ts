import { expect, it } from 'vitest'
import { homophoneOf, oppositeOf } from './related'

it('反対の意味と同じ発音の単語を引ける', () => {
  expect(oppositeOf('big')).toBe('small')
  expect(oppositeOf('small')).toBe('big')
  expect(oppositeOf('banana')).toBeUndefined()
  expect(homophoneOf('sea')).toBe('see（見る）')
  expect(homophoneOf('see')).toBe('sea（海）')
  expect(homophoneOf('banana')).toBeUndefined()
})
