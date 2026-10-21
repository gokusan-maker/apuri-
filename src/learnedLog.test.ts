import { describe, expect, it } from 'vitest'
import { lastLearned, loadLearnedLog, recordLearned, saveLearnedLog } from './learnedLog'

describe('定着の記録', () => {
  it('記録して、最近の日は前の日の数でうめる', () => {
    let log = recordLearned({}, '2026-10-18', 5)
    log = recordLearned(log, '2026-10-20', 8)
    expect(recordLearned(log, '2026-10-20', 8)).toBe(log)
    expect(lastLearned(log, '2026-10-20', 4)).toEqual([0, 5, 5, 8])
    expect(recordLearned({ '2024-01-01': 1 }, '2026-10-20', 2)).toEqual({ '2026-10-20': 2 })
  })
  it('保存と読み込み（こわれた値は捨てる）', () => {
    localStorage.clear()
    saveLearnedLog({ '2026-10-20': 3 })
    expect(loadLearnedLog()).toEqual({ '2026-10-20': 3 })
    localStorage.setItem('eitan:learned-log', '{"x":1,"2026-10-01":"a"}')
    expect(loadLearnedLog()).toEqual({})
  })
})
