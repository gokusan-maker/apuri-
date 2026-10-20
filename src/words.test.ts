import { describe, expect, it } from 'vitest'
import { levelOf, LEVELS, WORDS, wordsOf } from './words'

describe('WORDS', () => {
  it('中学563語＋高校基礎140語＋熟語120＋曜日・月25＋テーマ別151＋数44＋色・形24＋会話40あり、id が重複しない', () => {
    expect(WORDS).toHaveLength(1107)
    expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length)
    expect(WORDS.filter((w) => levelOf(w) === '高校基礎')).toHaveLength(140)
  })

  it('すべての単語に訳と例文があり、例文に見出し語（またはその変化形）が含まれる', () => {
    for (const w of WORDS) {
      expect(w.ja, w.id).not.toBe('')
      expect(w.exampleJa, w.id).not.toBe('')
      const head = w.en.startsWith('be ') ? w.en.slice(3) : w.en // be 動詞の熟語は変化するので後ろで見る
      expect(w.example.toLowerCase(), w.id).toContain(head.slice(0, 3).toLowerCase())
    }
  })

  it('どのレベルにも単語があり、レベルで絞り込める', () => {
    for (const l of LEVELS) expect(wordsOf([l]).length, l).toBeGreaterThanOrEqual(19)
    expect(wordsOf(['中1']).length).toBeGreaterThanOrEqual(100)
    expect(wordsOf(['中2']).length).toBeGreaterThanOrEqual(100)
    expect(wordsOf(['中3']).length).toBeGreaterThanOrEqual(100)
    expect(wordsOf([...LEVELS])).toHaveLength(WORDS.length)
    expect(wordsOf(['中1']).every((w) => levelOf(w) === '中1')).toBe(true)
  })

  it('意味（ja）が重ならない（4択で同じ選択肢が出ないように）', () => {
    expect(new Set(WORDS.map((w) => w.ja)).size).toBe(WORDS.length)
  })
})
