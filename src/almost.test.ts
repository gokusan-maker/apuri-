import { expect, it } from 'vitest'
import { almostUnits, GRAMMAR } from './grammar'

it('あと1問で全問正解の単元を出す（最大3こ）', () => {
  const [a, b, c, d, e] = GRAMMAR
  const r = { [a.id]: a.questions.length - 1, [b.id]: b.questions.length, [c.id]: c.questions.length - 1, [d.id]: d.questions.length - 1, [e.id]: e.questions.length - 1 }
  expect(almostUnits(r)).toEqual([a, c, d])
  expect(almostUnits({})).toEqual([])
})
