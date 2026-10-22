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
