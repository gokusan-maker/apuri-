import { expect, it } from 'vitest'
import { dailyQuestion, loadQDay, saveQDay } from './grammarq'

it('今日の文法1問は日付で決まる', () => {
  expect(dailyQuestion('2026-10-20')).toEqual(dailyQuestion('2026-10-20'))
  const set = new Set(Array.from({ length: 20 }, (_, i) => dailyQuestion(`2026-11-${String(i + 1).padStart(2, '0')}`).q.sentence))
  expect(set.size).toBeGreaterThan(10)
  localStorage.clear()
  expect(loadQDay()).toBe('')
  saveQDay('d')
  expect(loadQDay()).toBe('d')
})
