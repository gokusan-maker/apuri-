import { expect, it } from 'vitest'
import { shade } from './color'

it('色を明るく・暗くできる', () => {
  expect(shade('#808080', 0)).toBe('#808080')
  expect(shade('#000000', 1)).toBe('#ffffff')
  expect(shade('#ffffff', -1)).toBe('#000000')
  expect(shade('#ff0000', 0.5)).toBe('#ff8080')
})
