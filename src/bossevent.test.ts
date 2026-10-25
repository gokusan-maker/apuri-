import { expect, it } from 'vitest'
import { specialEventOf } from './bossevent'

it('とくべつイベントは日がわりで1つ（出ない日もある）。宝箱が先、週末は週末イベント', () => {
  const days = Array.from({ length: 14 }, (_, i) => `2026-11-${String(i + 2).padStart(2, '0')}`)
  const evs = days.map((d) => specialEventOf(d, { hour: 12, weekend: false, goldReady: false }))
  expect(evs).toContain(null)
  expect(new Set(evs.filter(Boolean)).size).toBeGreaterThanOrEqual(5)
  expect(specialEventOf('2026-11-02', { hour: 12, weekend: false, goldReady: true })).toBe('gold')
  expect(['rush-ex', 'weekend']).toContain(specialEventOf('2026-11-07', { hour: 12, weekend: true, goldReady: false }))
  const off = days.find((d) => specialEventOf(d, { hour: 12, weekend: false, goldReady: false }) === null)!
  expect(specialEventOf(off, { hour: 20, weekend: false, goldReady: false })).toBe('night')
})
