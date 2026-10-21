import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { makeSpot, spotSet } from './grammarspot'

it('まちがいさがしは、正しい文か、まちがった語の文になる', () => {
  const q = GRAMMAR[0].questions[0]
  const ok = makeSpot(q, 0.1, 0)
  expect(ok.correct).toBe(true)
  expect(ok.text).toBe(q.sentence.replace('___', q.choices[q.answer]))
  const ng = makeSpot(q, 0.9, 0)
  expect(ng.correct).toBe(false)
  expect(ng.text).not.toBe(ok.text)
  expect(ng.right).toBe(ok.text)
  const set = spotSet(10)
  expect(set).toHaveLength(10)
  expect(new Set(set.map((x) => x.right)).size).toBe(10)
})
