import { describe, expect, it } from 'vitest'
import { levelOf, LEVELS, WORDS, wordsOf } from './words'

describe('WORDS', () => {
  it('中学1373語＋高校基礎420語＋熟語200＋曜日・月25＋テーマ別394＋数44＋色・形24＋会話100あり、id が重複しない', () => {
    expect(WORDS).toHaveLength(2580)
    expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length)
    expect(WORDS.filter((w) => levelOf(w) === '高校基礎')).toHaveLength(420)
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

  it('例文は大文字（か数字）で始まり . ! ? で終わり、訳は 。！？ などで終わる', () => {
    for (const w of WORDS) {
      expect(w.example, w.id).toMatch(/^[A-Z0-9"']/)
      expect(w.example, w.id).toMatch(/[.!?"]$/)
      expect(w.exampleJa, w.id).toMatch(/[。！？）」]$/)
    }
  })
})

it('例文に見出し語（またはその変化形）が入っている', () => {
  const SKIP = new Set(['be', 'oneself', "one's", '...'])
  const IRREGULAR = new Set(['overcome']) // 例文が不規則な過去形
  const bad = WORDS.filter((w) => {
    if (!w.example || IRREGULAR.has(w.id)) return false
    const ex = w.example.toLowerCase()
    const parts = w.en.toLowerCase().replace(/[.?!]/g, '').split(/\s+/).filter((p) => p && !SKIP.has(p))
    return !parts.every((p) => ex.includes(p.slice(0, Math.max(3, p.length - 2))))
  })
  expect(bad.map((w) => w.id)).toEqual([])
})
