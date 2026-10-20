import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TimeAttack } from './TimeAttackView'
import { loadBest, TIME_LIMIT } from './timeAttack'
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
    expect(onAnswer).toHaveBeenCalledWith(true, 10)
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
