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
  let seed = 1
  const rng = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  const set = spotSet(10, rng)
  expect(set).toHaveLength(10)
  expect(new Set(set.map((x) => x.right)).size).toBeGreaterThanOrEqual(9) // 同じ文の問題が別の単元にあることもある
})

it('「何も入らない」が正解の問題は、空欄なしの文になる', () => {
  const q = { sentence: 'Is this the bag ___ you lost?', choices: ['who', 'you', '（何も入らない）'], answer: 2, why: '' }
  expect(makeSpot(q, 0.1, 0).text).toBe('Is this the bag you lost?')
  expect(makeSpot(q, 0.9, 0).text).toBe('Is this the bag who you lost?')
})
