import { expect, it } from 'vitest'
import { kimochiDiary } from './kimochi'

it('相棒のきもち日記は今日の学習量でかわる', () => {
  expect(kimochiDiary(0).icon).toBe('🥺')
  expect(kimochiDiary(5).icon).toBe('🙂')
  expect(kimochiDiary(10).icon).toBe('😊')
  expect(kimochiDiary(30).icon).toBe('🤩')
  expect(new Set([0, 5, 10, 30].map((n) => kimochiDiary(n).text)).size).toBe(4)
})
