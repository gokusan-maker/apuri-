import { describe, expect, it } from 'vitest'
import { dailyShort, loadDailyShortDay, saveDailyShortDay, todayWords, wordsInText } from './dailyread'
import { PASSAGES } from './reading'

describe('今日の読解と今日の単語', () => {
  it('今日の読解は日ごとに決まる短い英文', () => {
    expect(dailyShort('2026-10-22')).toBe(dailyShort('2026-10-22'))
    expect(PASSAGES).toContain(dailyShort('2026-10-22'))
  })

  it('今日の単語は今日の読解の英文に出てくる単語（かんたんすぎる語はのぞく）', () => {
    for (const d of ['2026-10-22', '2026-10-23', '2026-11-05']) {
      const p = dailyShort(d)
      const ws = todayWords(d)
      expect(ws.length).toBeGreaterThanOrEqual(3)
      expect(ws.length).toBeLessThanOrEqual(5)
      for (const w of ws) expect(p.text.toLowerCase()).toContain(w.en.toLowerCase().slice(0, 3))
    }
    expect(wordsInText('I have a cat.').map((w) => w.en)).not.toContain('a')
  })

  it('どの短い読解からも3語以上とれる', () => {
    for (const p of PASSAGES) expect(wordsInText(p.text).length, p.id).toBeGreaterThanOrEqual(3)
  })

  it('クリアした日を覚える', () => {
    localStorage.clear()
    saveDailyShortDay('2026-10-22')
    expect(loadDailyShortDay()).toBe('2026-10-22')
  })
})

describe('トリオボーナスの連続日数', () => {
  it('続けて受け取ると日数がのび、3日ごとにチケット。1日あくと1にもどる', async () => {
    const { claimTrioStreak } = await import('./dailyread')
    localStorage.clear()
    expect(claimTrioStreak('2026-10-20')).toEqual({ count: 1, ticket: false, week: false })
    expect(claimTrioStreak('2026-10-21')).toEqual({ count: 2, ticket: false, week: false })
    expect(claimTrioStreak('2026-10-21')).toEqual({ count: 2, ticket: false, week: false }) // 同じ日は数えない
    expect(claimTrioStreak('2026-10-22')).toEqual({ count: 3, ticket: true, week: false })
    expect(claimTrioStreak('2026-10-24')).toEqual({ count: 1, ticket: false, week: false })
    expect(claimTrioStreak('2026-10-31')).toEqual({ count: 1, ticket: false, week: false })
    expect(claimTrioStreak('2026-11-01')).toEqual({ count: 2, ticket: false, week: false }) // 月をまたいでもつながる
  })
})

describe('トリオボーナス7日連続', () => {
  it('7日目は特別ボーナス', async () => {
    const { claimTrioStreak } = await import('./dailyread')
    localStorage.clear()
    let r = claimTrioStreak('2026-10-01')
    for (let d = 2; d <= 7; d++) r = claimTrioStreak(`2026-10-0${d}`)
    expect(r).toEqual({ count: 7, ticket: false, week: true })
  })
})

describe('いまのトリオ連続日数', () => {
  it('きのうまで続いていれば今の日数、とぎれていれば0', async () => {
    const { claimTrioStreak, trioStreakNow } = await import('./dailyread')
    localStorage.clear()
    claimTrioStreak('2026-10-20')
    claimTrioStreak('2026-10-21')
    expect(trioStreakNow('2026-10-22')).toBe(2)
    expect(trioStreakNow('2026-10-24')).toBe(0)
  })
})
