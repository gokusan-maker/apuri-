import { expect, it } from 'vitest'
import { GRAMMAR, searchUnits } from './grammar'

it('単元さがしは例文の日本語や確認問題の英文でも見つかる', () => {
  const u = GRAMMAR.find((x) => x.id === 'would-like')!
  expect(searchUnits(GRAMMAR, 'ケーキはいかが')).toContain(u)
  expect(searchUnits(GRAMMAR, 'a cup of coffee')).toContain(u)
})
