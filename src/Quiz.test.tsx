import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Quiz } from './Quiz'
import { WORDS } from './words'

describe('Quiz', () => {
  it('正解を選ぶと「正解！」、最後に結果と「もう1回」が出る', () => {
    const words = WORDS.slice(0, 6)
    render(<Quiz words={words} count={2} />)
    for (let n = 0; n < 2; n++) {
      const en = screen.getByText(/^[a-z]+$/).textContent
      const word = words.find((w) => w.en === en)!
      fireEvent.click(screen.getByRole('button', { name: word.ja }))
      expect(screen.getByText('正解！')).toBeInTheDocument()
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('2 / 2 問正解')).toBeInTheDocument()
    fireEvent.click(screen.getByText('もう1回'))
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })

  it('間違えると正しい答えを見せる', () => {
    const words = WORDS.slice(0, 6)
    render(<Quiz words={words} count={1} />)
    const en = screen.getByText(/^[a-z]+$/).textContent
    const word = words.find((w) => w.en === en)!
    const wrong = screen.getAllByRole('button').find((b) => b.textContent !== word.ja)!
    fireEvent.click(wrong)
    expect(screen.getByText(`正解は「${word.ja}」`)).toBeInTheDocument()
  })
})
