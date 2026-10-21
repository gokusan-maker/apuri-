import { beforeEach, expect, it } from 'vitest'
import { BOSSES } from './boss'
import { betterRank, loadBook, recordWin, saveBook } from './bossbook'

beforeEach(() => localStorage.clear())

it('倒した回数と最高ランクを記録する', () => {
  const look = BOSSES['中1']
  let b = recordWin({}, look, 'B', '2026-10-21')
  expect(b[look.name]).toMatchObject({ wins: 1, best: 'B', first: '2026-10-21' })
  b = recordWin(b, look, 'S', '2026-10-22')
  b = recordWin(b, look, 'A', '2026-10-23')
  expect(b[look.name]).toMatchObject({ wins: 3, best: 'S', first: '2026-10-21' })
  saveBook(b)
  expect(loadBook()[look.name].wins).toBe(3)
  expect(betterRank('A', 'B')).toBe('A')
})
