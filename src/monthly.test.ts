import { expect, it } from 'vitest'
import { annivMonths, annivText } from './monthly'

it('出会った日と同じ日付が記念日（短い月は月末）', () => {
  expect(annivMonths('2026-09-21', '2026-10-21')).toBe(1)
  expect(annivMonths('2026-09-21', '2026-10-20')).toBe(0)
  expect(annivMonths('2026-10-21', '2026-10-21')).toBe(0) // 出会った当日はまだ
  expect(annivMonths(undefined, '2026-10-21')).toBe(0)
  expect(annivMonths('2026-01-31', '2026-02-28')).toBe(1)
  expect(annivMonths('2025-10-21', '2026-10-21')).toBe(12)
  expect(annivText('モチ', 12)).toMatch(/1年の記念日/)
  expect(annivText('モチ', 2)).toMatch(/2か月の記念日/)
})
