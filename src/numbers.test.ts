import { describe, expect, it } from 'vitest'
import { dateQ, isRight, ordinal, parseAnswer, pickNumber, timeQ, toEnglish, wordIdOf } from './numbers'
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

describe('日付', () => {
  it('序数', () => {
    expect([1, 2, 3, 4, 5, 8, 9, 12, 20, 21, 22, 23, 30, 31].map(ordinal)).toEqual(['first', 'second', 'third', 'fourth', 'fifth', 'eighth', 'ninth', 'twelfth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third', 'thirtieth', 'thirty-first'])
  })
  it('読み方と答え・入力の判定', () => {
    const seq = (xs: number[]) => () => xs.shift()!
    const q = dateQ(seq([4 / 12, 2 / 31]))
    expect(q).toMatchObject({ say: 'May third', answer: '5/3', id: 'may' })
    expect(isRight(q, '5/3')).toBe(true)
    expect(isRight(q, '05/03')).toBe(true)
    expect(isRight(q, '5月3日')).toBe(true)
    expect(isRight(q, '3/5')).toBe(false)
  })
  it('月の単語idは単語帳にある', () => {
    for (let i = 0; i < 12; i++) expect(WORDS.some((w) => w.id === dateQ(() => i / 12).id)).toBe(true)
  })
})
