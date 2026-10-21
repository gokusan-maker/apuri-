import { expect, it } from 'vitest'
import { duelTime, loadDuelBest, makeDuel, recordDuelBest } from './grammarduel'

it('2択は正しい文とまちがった文がちがい、10問ある', () => {
  let seed = 11
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  const qs = makeDuel(rnd)
  expect(qs).toHaveLength(10)
  for (const q of qs) {
    expect(q.right).not.toBe(q.wrong)
    expect(q.right).not.toContain('___')
  }
  expect(new Set(qs.map((q) => q.right)).size).toBe(10)
  const all = makeDuel(() => 0.999, 1000) // 乱数が同じでも止まらずに全部の問題を使う
  expect(all.length).toBeGreaterThan(200)
  for (const q of all) expect(q.right + q.wrong).not.toContain('（')
})

it('タイムはまちがい1つにつき+5秒、ベストは短いほう', () => {
  expect(duelTime(30, 2)).toBe(40)
  localStorage.clear()
  expect(recordDuelBest(40)).toBe(true)
  expect(recordDuelBest(45)).toBe(false)
  expect(recordDuelBest(35)).toBe(true)
  expect(loadDuelBest()).toBe(35)
})
