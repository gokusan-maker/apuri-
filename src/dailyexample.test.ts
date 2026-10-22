import { expect, it } from 'vitest'
import { dailyExample, GRAMMAR } from './grammar'

it('今日のひとこと例文は単元の例文から日替わりで1つ（同じ日は同じ）', () => {
  const a = dailyExample('2026-10-22')
  expect(a).toEqual(dailyExample('2026-10-22'))
  expect(GRAMMAR.some((u) => u === a.unit && u.examples.some((e) => e.en === a.en && e.ja === a.ja))).toBe(true)
  const days = Array.from({ length: 10 }, (_, i) => dailyExample(`2026-11-${String(i + 1).padStart(2, '0')}`).en)
  expect(new Set(days).size).toBeGreaterThan(3)
})
