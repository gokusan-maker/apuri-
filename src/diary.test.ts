import { describe, expect, it } from 'vitest'
import { loadDiary, recentDiary, saveDiary, writeDiary } from './diary'

describe('英語日記', () => {
  it('書く・消す・新しい順・保存（こわれた値は捨てる）', () => {
    let d = writeDiary({}, '2026-10-19', ' I played soccer. ')
    d = writeDiary(d, '2026-10-20', 'Today I studied English.')
    expect(recentDiary(d).map(([k]) => k)).toEqual(['2026-10-20', '2026-10-19'])
    expect(d['2026-10-19']).toBe('I played soccer.')
    expect(writeDiary(d, '2026-10-19', '  ')['2026-10-19']).toBeUndefined()
    localStorage.clear()
    saveDiary(d)
    expect(loadDiary()).toEqual(d)
    localStorage.setItem('eitan:diary', '{"x":"a","2026-10-01":3}')
    expect(loadDiary()).toEqual({})
  })
})
