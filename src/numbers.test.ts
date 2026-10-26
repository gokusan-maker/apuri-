import { describe, expect, it } from 'vitest'
import { dateQ, isRight, ordinal, parseAnswer, pickNumber, priceQ, timeQ, toEnglish, wordIdOf } from './numbers'
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

describe('値段', () => {
  it('読み方と答え・入力の判定', () => {
    const seq = (xs: number[]) => () => xs.shift()!
    const q = priceQ(seq([2 / 20, 10 / 20]))
    expect(q).toMatchObject({ say: 'three dollars and fifty cents', answer: '3.50' })
    expect(isRight(q, '3.50')).toBe(true)
    expect(isRight(q, '$3.5')).toBe(true)
    expect(isRight(q, '＄３.５０')).toBe(true)
    expect(isRight(q, '3.05')).toBe(false)
    const one = priceQ(seq([0, 0]))
    expect(one).toMatchObject({ say: 'one dollar', answer: '1.00' })
    expect(isRight(one, '1')).toBe(true)
  })
})

it('数の聞き取りは4択：正解1つと、聞きまちがえやすい答え3つ（どれもちがう）', async () => {
  const { numChoices } = await import('./numbers')
  const qs = [
    { kind: 'number' as const, say: 'thirteen', answer: '13', id: 'x' },
    { kind: 'time' as const, say: 'seven thirty', answer: '7:30', id: 'x' },
    { kind: 'date' as const, say: 'May third', answer: '5/3', id: 'x' },
    { kind: 'price' as const, say: 'three dollars and fifty cents', answer: '3.50', id: 'x' },
  ]
  for (const q of qs) {
    const c = numChoices(q)
    expect(c).toHaveLength(4)
    expect(new Set(c).size).toBe(4)
    expect(c).toContain(q.answer)
  }
  expect(numChoices(qs[0])).toContain('30') // thirteen と thirty
})

it('数の聞き取りで全問正解すると「パーフェクト」', async () => {
  const { render, screen, fireEvent } = await import('@testing-library/react')
  const { createElement } = await import('react')
  const { Numbers } = await import('./NumbersView')
  const { vi } = await import('vitest')
  Object.assign(window, { SpeechSynthesisUtterance: class {}, speechSynthesis: { cancel() {}, speak() {}, getVoices: () => [] } })
  vi.spyOn(Math, 'random').mockReturnValue(0.9) // 毎回 902
  render(createElement(Numbers, { round: 2 }))
  for (let i = 0; i < 2; i++) {
    fireEvent.click(screen.getByRole('button', { name: '902' }))
    fireEvent.click(screen.getByText('次へ'))
  }
  vi.restoreAllMocks()
  expect(screen.getByText('🏆 パーフェクト！ 全問正解')).toBeInTheDocument()
  expect(screen.getByText(/自己ベスト更新！/)).toBeInTheDocument() // はじめてなので自己ベスト
  expect(localStorage.getItem('eitan:numbers-best')).toBe('2')
})
