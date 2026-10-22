import { describe, expect, it } from 'vitest'
import { birthdayAge, loadBirthday, registerBirthday, saveBirthday } from './birthday'

describe('相棒のおたんじょう日', () => {
  it('かえっていれば今日を誕生日として覚える（タマゴのままなら覚えない）', () => {
    expect(registerBirthday({ day: '', lastYear: 0 }, '2026-10-22', false).day).toBe('')
    expect(registerBirthday({ day: '', lastYear: 0 }, '2026-10-22', true).day).toBe('2026-10-22')
    expect(registerBirthday({ day: '2025-01-01', lastYear: 0 }, '2026-10-22', true).day).toBe('2025-01-01')
  })
  it('1年ごとの同じ日にお祝い。同じ年は1回だけ', () => {
    expect(birthdayAge({ day: '2025-10-22', lastYear: 0 }, '2026-10-22')).toBe(1)
    expect(birthdayAge({ day: '2024-10-22', lastYear: 0 }, '2026-10-22')).toBe(2)
    expect(birthdayAge({ day: '2025-10-22', lastYear: 2026 }, '2026-10-22')).toBe(0)
    expect(birthdayAge({ day: '2026-10-22', lastYear: 0 }, '2026-10-22')).toBe(0)
    expect(birthdayAge({ day: '2025-10-21', lastYear: 0 }, '2026-10-22')).toBe(0)
    expect(birthdayAge({ day: '2024-02-29', lastYear: 0 }, '2025-02-28')).toBe(1)
    expect(birthdayAge({ day: '2024-02-29', lastYear: 0 }, '2028-02-29')).toBe(4)
  })
  it('保存して読みこめる', () => {
    localStorage.clear()
    expect(loadBirthday()).toEqual({ day: '', lastYear: 0 })
    saveBirthday({ day: '2025-10-22', lastYear: 2026 })
    expect(loadBirthday()).toEqual({ day: '2025-10-22', lastYear: 2026 })
  })
})
