import { expect, it } from 'vitest'
import { gradeChallenge, LONG_PASSAGES } from './longreading'

it('中3チャレンジ：中3レベルの長文のうち、まだ解いていない最初の1本', () => {
  const ps = LONG_PASSAGES.filter((x) => x.level.startsWith('中3'))
  expect(ps.length).toBeGreaterThan(3)
  expect(gradeChallenge('中3', {})).toEqual({ next: ps[0], done: 0, total: ps.length })
  const r = gradeChallenge('中3', { [ps[0].id]: 5 })
  expect(r.next).toBe(ps[1])
  expect(r.done).toBe(1)
  expect(gradeChallenge('中3', Object.fromEntries(ps.map((x) => [x.id, 1]))).next).toBeNull()
})
