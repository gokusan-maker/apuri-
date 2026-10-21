import { beforeEach, expect, it } from 'vitest'
import { addMood, boosted, loadMood, MOOD_MAX, moodFull, moodNow, saveMood } from './moodmeter'

beforeEach(() => localStorage.clear())

it('ごきげんは1日ごとにたまり、満タンでXP1.2倍', () => {
  const d = '2026-10-21'
  let m = loadMood()
  expect(moodNow(m, d)).toBe(0)
  m = addMood(m, d, 3)
  m = addMood(m, d, 30)
  expect(moodNow(m, d)).toBe(MOOD_MAX)
  expect(moodFull(m, d)).toBe(true)
  expect(moodNow(m, '2026-10-22')).toBe(0)
  saveMood(m)
  expect(loadMood()).toEqual(m)
  expect(boosted(10, true)).toBe(12)
  expect(boosted(10, false)).toBe(10)
  expect(boosted(0, true)).toBe(0)
})
