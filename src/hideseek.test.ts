import { expect, it } from 'vitest'
import { hideSpot, hint, loadHideDay, saveHideDay } from './hideseek'

it('かくれ場所と近さのヒント', () => {
  expect(hideSpot(0)).toBe(0)
  expect(hideSpot(0.999)).toBe(8)
  expect(hint(0, 1)).toContain('近く')
  expect(hint(0, 3)).toContain('近く')
  expect(hint(0, 8)).toContain('いない')
  localStorage.clear()
  expect(loadHideDay()).toBe('')
  saveHideDay('d')
  expect(loadHideDay()).toBe('d')
})
