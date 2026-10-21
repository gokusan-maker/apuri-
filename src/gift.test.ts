import { expect, it } from 'vitest'
import { giftReady, loadGiftDay, saveGiftDay } from './gift'

it('目標を達成した次の日からおみやげを受け取れる', () => {
  expect(giftReady('', '2026-10-20')).toBe(false)
  expect(giftReady('2026-10-20', '2026-10-20')).toBe(false)
  expect(giftReady('2026-10-19', '2026-10-20')).toBe(true)
  localStorage.clear()
  saveGiftDay('2026-10-19')
  expect(loadGiftDay()).toBe('2026-10-19')
})
