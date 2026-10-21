import { beforeEach, describe, expect, it } from 'vitest'
import { addEggs, canRelease, displayOrder, eggsEarned, loadParty, releaseCoins, releaseMember, saveParty, toggleFav, updateActive } from './party'

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

it('おきにいりは一覧の先頭に並び、保存しても残る（相棒の番号は変わらない）', () => {
  localStorage.clear()
  const p = { active: 2, members: [{ xp: 0 }, { xp: 10 }, { xp: 20 }] }
  const f = toggleFav(p, 2)
  expect(f.members[2].fav).toBe(true)
  expect(f.active).toBe(2)
  expect(displayOrder(f)).toEqual([2, 0, 1])
  saveParty(f)
  expect(loadParty().members[2].fav).toBe(true)
  const g = toggleFav(f, 2)
  expect(g.members[2].fav).toBeUndefined()
  expect(displayOrder(g)).toEqual([0, 1, 2])
})

it('なかま交換所：相棒・おきにいりはおわかれできず、節目のタマゴは二度ともらえない', () => {
  const p = { active: 1, members: [{ xp: 0 }, { xp: 5 }, { xp: 9, fav: true }, { xp: 3 }], gacha: 1 }
  expect(canRelease(p, 1)).toBe(false) // 相棒
  expect(canRelease(p, 2)).toBe(false) // おきにいり
  expect(releaseMember(p, 1)).toBeNull()
  const a = releaseMember(p, 0)! // 相棒より前の子
  expect(a.members).toHaveLength(3)
  expect(a.active).toBe(0)
  expect(a.gacha).toBeUndefined() // ガチャの子の数から減らす
  const b = releaseMember(a, 2)!
  expect(b.released).toBe(1)
  expect(addEggs(b, 3).members).toHaveLength(b.members.length) // おわかれした分は足されない
  expect(releaseCoins(1)).toBe(12)
  expect(releaseCoins(99)).toBe(100)
  saveParty(b)
  expect(loadParty().released).toBe(1)
})
