import { describe, expect, it } from 'vitest'
import { blankIdioms } from './longvocab'
import { LONG_PASSAGES, type LongPassage } from './longreading'

describe('長文のよく出る熟語', () => {
  it('空所に答えを入れてできる熟語を数える', () => {
    const p: LongPassage = {
      id: 't', title: 't', level: '中2', ja: [], tf: [],
      paragraphs: ['Thank you ( A ) your help. I am looking ( B ) my key.'],
      blanks: [
        { id: 'A', choices: ['for', 'at'], answer: 0, why: '' },
        { id: 'B', choices: ['at', 'for'], answer: 1, why: '' },
      ],
    }
    const list = blankIdioms([p, p])
    expect(list.find((x) => x.w.en === 'thank you for')?.count).toBe(2)
    expect(list.every((x) => x.w.en.split(' ').some((t) => t === 'for' || t === 'at'))).toBe(true)
  })
  it('実際の長文からも熟語が見つかる', () => {
    expect(blankIdioms(LONG_PASSAGES).length).toBeGreaterThan(5)
  })
})
