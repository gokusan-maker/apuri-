import { describe, expect, it } from 'vitest'
import { WORDS } from './words'

describe('WORDS', () => {
  it('100語あり、id が重複しない', () => {
    expect(WORDS).toHaveLength(100)
    expect(new Set(WORDS.map((w) => w.id)).size).toBe(100)
  })

  it('すべての単語に訳と例文があり、例文に見出し語（またはその変化形）が含まれる', () => {
    for (const w of WORDS) {
      expect(w.ja, w.id).not.toBe('')
      expect(w.exampleJa, w.id).not.toBe('')
      expect(w.example.toLowerCase(), w.id).toContain(w.en.slice(0, 3))
    }
  })
})
