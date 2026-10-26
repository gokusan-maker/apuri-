import { expect, it } from 'vitest'

it('次のボス撃破の記念まで、あと何レベルか', async () => {
  const { nextBossMilestone } = await import('./bosscastle')
  expect(nextBossMilestone(0)).toEqual({ at: 5, left: 5 })
  expect(nextBossMilestone(5)).toEqual({ at: 10, left: 5 })
  expect(nextBossMilestone(9)).toEqual({ at: 10, left: 1 })
  expect(nextBossMilestone(10)).toBeNull()
})
