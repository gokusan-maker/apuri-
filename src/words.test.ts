import { describe, expect, it } from 'vitest'
import { levelOf, LEVELS, WORDS, wordsOf } from './words'

describe('WORDS', () => {
  it('中学158語＋高校基礎30語あり、id が重複しない', () => {
    expect(WORDS).toHaveLength(188)
    expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length)
    expect(WORDS.filter((w) => levelOf(w) === '高校基礎')).toHaveLength(30)
  })

  it('すべての単語に訳と例文があり、例文に見出し語（またはその変化形）が含まれる', () => {
    for (const w of WORDS) {
      expect(w.ja, w.id).not.toBe('')
      expect(w.exampleJa, w.id).not.toBe('')
      expect(w.example.toLowerCase(), w.id).toContain(w.en.slice(0, 3))
    }
  })

  it('どのレベルにも単語があり、レベルで絞り込める', () => {
    for (const l of LEVELS) expect(wordsOf([l]).length, l).toBeGreaterThanOrEqual(30)
    expect(wordsOf(['中2']).length).toBeGreaterThanOrEqual(50)
    expect(wordsOf(['中3']).length).toBeGreaterThanOrEqual(50)
    expect(wordsOf([...LEVELS])).toHaveLength(WORDS.length)
    expect(wordsOf(['中1']).every((w) => levelOf(w) === '中1')).toBe(true)
  })
})
