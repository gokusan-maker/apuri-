import { expect, it } from 'vitest'
import { isComeback } from './boss'

it('逆転チャンスはのこりハート1つのときだけ（サドンデスはのぞく）', () => {
  expect(isComeback(1, 3)).toBe(true)
  expect(isComeback(2, 3)).toBe(false)
  expect(isComeback(0, 3)).toBe(false)
  expect(isComeback(1, 1)).toBe(false)
})
