import { describe, expect, it } from 'vitest'
import { quizShareText, shareText } from './shareText'

describe('結果のシェア', () => {
  it('テキスト', () => {
    expect(quizShareText('英→日', 9, 10)).toBe('えいたんで「英→日」10問中9問正解（90%） #えいたん')
    expect(quizShareText('英→日', 10, 10)).toContain('👑')
  })
  it('共有メニューがなければコピー', async () => {
    let copied = ''
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true })
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (t: string) => void (copied = t) }, configurable: true })
    expect(await shareText('abc')).toBe('copied')
    expect(copied).toBe('abc')
  })
})
