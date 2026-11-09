import { describe, expect, it } from 'vitest'
import { WORDS } from './words'

// 同じ例文を2つの単語で使い回さない（どの単語の例文かわからなくなるため）
describe('単語の例文の重複', () => {
  it('例文はすべての単語でちがう', () => {
    const seen = new Map<string, string>()
    const dups: string[] = []
    for (const w of WORDS) {
      if (!w.example) continue
      const key = w.example.trim().toLowerCase()
      const prev = seen.get(key)
      if (prev && prev !== w.word) dups.push(`${prev} / ${w.word}: ${w.example}`)
      else seen.set(key, w.word)
    }
    expect(dups).toEqual([])
  })
})
