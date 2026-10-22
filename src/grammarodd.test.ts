import { expect, it } from 'vitest'
import { makeOdd, sentencesOf } from './grammarodd'

it('なかま分けは4文で、ちがう1つだけ別の単元の文', () => {
  let seed = 3
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  for (let k = 0; k < 20; k++) {
    const q = makeOdd(rnd)
    expect(q.sentences).toHaveLength(4)
    expect(q.unit.id).not.toBe(q.other.id)
    q.sentences.forEach((t, i) => {
      if (i === q.odd) expect(sentencesOf(q.other)).toContain(t)
      else expect(sentencesOf(q.unit)).toContain(t)
    })
    for (const t of q.sentences) expect(t).not.toContain('___')
  }
})
