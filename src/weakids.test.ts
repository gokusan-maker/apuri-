import { expect, it } from 'vitest'
import { GRAMMAR, weakIdsOf } from './grammar'

it('まちがいノートの問題から、まちがえたことがある単元を出す', () => {
  expect(weakIdsOf([GRAMMAR[2].questions[1].sentence, 'unknown'])).toEqual([GRAMMAR[2].id])
  expect(weakIdsOf([])).toEqual([])
})
