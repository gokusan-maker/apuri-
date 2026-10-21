import { expect, it } from 'vitest'
import { cheerEvent, encourage } from './encourage'

it('小さいうちは日本語、Lv15（段階3）からは英語で励ます', () => {
  expect(encourage(undefined, 1, 'streak', 0).lang).toBe('ja')
  const big = encourage(undefined, 3, 'wrong', 0)
  expect(big.lang).toBe('en')
  expect(big.text).toMatch(/[A-Za-z]/)
  expect(big.ja).toMatch(/[ぁ-ん]/)
})

it('ドラゴンは育つとドラゴンらしい英語で励ます', () => {
  expect(encourage('dragon', 4, 'streak', 0).text).toBe("Roar! You're on fire!")
  expect(encourage('dragon', 1, 'streak', 0).text).toBe('がおー！いい調子！')
})

it('連続正解3・5・10回目と、2回続けてまちがえたときに励ます', () => {
  expect([1, 2, 3, 4, 5, 10].map((n) => cheerEvent(n, 0))).toEqual([null, null, 'streak', null, 'streak', 'streak'])
  expect(cheerEvent(0, 1)).toBeNull()
  expect(cheerEvent(0, 2)).toBe('wrong')
})
