import { expect, it } from 'vitest'
import { loadRouletteDay, ROULETTE, saveRouletteDay, spinRoulette } from './roulette'

it('ルーレットの当たりは乱数で決まり、1日1回を記録できる', () => {
  expect(ROULETTE.length).toBe(8)
  expect(spinRoulette(0)).toBe(0)
  expect(spinRoulette(0.99)).toBe(ROULETTE.length - 1)
  expect(spinRoulette(1)).toBe(ROULETTE.length - 1)
  for (const p of ROULETTE.filter((x) => x.kind === 'coins')) {
    expect(p.amount).toBeGreaterThanOrEqual(1)
    expect(p.amount).toBeLessThanOrEqual(10)
  }
  localStorage.clear()
  expect(loadRouletteDay()).toBe('')
  saveRouletteDay('2026-10-20')
  expect(loadRouletteDay()).toBe('2026-10-20')
})
