import { beforeEach, expect, it } from 'vitest'
import { loadPetLog, nextPet, PET_MAX_AT, PET_TICKLE_FROM, petReaction, savePetLog } from './pet'

beforeEach(() => localStorage.clear())

it('なでた回数は1日ごとに数え、日がかわると1から', () => {
  expect(loadPetLog()).toEqual({ day: '', count: 0 })
  const a = nextPet(loadPetLog(), '2026-10-21')
  expect(a).toEqual({ day: '2026-10-21', count: 1 })
  savePetLog(nextPet(a, '2026-10-21'))
  expect(loadPetLog().count).toBe(2)
  expect(nextPet(loadPetLog(), '2026-10-22')).toEqual({ day: '2026-10-22', count: 1 })
})

it('5回目はごきげんMAX、なですぎるとくすぐったがる', () => {
  expect(petReaction(1)).toBe('normal')
  expect(petReaction(PET_MAX_AT)).toBe('max')
  expect(petReaction(PET_MAX_AT + 1)).toBe('normal')
  expect(petReaction(PET_TICKLE_FROM)).toBe('tickle')
})

it('なでた日に1スタンプ、10こでチケット', async () => {
  const { loadPetStamps, stampPet } = await import('./pet')
  localStorage.clear()
  let s = loadPetStamps()
  let r = stampPet(s, 'd1')
  expect(r.stamps.n).toBe(1)
  expect(stampPet(r.stamps, 'd1').stamps.n).toBe(1)
  s = { n: 9, last: 'd8' }
  r = stampPet(s, 'd9')
  expect(r.ticket).toBe(true)
  expect(loadPetStamps()).toEqual({ n: 10, last: 'd9' })
})
