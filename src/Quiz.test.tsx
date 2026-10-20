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
      expect(screen.getByText(/正解！/)).toBeInTheDocument()
      if (n === 1) expect(screen.getByText('🔥2 コンボ！')).toBeInTheDocument()
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('2 / 2 問正解')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('+22')).toBeInTheDocument() // 10 + 12（2コンボ目はボーナス+2）
    expect(screen.getByText('パーフェクト！すごい！')).toBeInTheDocument()
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

describe('コンボ', () => {
  it('間違えるとコンボが切れ、正答率と最大コンボが結果に出る', () => {
    const words = WORDS.slice(0, 6)
    render(<Quiz words={words} count={3} />)
    const answerCorrect = () => {
      const en = document.querySelector('.quiz .en')!.textContent
      const word = words.find((w) => w.en === en)!
      fireEvent.click(screen.getByRole('button', { name: word.ja }))
      fireEvent.click(screen.getByText('次へ'))
    }
    answerCorrect()
    answerCorrect()
    const en = document.querySelector('.quiz .en')!.textContent
    const word = words.find((w) => w.en === en)!
    fireEvent.click(screen.getAllByRole('button').find((b) => b.textContent !== word.ja)!)
    expect(screen.queryByText(/コンボ！/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('次へ'))
    expect(screen.getByText('67%')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
