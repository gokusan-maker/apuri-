import { describe, expect, it } from 'vitest'
import { isRight, parseAnswer, pickNumber, timeQ, toEnglish, wordIdOf } from './numbers'
import { WORDS } from './words'

describe('numbers', () => {
  it('英語の読み方', () => {
    expect(toEnglish(13)).toBe('thirteen')
    expect(toEnglish(30)).toBe('thirty')
    expect(toEnglish(47)).toBe('forty-seven')
    expect(toEnglish(105)).toBe('one hundred five')
    expect(toEnglish(999)).toBe('nine hundred ninety-nine')
    expect(toEnglish(2026)).toBe('two thousand twenty-six')
  })
  it('記録用の単語idは数の単語帳にある', () => {
    for (const n of [0, 7, 13, 30, 47, 100, 999, 1000]) {
      const id = wordIdOf(n)
      if (n === 0) continue
      expect(WORDS.some((w) => w.id === id), id).toBe(true)
    }
  })
  it('出題は 13〜999 の範囲', () => {
    for (let i = 0; i < 200; i++) {
      const n = pickNumber()
      expect(n).toBeGreaterThanOrEqual(13)
      expect(n).toBeLessThan(1000)
    }
    expect(pickNumber(() => 0)).toBe(13)
  })
  it('入力を数にする', () => {
    expect(parseAnswer(' 47 ')).toBe(47)
    expect(parseAnswer('１３')).toBe(13)
    expect(parseAnswer('1,000')).toBe(1000)
    expect(parseAnswer('abc')).toBeNull()
  })
})

describe('時刻', () => {
  it('読み方と答え', () => {
    // h = 1 + floor(r*12), m = floor(r*12)*5
    const seq = (xs: number[]) => () => xs.shift()!
    expect(timeQ(seq([6 / 12, 6 / 12]))).toMatchObject({ say: 'seven thirty', answer: '7:30' })
    expect(timeQ(seq([0, 0]))).toMatchObject({ say: "one o'clock", answer: '1:00' })
    expect(timeQ(seq([11 / 12, 1 / 12]))).toMatchObject({ say: 'twelve oh five', answer: '12:05' })
  })
  it('入力の判定', () => {
    const q = { kind: 'time' as const, say: '', answer: '7:30', id: 'seven' }
    expect(isRight(q, '7:30')).toBe(true)
    expect(isRight(q, '07:30')).toBe(true)
    expect(isRight(q, '７：３０')).toBe(true)
    expect(isRight(q, '7:03')).toBe(false)
    expect(isRight({ kind: 'number', say: '', answer: '13', id: 'thirteen' }, '13')).toBe(true)
  })
})
