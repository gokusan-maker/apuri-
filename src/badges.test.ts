import { beforeEach, describe, expect, it } from 'vitest'
import { BADGES, loadEarned, loadTotals, newlyEarned, saveEarned, saveTotals, type BadgeStats } from './badges'

const zero: BadgeStats = { answers: 0, correct: 0, streak: 0, learned: 0, level: 1, perfect: 0, bestTime: 0, goals: 0 }

describe('バッジ', () => {
  beforeEach(() => localStorage.clear())

  it('id は重複しない', () => {
    expect(new Set(BADGES.map((b) => b.id)).size).toBe(BADGES.length)
  })

  it('最初は何ももらえない', () => {
    expect(newlyEarned(zero, {})).toEqual([])
  })

  it('条件を満たすともらえ、持っているものは二度ともらえない', () => {
    const s = { ...zero, correct: 10, answers: 10, streak: 3 }
    const ids = newlyEarned(s, {}).map((b) => b.id)
    expect(ids).toEqual(['first-correct', 'correct-10', 'streak-3'])
    expect(newlyEarned(s, { 'first-correct': '2026-10-20' }).map((b) => b.id)).toEqual(['correct-10', 'streak-3'])
  })

  it('保存と読み込み（古いデータに totals が無くても0から）', () => {
    expect(loadTotals()).toEqual({ answers: 0, correct: 0, perfect: 0, goals: 0 })
    saveTotals({ answers: 5, correct: 3, perfect: 0, goals: 1 })
    expect(loadTotals().answers).toBe(5)
    saveEarned({ perfect: '2026-10-20' })
    expect(loadEarned()).toEqual({ perfect: '2026-10-20' })
    localStorage.setItem('eitan:badges', '[]')
    expect(loadEarned()).toEqual({})
  })
})
