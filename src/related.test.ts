import { expect, it } from 'vitest'
import { groupOf, homophoneOf, oppositeOf } from './related'

it('反対の意味と同じ発音の単語を引ける', () => {
  expect(oppositeOf('big')).toBe('small')
  expect(oppositeOf('small')).toBe('big')
  expect(oppositeOf('banana')).toBeUndefined()
  expect(homophoneOf('sea')).toBe('see（見る）')
  expect(homophoneOf('see')).toBe('sea（海）')
  expect(homophoneOf('banana')).toBeUndefined()
})

it('仲間の名前を引ける', () => {
  expect(groupOf('cat')).toBe('動物')
  expect(groupOf('soccer')).toBe('スポーツ')
  expect(groupOf('xyz')).toBeUndefined()
})
