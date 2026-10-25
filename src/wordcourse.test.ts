import { expect, it } from 'vitest'
import { COURSES, courseOf, courseReady } from './wordcourse'
import { WORDS } from './words'

it('単語コース：英検5級〜1級・2000語・3000語・ネイティブがある', () => {
  expect(COURSES.map((c) => c.label)).toEqual(['英検5級', '英検4級', '英検3級', '英検準2級', '英検2級', '英検準1級', '英検1級', '2000語', '3000語', 'ネイティブ'])
})

it('使えるコースはどれも単語がある。2000語は中学の語でおよそ2000語、3000語はそれより多い', () => {
  for (const c of COURSES.filter(courseReady)) expect(WORDS.some((w) => c.levels.includes(w.level!))).toBe(true)
  const n = (id: string) => WORDS.filter((w) => COURSES.find((c) => c.id === id)!.levels.includes(w.level!)).length
  expect(n('v2000')).toBeGreaterThanOrEqual(1800)
  expect(n('v2000')).toBeLessThanOrEqual(2200)
  expect(n('v3000')).toBeGreaterThan(n('v2000') + 800)
})

it('いまの単語帳からコースがわかる（順番がちがっても同じ）', () => {
  expect(courseOf(['中2'])?.label).toBe('英検4級')
  expect(courseOf(['熟語', '高校基礎'])?.label).toBe('英検準2級')
  expect(courseOf(['中1', '中2'])).toBeUndefined()
})
