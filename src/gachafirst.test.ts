import { expect, it } from 'vitest'
import { loadFirstPullDay, takeFirstPull } from './gachafirst'

it('その日はじめての1回だけ「きょうの1回目」になる', () => {
  localStorage.clear()
  expect(takeFirstPull('2026-10-22')).toBe(true)
  expect(takeFirstPull('2026-10-22')).toBe(false)
  expect(loadFirstPullDay()).toBe('2026-10-22')
  expect(takeFirstPull('2026-10-23')).toBe(true)
})
