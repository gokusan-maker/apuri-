import { expect, it } from 'vitest'
import { PARTNER_SKILLS, skillCritMs, skillDamage, skillGauge, skillOf } from './partner'
import { SPECIES } from './monster'

it('すべてのキャラクターに特技がある', () => {
  for (const sp of SPECIES) expect(PARTNER_SKILLS[sp.id], sp.id).toBeDefined()
  expect(skillOf(undefined).id).toBe('revive')
  expect(skillOf('dragon').name).toBe('火の息')
})

it('特技の効果', () => {
  expect(skillDamage('fire', 1)).toBe(3)
  expect(skillDamage('foxfire', 2)).toBe(0)
  expect(skillDamage('foxfire', 3)).toBe(5)
  expect(skillGauge('cheer', 1)).toBe(0)
  expect(skillGauge('cheer', 2)).toBe(1)
  expect(skillCritMs('claw', 3000)).toBe(5000)
  expect(skillCritMs('fire', 3000)).toBe(3000)
})

it('特技レベル：10回でLv2、30回でLv3。Lv3で効果アップ', async () => {
  const { skillLevel, skillSaves } = await import('./partner')
  expect([skillLevel(0), skillLevel(9), skillLevel(10), skillLevel(30)]).toEqual([1, 1, 2, 3])
  expect(skillDamage('fire', 1, 3)).toBe(5)
  expect(skillDamage('foxfire', 3, 3)).toBe(8)
  expect(skillGauge('cheer', 1, 3)).toBe(1)
  expect(skillCritMs('claw', 3000, 3)).toBe(6000)
  expect(skillSaves('guard', 3)).toBe(2)
  expect(skillSaves('guard', 2)).toBe(1)
})

it('キャラクターごとに必殺技名がある', async () => {
  const { SPECIAL_MOVES, specialOf } = await import('./partner')
  for (const sp of SPECIES) expect(SPECIAL_MOVES[sp.id], sp.id).toBeDefined()
  expect(specialOf(undefined).name).toBe('もちもちメテオプレス')
  expect(new Set(Object.values(SPECIAL_MOVES).map((m) => m.name)).size).toBe(Object.keys(SPECIAL_MOVES).length)
})
