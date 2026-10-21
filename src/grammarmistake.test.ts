import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { MISTAKES, mistakeOf } from './grammarmistake'

it('よくあるまちがいは実在する単元にあり、× と ○ がちがう', () => {
  const ids = new Set(GRAMMAR.map((u) => u.id))
  expect(Object.keys(MISTAKES).length).toBeGreaterThanOrEqual(20)
  for (const [id, m] of Object.entries(MISTAKES)) {
    expect(ids.has(id)).toBe(true)
    expect(m.wrong).not.toBe(m.right)
    expect(m.why.length).toBeGreaterThan(5)
  }
  expect(mistakeOf('nope')).toBeUndefined()
})
