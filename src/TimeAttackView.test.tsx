import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TimeAttack } from './TimeAttackView'
import { addTop, loadBest, TIME_LIMIT } from './timeAttack'
import { WORDS } from './words'

function answerCorrect() {
  const en = document.querySelector('.quiz .en')!.textContent
  const word = WORDS.find((w) => w.en === en)!
  fireEvent.click(screen.getByRole('button', { name: word.ja }))
}

describe('TimeAttack', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })
  afterEach(() => vi.useRealTimers())

  it('60秒で終了し、正解数を自己ベストとして保存する', () => {
    const onAnswer = vi.fn()
    render(<TimeAttack words={WORDS} onAnswer={onAnswer} />)
    expect(screen.getByText('自己ベスト 0 問')).toBeInTheDocument()
    fireEvent.click(screen.getByText('スタート'))
    expect(screen.getByText(`⏱ ${TIME_LIMIT}秒`)).toBeInTheDocument()
    answerCorrect()
    answerCorrect()
    answerCorrect()
    expect(screen.getByText('3 問')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledTimes(3)
    expect(onAnswer).toHaveBeenCalledWith(true, 10, expect.any(String), 'quiz')
    act(() => vi.advanceTimersByTime(TIME_LIMIT * 1000))
    expect(screen.getByText('タイムアップ！')).toBeInTheDocument()
    expect(screen.getByText('3 問正解')).toBeInTheDocument()
    expect(screen.getByText('自己ベスト更新！')).toBeInTheDocument()
    expect(loadBest()).toBe(3)
  })

  it('自己ベストに届かなければ更新しない', () => {
    localStorage.setItem('eitan:best-time-attack', '5')
    render(<TimeAttack words={WORDS} />)
    fireEvent.click(screen.getByText('スタート'))
    answerCorrect()
    act(() => vi.advanceTimersByTime(TIME_LIMIT * 1000))
    expect(screen.getByText('自己ベスト 5 問')).toBeInTheDocument()
    expect(loadBest()).toBe(5)
  })
})

it('上位5回の記録が残る', () => {
  expect(addTop([{ score: 3, day: 'a' }], 5, 'b')).toEqual([
    { score: 5, day: 'b' },
    { score: 3, day: 'a' },
  ])
  const many = [9, 8, 7, 6, 5].map((n) => ({ score: n, day: 'x' }))
  expect(addTop(many, 1, 'y')).toEqual(many)
})

it('30秒を選ぶと30秒で終わり、自己ベストは長さごと', () => {
  vi.useFakeTimers()
  localStorage.clear()
  render(<TimeAttack words={WORDS} />)
  fireEvent.click(screen.getByText('30秒'))
  fireEvent.click(screen.getByText('スタート'))
  answerCorrect()
  act(() => vi.advanceTimersByTime(30 * 1000))
  expect(screen.getByText('タイムアップ！')).toBeInTheDocument()
  expect(localStorage.getItem('eitan:best-time-attack-30')).toBe('1')
  expect(loadBest()).toBe(0)
  vi.useRealTimers()
})
