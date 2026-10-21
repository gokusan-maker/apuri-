import { expect, it } from 'vitest'
import { listenSet, makeListen } from './grammarlisten'

it('例文の1語を空所にして、正解をふくむ3択を作る', () => {
  const q = makeListen('I was glad to see my old friend.', '昔の友だちに会えてうれしかった。', 0, ['apple', 'river', 'happy'], () => 0.5)!
  expect(q.answer).toBe('was')
  expect(q.shown).toBe('I _____ glad to see my old friend.')
  expect(q.choices).toContain('was')
  expect(q.choices).toHaveLength(3)
  const set = listenSet(5)
  expect(set).toHaveLength(5)
  for (const x of set) {
    expect(x.choices).toContain(x.answer)
    expect(x.shown).toContain('_____')
  }
})
