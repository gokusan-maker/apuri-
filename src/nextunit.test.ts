import { expect, it } from 'vitest'
import { GRAMMAR, GRAMMAR_GRADES, gradeOf, nextUnit } from './grammar'

it('次の単元は同じ学年の次、学年の最後なら次の学年の最初。全部を1回ずつたどれる', () => {
  const first = GRAMMAR.find((u) => gradeOf(u.id) === GRAMMAR_GRADES[0])!
  const seen = new Set<string>()
  let u: ReturnType<typeof nextUnit> = first
  while (u) {
    expect(seen.has(u.id)).toBe(false)
    seen.add(u.id)
    u = nextUnit(u.id)
  }
  expect(seen.size).toBe(GRAMMAR.length)
  expect(nextUnit('mix-test')).toBeNull()
})
