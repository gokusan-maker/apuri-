import { beforeEach, describe, expect, it } from 'vitest'
import { addEggs, canRelease, MEMBERS_FOR_TICKET, tradeableMembers, tradeMembers, displayOrder, eggsEarned, loadParty, loadWarm, nextWarm, releaseCoins, releaseMember, saveParty, saveWarm, toggleFav, updateActive, warmLeft, WARM_PER_DAY } from './party'

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

it('タマゴあたためは1日5回まで', () => {
  localStorage.clear()
  let l = loadWarm()
  const d = '2026-10-21'
  expect(warmLeft(l, d)).toBe(WARM_PER_DAY)
  for (let i = 0; i < 5; i++) l = nextWarm(l, d)
  expect(warmLeft(l, d)).toBe(0)
  saveWarm(l)
  expect(warmLeft(loadWarm(), '2026-10-22')).toBe(WARM_PER_DAY)
})

it('仲間10体で、ガチャチケットと交換できる（相棒・おきにいりは数えない）', () => {
  const p = { active: 0, gacha: 12, members: [{ xp: 500 }, ...Array.from({ length: 10 }, (_, k) => ({ xp: k * 50 })), { xp: 0, fav: true }] }
  expect(tradeableMembers(p)).toHaveLength(10)
  const next = tradeMembers(p)!
  expect(next.members).toHaveLength(2)
  expect(next.members[0].xp).toBe(500) // 相棒はのこる
  expect(next.members.some((m) => m.fav)).toBe(true) // おきにいりものこる
  expect(tradeMembers(next)).toBeNull() // 10体に足りないと交換できない
  expect(MEMBERS_FOR_TICKET).toBe(10)
})

it('えらんだ10体とチケット交換できる（相棒・★の子や10体でないときはだめ）', async () => {
  const members = Array.from({ length: 14 }, (_, i) => ({ xp: 0, name: `子${i}`, fav: i === 3 }))
  const p = { members, active: 0 }
  const picks = [1, 2, 4, 5, 6, 7, 8, 9, 10, 13]
  const next = tradeMembers(p, picks)!
  expect(next.members.map((m) => m.name)).toEqual(['子0', '子3', '子11', '子12'])
  expect(tradeMembers(p, picks.slice(1))).toBeNull()
  expect(tradeMembers(p, [0, ...picks.slice(1)])).toBeNull()
  expect(tradeMembers(p, [3, ...picks.slice(1)])).toBeNull()
})

describe('デザイン101：種類ごとのいちばん高いレベル', () => {
  it('同じ種類が何体いても、いちばん育っている子のレベルになる', async () => {
    const { speciesTopLevels } = await import('./party')
    const { levelInfo } = await import('./monster')
    const t = speciesTopLevels([{ xp: 0 }, { xp: 500, species: 'fox' }, { xp: 50, species: 'fox' }])
    expect(t.mochi).toBe(1)
    expect(t.fox).toBe(levelInfo(500).level)
  })
})
