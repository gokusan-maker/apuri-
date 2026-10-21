import { expect, it } from 'vitest'
import { loadTraining, POWER_MAX, saveTraining, trainDone } from './training'

it('全問正解でちから+1、最大5', () => {
  expect(trainDone({ power: 0, day: '' }, 'd', true)).toEqual({ power: 1, day: 'd' })
  expect(trainDone({ power: 2, day: '' }, 'd', false)).toEqual({ power: 2, day: 'd' })
  expect(trainDone({ power: POWER_MAX, day: '' }, 'd', true).power).toBe(POWER_MAX)
  localStorage.clear()
  expect(loadTraining()).toEqual({ power: 0, day: '' })
  saveTraining({ power: 9, day: 'x' })
  expect(loadTraining()).toEqual({ power: POWER_MAX, day: 'x' })
})
