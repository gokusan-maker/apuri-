import { act, render } from '@testing-library/react'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { addTime, minutesToday, minutesWeek, type TimeLog } from './studyTime'
import { useStudyTime } from './useStudyTime'

describe('学習時間', () => {
  afterEach(() => vi.useRealTimers())

  it('日ごとに足し、今日と7日分を分で出す', () => {
    let log: TimeLog = { '2026-10-14': 600, '2026-10-13': 6000 }
    log = addTime(log, '2026-10-20', 90)
    log = addTime(log, '2026-10-20', 40)
    expect(minutesToday(log, '2026-10-20')).toBe(2)
    expect(minutesWeek(log, '2026-10-20')).toBe(12)
  })

  it('さわっていれば数え、しばらくさわらないと止まる', () => {
    vi.useFakeTimers()
    let latest: TimeLog = {}
    function Probe() {
      const [log, setLog] = useState<TimeLog>({})
      latest = log
      useStudyTime(setLog, '2026-10-20')
      return null
    }
    render(<Probe />)
    act(() => vi.advanceTimersByTime(30_000))
    expect(latest['2026-10-20']).toBe(30)
    act(() => vi.advanceTimersByTime(120_000))
    expect(latest['2026-10-20']).toBe(60) // 60秒さわらなければ止まる
    act(() => {
      window.dispatchEvent(new Event('pointerdown'))
      vi.advanceTimersByTime(10_000)
    })
    expect(latest['2026-10-20']).toBe(70)
  })
})
