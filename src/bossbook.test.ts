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

it('ボスをたおした回数で二つ名が変わる', async () => {
  const { epithetOf, totalWins } = await import('./bossbook')
  expect(epithetOf(0)).toBeNull()
  expect(epithetOf(1)).toBe('かけだし勇者')
  expect(epithetOf(12)).toBe('ボスハンター')
  expect(epithetOf(30)).toBe('伝説の勇者')
  const b = recordWin(recordWin({}, BOSSES['中1'], 'A', '2026-10-21'), BOSSES['中2'], 'B', '2026-10-21')
  expect(totalWins(b)).toBe(2)
})

it('基本のボスのうちたおした数', async () => {
  const { baseBeaten } = await import('./bossbook')
  const b = recordWin({}, BOSSES['中1'], 'A', '2026-10-21')
  expect(baseBeaten(b, [BOSSES['中1'].name, BOSSES['中2'].name])).toBe(1)
})

it('負けたボスに勝つとリベンジ（1回だけ）', async () => {
  const { markLost, takeRevenge, loadLost } = await import('./bossbook')
  localStorage.clear()
  expect(takeRevenge('モチ')).toBe(false)
  markLost('モチ')
  markLost('モチ')
  expect(loadLost()).toEqual(['モチ'])
  expect(takeRevenge('モチ')).toBe(true)
  expect(takeRevenge('モチ')).toBe(false)
})

it('デザイン213：1日の勝利回数の自己ベストをこえたときだけ true（最初の記録づくりでは出さない）', async () => {
  const { recordDayBest } = await import('./bossbook')
  localStorage.clear()
  expect(recordDayBest('X', 1)).toBe(false) // はじめての記録
  expect(recordDayBest('X', 2)).toBe(true) // 1日2勝で記録更新
  expect(recordDayBest('X', 1)).toBe(false) // 次の日の1勝目は記録以下
  expect(recordDayBest('X', 2)).toBe(false) // 記録と同じ
  expect(recordDayBest('X', 3)).toBe(true) // 記録をこえた
})

it('デザイン223：同じボスに何日続けて勝ったかを数える（同じ日は数えない・1日あくとやりなおし）', async () => {
  localStorage.clear()
  const { recordWinDay } = await import('./bossbook')
  expect(recordWinDay('ドラゴン', '2026-11-01')).toBe(1)
  expect(recordWinDay('ドラゴン', '2026-11-01')).toBe(1)
  expect(recordWinDay('ドラゴン', '2026-11-02')).toBe(2)
  expect(recordWinDay('ドラゴン', '2026-11-03')).toBe(3)
  expect(recordWinDay('ゴースト', '2026-11-03')).toBe(1)
  expect(recordWinDay('ドラゴン', '2026-11-05')).toBe(1)
})
