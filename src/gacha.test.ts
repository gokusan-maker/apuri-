import { expect, it } from 'vitest'
import { canDraw, drawEgg, GACHA_PRICE, PARTY_MAX } from './gacha'
import { KINDS, rollKind, sanitizeMonster, withKind, FORMS } from './monster'

it('レア度の出かた：ノーマル60%・レア30%・スーパーレア9%・ウルトラレア1%', () => {
  const n = 10000
  const count: Record<string, number> = {}
  for (let i = 0; i < n; i++) {
    const k = rollKind(i / n)
    count[k.rarity] = (count[k.rarity] ?? 0) + 1
  }
  expect(count).toEqual({ N: 6000, R: 3000, SR: 900, UR: 100 })
  expect(new Set(Array.from({ length: 300 }, (_, i) => rollKind(0.6 + i / 1000).id))).toEqual(new Set(['sakura', 'umi', 'yoru']))
})

it('コインでタマゴを引くと仲間がふえる。コイン不足や満員では引けない', () => {
  const party = { active: 0, members: [{ xp: 100 }] }
  const r = drawEgg({ coins: GACHA_PRICE + 5, owned: [] }, party, 0.995)!
  expect(r.wallet.coins).toBe(5)
  expect(r.party.members).toHaveLength(2)
  expect(r.party.members[1]).toEqual({ xp: 0, kind: 'niji' })
  expect(r.party.active).toBe(0)
  expect(drawEgg({ coins: 10, owned: [] }, party, 0.5)).toBeNull()
  const full = { active: 0, members: Array.from({ length: PARTY_MAX }, () => ({ xp: 0 })) }
  expect(canDraw({ coins: 999, owned: [] }, full)).toBe(false)
  expect(drawEgg({ coins: GACHA_PRICE, owned: [] }, party, 0.1)!.party.members[1]).toEqual({ xp: 0 })
})

it('色ちがいは保存しても残り、知らない値は捨てる。姿の色が変わる', () => {
  expect(sanitizeMonster({ xp: 5, kind: 'kin' }).kind).toBe('kin')
  expect(sanitizeMonster({ xp: 5, kind: 'xxx' }).kind).toBeUndefined()
  expect(withKind(FORMS[2], 'umi').color).toBe(KINDS.find((k) => k.id === 'umi')!.color)
  expect(withKind(FORMS[2], undefined)).toBe(FORMS[2])
})

it('ガチャのタマゴがあっても、節目のタマゴはちゃんともらえる', async () => {
  const { addEggs } = await import('./party')
  const r = drawEgg({ coins: 100, owned: [] }, { active: 0, members: [{ xp: 100 }] }, 0.1)!
  expect(r.party.gacha).toBe(1)
  const p = addEggs(r.party, 2) // 節目を1つ達成
  expect(p.members).toHaveLength(3)
  expect(addEggs(p, 2)).toBe(p)
})
