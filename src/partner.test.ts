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
