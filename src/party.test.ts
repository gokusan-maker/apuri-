import { beforeEach, describe, expect, it } from 'vitest'
import { addEggs, eggsEarned, loadParty, saveParty, updateActive } from './party'

describe('なかま', () => {
  beforeEach(() => localStorage.clear())

  it('旧形式の1匹（eitan:monster）からそのまま引き継ぐ', () => {
    localStorage.setItem('eitan:monster', '{"xp":120,"lastDay":"2026-10-19"}')
    expect(loadParty()).toEqual({ active: 0, members: [{ xp: 120, lastDay: '2026-10-19' }] })
  })

  it('節目のバッジの数だけタマゴが増える', () => {
    expect(eggsEarned({})).toBe(1)
    expect(eggsEarned({ 'learned-50': 'x', 'streak-7': 'y', 'first-correct': 'z' })).toBe(3)
    const p = addEggs({ active: 0, members: [{ xp: 50 }] }, 3)
    expect(p.members).toEqual([{ xp: 50 }, { xp: 0 }, { xp: 0 }])
    expect(addEggs(p, 2)).toBe(p)
  })

  it('相棒だけが育ち、保存・読み込みできる', () => {
    let p = { active: 1, members: [{ xp: 50 }, { xp: 0 }] }
    p = updateActive(p, { xp: 10 })
    expect(p.members).toEqual([{ xp: 50 }, { xp: 10 }])
    saveParty(p)
    expect(loadParty()).toEqual(p)
    localStorage.setItem('eitan:party', '{"active":9,"members":[{"xp":5}]}')
    expect(loadParty().active).toBe(0)
  })
})
