import { beforeEach, expect, it } from 'vitest'
import { loadRareWeek, rareBossOf, saveRareWeek, weekKey } from './rareboss'
import { rareEgg, PARTY_MAX } from './gacha'

beforeEach(() => localStorage.clear())

it('週は月曜はじまりで、同じ週なら同じレアボス', () => {
  expect(weekKey('2026-10-21')).toBe('2026-10-19') // 水曜 → 月曜
  expect(weekKey('2026-10-19')).toBe('2026-10-19')
  expect(weekKey('2026-10-25')).toBe('2026-10-19') // 日曜
  expect(weekKey('2026-11-02')).toBe('2026-11-02')
  const a = rareBossOf(weekKey('2026-10-21'))
  expect(a.look.name.startsWith('キラキラ')).toBe(true)
  expect(rareBossOf(weekKey('2026-10-24'))).toEqual(a)
  saveRareWeek('2026-10-19')
  expect(loadRareWeek()).toBe('2026-10-19')
})

it('レアボスのタマゴはかならず色ちがい。仲間がいっぱいなら null', () => {
  const p = { members: [{ xp: 0 }], active: 0 }
  for (const r of [0, 0.5, 0.69, 0.8, 0.99]) {
    const e = rareEgg(p as never, r, 0.5)!
    expect(e.kind.rarity).not.toBe('N')
    expect(e.party.members).toHaveLength(2)
  }
  expect(rareEgg(p as never, 0.99, 0)!.kind.id).toBe('niji')
  const full = { members: Array.from({ length: PARTY_MAX }, () => ({ xp: 0 })), active: 0 }
  expect(rareEgg(full as never, 0, 0)).toBeNull()
})
