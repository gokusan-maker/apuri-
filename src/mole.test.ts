import { expect, it } from 'vitest'
import { loadMoleBest, makeRound, MOLE_HOLES, recordMoleBest } from './mole'
import { wordsOf } from './words'

it('もぐらは3匹で、正解の単語が1匹だけ', () => {
  let seed = 3
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  const words = wordsOf(['中1'])
  for (let k = 0; k < 20; k++) {
    const r = makeRound(words, rnd)
    expect(r.holes).toHaveLength(MOLE_HOLES)
    const up = r.holes.filter((w) => w)
    expect(up).toHaveLength(3)
    expect(up.filter((w) => w!.ja === r.target.ja)).toHaveLength(1)
  }
})

it('ベスト記録は上回ったときだけ', () => {
  localStorage.clear()
  expect(loadMoleBest()).toBe(0)
  expect(recordMoleBest(5)).toBe(true)
  expect(recordMoleBest(5)).toBe(false)
  expect(recordMoleBest(7)).toBe(true)
  expect(loadMoleBest()).toBe(7)
})
