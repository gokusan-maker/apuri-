import { describe, expect, it } from 'vitest'
import { hintText, isCorrectSpelling, spellXp } from './spell'

describe('spell', () => {
  it('大文字小文字と前後の空白は気にしない', () => {
    expect(isCorrectSpelling(' Apple ', 'apple')).toBe(true)
    expect(isCorrectSpelling('aple', 'apple')).toBe(false)
  })

  it('ヒントは1文字ずつ増え、最後の1文字は見せない', () => {
    expect(hintText('apple', 0)).toBe('_ _ _ _ _')
    expect(hintText('apple', 1)).toBe('a _ _ _ _')
    expect(hintText('apple', 9)).toBe('a p p l _')
  })

  it('ヒントを使うとXPは少なめ', () => {
    expect(spellXp(0)).toBeGreaterThan(spellXp(1))
  })
})
