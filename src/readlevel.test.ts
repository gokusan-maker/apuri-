import { describe, expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'
import { loadReadLevel, passagesFor, READ_LEVELS, saveReadLevel } from './readlevel'

describe('読解のむずかしさ', () => {
  it('かんたん〜TOEFL・IELTS まで5段階あり、かんたん以外は長文がある', () => {
    expect(READ_LEVELS.map((l) => l.label)).toEqual(['かんたん', 'ふつう', '高校入試', '難関大', 'TOEFL・IELTS'])
    for (const l of READ_LEVELS.filter((x) => x.id !== 'easy')) expect(passagesFor(l.id).length, l.id).toBeGreaterThanOrEqual(5)
    expect(passagesFor('univ').every((p) => p.level.startsWith('難関大'))).toBe(true)
  })

  it('えらんだむずかしさを覚える（はじめは かんたん）', () => {
    localStorage.clear()
    expect(loadReadLevel()).toBe('easy')
    saveReadLevel('toefl')
    expect(loadReadLevel()).toBe('toefl')
  })
})

describe('難関大・TOEFL/IELTS の長文', () => {
  it('空所が本文にあり、訳は段落と同じ数、選択肢の答えは範囲内', () => {
    const ids = new Set<string>()
    for (const p of ADV_PASSAGES) {
      expect(ids.has(p.id)).toBe(false)
      ids.add(p.id)
      expect(p.ja.length).toBe(p.paragraphs.length)
      const text = p.paragraphs.join(' ')
      for (const b of p.blanks) {
        expect(text).toContain(`( ${b.id} )`)
        expect(b.answer).toBeLessThan(b.choices.length)
        expect(new Set(b.choices).size).toBe(b.choices.length)
      }
      for (const q of p.qa ?? []) expect(q.answer).toBeLessThan(q.choices.length)
      const words = text.split(/\s+/).length
      expect(words, p.id).toBeGreaterThanOrEqual(150)
    }
  })
})

describe('むずかしさごとに解いた本数', () => {
  it('そのレベルで解いた本数と全部の本数（かんたんは数えない）', async () => {
    const { solvedOf } = await import('./readlevel')
    expect(solvedOf('easy', {})).toBeNull()
    const ps = passagesFor('univ')
    expect(solvedOf('univ', { [ps[0].id]: 5, 'cat': 3 })).toEqual({ done: 1, total: ps.length })
  })
})
