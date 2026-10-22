import { describe, expect, it } from 'vitest'
import { dailyWordGame, loadWordGameDay, saveWordGameDay, WORD_GAMES } from './wordgame'

describe('今日の単語ゲーム', () => {
  it('同じ日は同じゲーム、日によっていろいろなゲームが出る', () => {
    expect(dailyWordGame('2026-10-22')).toEqual(dailyWordGame('2026-10-22'))
    const seen = new Set<string>()
    for (let d = 1; d <= 60; d++) seen.add(dailyWordGame(`2026-11-${String(d).padStart(2, '0')}`).id)
    expect(seen.size).toBeGreaterThan(5)
    expect(WORD_GAMES.some((g) => g.id === 'card')).toBe(true)
  })

  it('クリアした日を覚える', () => {
    localStorage.clear()
    expect(loadWordGameDay()).toBe('')
    saveWordGameDay('2026-10-22')
    expect(loadWordGameDay()).toBe('2026-10-22')
  })
})
