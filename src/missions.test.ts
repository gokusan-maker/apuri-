import { beforeEach, describe, expect, it } from 'vitest'
import { bump, completedUnclaimed, loadMissions, missionsFor, MISSION_POOL, saveMissions } from './missions'

describe('デイリーミッション', () => {
  beforeEach(() => localStorage.clear())

  it('日付ごとに重複しない3つが決まり、同じ日は同じ', () => {
    const a = missionsFor('2026-10-20')
    expect(a).toHaveLength(3)
    expect(new Set(a.map((m) => m.id)).size).toBe(3)
    expect(missionsFor('2026-10-20')).toEqual(a)
    const days = Array.from({ length: 30 }, (_, i) => `2026-11-${String(i + 1).padStart(2, '0')}`)
    const used = new Set(days.flatMap((d) => missionsFor(d).map((m) => m.id)))
    expect(used.size).toBe(MISSION_POOL.length)
  })

  it('目標に届くと達成、受け取り済みは二度と出ない、日付が変わるとリセット', () => {
    const today = '2026-10-20'
    const m = missionsFor(today)[0]
    let s = loadMissions(today)
    s = bump(s, today, m.counter, m.target - 1)
    expect(completedUnclaimed(s, today).map((x) => x.id)).not.toContain(m.id)
    s = bump(s, today, m.counter)
    expect(completedUnclaimed(s, today).map((x) => x.id)).toContain(m.id)
    s = { ...s, claimed: [m.id] }
    expect(completedUnclaimed(s, today).map((x) => x.id)).not.toContain(m.id)
    expect(bump(s, '2026-10-21', 'answers').counts).toEqual({ answers: 1 })
  })

  it('保存と読み込み（前日の分は読まない）', () => {
    saveMissions({ day: '2026-10-19', counts: { answers: 9 }, claimed: [] })
    expect(loadMissions('2026-10-20')).toEqual({ day: '2026-10-20', counts: {}, claimed: [] })
    saveMissions({ day: '2026-10-20', counts: { answers: 2 }, claimed: ['x'] })
    expect(loadMissions('2026-10-20').counts.answers).toBe(2)
  })
})

it('聞き取り系で5問正解のミッションがある', () => {
  expect(MISSION_POOL.find((m) => m.id === 'ear-5')).toMatchObject({ counter: 'ear', target: 5 })
})

it('神経衰弱かビンゴのミッションがある', () => {
  expect(MISSION_POOL.find((m) => m.id === 'game-1')).toMatchObject({ counter: 'game', target: 1 })
})

it('戦いとガチャのミッションもある', async () => {
  const { MISSION_POOL, bump, fresh } = await import('./missions')
  expect(MISSION_POOL.some((m) => m.counter === 'boss')).toBe(true)
  expect(MISSION_POOL.some((m) => m.counter === 'gacha')).toBe(true)
  expect(bump(fresh('2026-10-21'), '2026-10-21', 'boss').counts.boss).toBe(1)
})
