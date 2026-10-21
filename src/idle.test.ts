import { expect, it } from 'vitest'
import { IDLE_CYCLE, idleAt } from './idle'

it('相棒は歩く・あくび・ぴょんをくり返し、ねむい時間は眠る', () => {
  expect(idleAt(0, false)).toBe('walk')
  expect(IDLE_CYCLE).toContain('yawn')
  expect(IDLE_CYCLE).toContain('hop')
  expect(idleAt(IDLE_CYCLE.length, false)).toBe(idleAt(0, false))
  expect(idleAt(3, true)).toBe('sleep')
})
