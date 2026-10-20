import { beforeEach, describe, expect, it } from 'vitest'
import { applyTheme, DEFAULT_SETTINGS, loadLevels, loadSettings, saveLevels, saveSettings, toggleLevel } from './settings'
import { LEVELS } from './words'

describe('単語帳の選択', () => {
  beforeEach(() => localStorage.clear())

  it('初期値は全レベル', () => {
    expect(loadLevels()).toEqual(LEVELS)
  })

  it('切り替えはレベル順を保ち、最後の1つは外せない', () => {
    expect(toggleLevel(['中1', '中3'], '中2')).toEqual(['中1', '中2', '中3'])
    expect(toggleLevel(['中1', '中2'], '中1')).toEqual(['中2'])
    expect(toggleLevel(['中2'], '中2')).toEqual(['中2'])
  })

  it('保存と読み込み。知らない値は無視', () => {
    saveLevels(['中3'])
    expect(loadLevels()).toEqual(['中3'])
    localStorage.setItem('eitan:levels', '["大学"]')
    expect(loadLevels()).toEqual(LEVELS)
  })
})

describe('設定', () => {
  beforeEach(() => localStorage.clear())

  it('初期値と保存・読み込み、範囲外は初期値に戻す', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
    const s = { rate: 0.8, accent: 'en-GB', theme: 'dark', sound: false, dailyGoal: 30, autoSpeak: true, cardJaFirst: true, largeText: true, color: 'green', hideExampleJa: true, randomNew: true, testDate: '2026-12-01', reviewCap: 50, easy: true, newPerDay: 15, voice: 'Samantha' } as const
    saveSettings(s)
    expect(loadSettings()).toEqual(s)
    localStorage.setItem('eitan:settings', '{"rate":9,"accent":"fr","theme":"pink"}')
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('ダークモードの手動切替は html の data-theme で行う', () => {
    const root = document.createElement('html')
    applyTheme('dark', root)
    expect(root.dataset.theme).toBe('dark')
    applyTheme('system', root)
    expect(root.dataset.theme).toBeUndefined()
  })
})
