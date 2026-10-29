import { expect, it } from 'vitest'
import { streakClass } from './streakstyle'

it('デザイン73：連続日数が7の倍数の日だけ金色（week-gold）になる', () => {
  expect(streakClass(0)).toBe('streak')
  expect(streakClass(3)).toBe('streak on')
  expect(streakClass(7)).toBe('streak on week-gold')
  expect(streakClass(14)).toBe('streak on week-gold')
  expect(streakClass(15)).toBe('streak on')
})
