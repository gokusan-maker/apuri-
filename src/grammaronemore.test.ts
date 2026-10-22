import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { MISTAKES, oneMoreOf } from './grammarmistake'

it('「もう1問」は正しい文とまちがった文の2択で、正解は正しい文', () => {
  for (const u of GRAMMAR) {
    const q = oneMoreOf(u.id)!
    expect(q.choices).toHaveLength(2)
    expect(q.choices[q.answer]).toBe(MISTAKES[u.id].right)
  }
  const pos = new Set(GRAMMAR.map((u) => oneMoreOf(u.id)!.answer))
  expect(pos.size).toBe(2)
  expect(oneMoreOf('nothing')).toBeNull()
})
