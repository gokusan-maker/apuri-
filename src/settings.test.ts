import { beforeEach, describe, expect, it } from 'vitest'
import { loadLevels, saveLevels, toggleLevel } from './settings'
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
