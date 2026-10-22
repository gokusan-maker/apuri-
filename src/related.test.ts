import { expect, it } from 'vitest'
import { GRAMMAR, gradeOf, relatedUnits } from './grammar'

it('関連する単元は同じ学年の前と次（最大2つ）', () => {
  for (const u of GRAMMAR.slice(0, 20)) {
    const r = relatedUnits(u.id)
    expect(r.length).toBeGreaterThanOrEqual(1)
    expect(r.length).toBeLessThanOrEqual(2)
    for (const x of r) {
      expect(gradeOf(x.id)).toBe(gradeOf(u.id))
      expect(x.id).not.toBe(u.id)
    }
  }
  expect(relatedUnits('nothing')).toEqual([])
})
