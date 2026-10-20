import { beforeEach, describe, expect, it } from 'vitest'
import { buildQueue, DAILY_NEW_LIMIT, loadDailyNew, saveDailyNew, type ProgressMap } from './srs'

const words = Array.from({ length: 30 }, (_, i) => ({ id: `w${i}` }))
const today = '2026-10-20'

describe('1日の新出上限', () => {
  beforeEach(() => localStorage.clear())

  it('新出は初期値10語まで', () => {
    expect(DAILY_NEW_LIMIT).toBe(10)
    expect(buildQueue(words, {}, today, 0)).toHaveLength(10)
  })

  it('今日すでに出した新出の分だけ減り、上限に達したら新出は出ない', () => {
    expect(buildQueue(words, {}, today, 7)).toHaveLength(3)
    expect(buildQueue(words, {}, today, 10)).toHaveLength(0)
  })

  it('復習を新出より先に出し、復習は上限に数えない', () => {
    const progress: ProgressMap = {
      w20: { box: 1, due: today },
      w21: { box: 2, due: '2026-10-19' },
      w22: { box: 3, due: '2026-10-25' }, // まだ期日でない
    }
    const q = buildQueue(words, progress, today, 10)
    expect(q.map((w) => w.id)).toEqual(['w20', 'w21'])
    const q2 = buildQueue(words, progress, today, 0)
    expect(q2.slice(0, 2).map((w) => w.id)).toEqual(['w20', 'w21'])
    expect(q2).toHaveLength(12)
  })

  it('日付が変わると新出カウントはリセットされる', () => {
    saveDailyNew({ day: '2026-10-19', count: 10 })
    expect(loadDailyNew(today)).toEqual({ day: today, count: 0 })
    saveDailyNew({ day: today, count: 4 })
    expect(loadDailyNew(today)).toEqual({ day: today, count: 4 })
  })
})

it('今日「まだ」にした単語は後回しになり、続けて同じ単語が出ない', () => {
  const words = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
  const progress: ProgressMap = { a: { box: 0, due: '2026-10-20' }, c: { box: 2, due: '2026-10-20' } }
  expect(buildQueue(words, progress, '2026-10-20', 0).map((w) => w.id)).toEqual(['c', 'b', 'a'])
})
