import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Rival } from './RivalView'
import { WORDS } from './words'

const words = WORDS.slice(0, 40)
function answerRight() {
  const en = document.querySelector('.rival .en')!.textContent
  fireEvent.click(screen.getByRole('button', { name: words.find((w) => w.en === en)!.ja }))
}

describe('ライバル戦', () => {
  afterEach(() => vi.useRealTimers())

  it('先に5問正解すると勝ち', () => {
    const onWin = vi.fn()
    render(<Rival words={words} onWin={onWin} rng={() => 0.99} />)
    for (let i = 0; i < 5; i++) {
      answerRight()
      if (i < 4) fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('勝った！ 🎉')).toBeInTheDocument()
    expect(onWin).toHaveBeenCalledTimes(1)
  })

  it('もたもたしているとライバルが先に正解する', () => {
    vi.useFakeTimers()
    render(<Rival words={words} rng={() => 0.1} />)
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByText('ライバルが先に正解！')).toBeInTheDocument()
    expect(screen.getByLabelText('あなた 0 対 ライバル 1')).toBeInTheDocument()
  })
})
