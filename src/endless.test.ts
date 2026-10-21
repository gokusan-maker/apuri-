import { beforeEach, expect, it } from 'vitest'
import { endlessHp, endlessLevel, endlessLook, loadEndlessBest, rewardsBetween, saveEndlessBest } from './endless'

beforeEach(() => localStorage.clear())

it('上の階ほど強く、むずかしい単語になる', () => {
  expect(endlessLevel(1)).toBe('中1')
  expect(endlessLevel(6)).toBe('中2')
  expect(endlessLevel(16)).toBe('高校基礎')
  expect(endlessHp(10)).toBeGreaterThan(endlessHp(1))
  expect(endlessLook(3).name.startsWith('3階の')).toBe(true)
})

it('10階ごとにごほうび、最高記録は保存される', () => {
  expect(rewardsBetween(0, 9)).toBe(0)
  expect(rewardsBetween(9, 10)).toBe(1)
  expect(rewardsBetween(10, 12)).toBe(0)
  expect(rewardsBetween(5, 21)).toBe(2)
  expect(loadEndlessBest()).toBe(0)
  saveEndlessBest(7)
  expect(loadEndlessBest()).toBe(7)
})
