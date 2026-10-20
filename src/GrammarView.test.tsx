import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { Grammar } from './GrammarView'

describe('文法ミニ解説', () => {
  it('解説を読んで3問に答え、全問正解で記録が残る', () => {
    localStorage.clear()
    const onAnswer = vi.fn()
    render(<Grammar onAnswer={onAnswer} />)
    const unit = GRAMMAR[0]
    fireEvent.click(screen.getByText(unit.title))
    expect(screen.getByText(unit.points[0])).toBeInTheDocument()
    fireEvent.click(screen.getByText('確認問題へ（3問）'))
    for (const q of unit.questions) {
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      expect(screen.getByText(q.why)).toBeInTheDocument()
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('3 / 3 問正解')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledTimes(3)
    expect(JSON.parse(localStorage.getItem('eitan:grammar')!)).toEqual({ [unit.id]: 3 })
    fireEvent.click(screen.getByText('← 単元一覧'))
    expect(screen.getByText('3 / 3 👑')).toBeInTheDocument()
  })
})

it('まとめテストは全単元からランダムに10問', () => {
  render(<Grammar />)
  fireEvent.click(screen.getByText('📝 まとめテスト（ランダム10問）'))
  expect(screen.getByText(/^1 \/ 10/)).toBeInTheDocument()
})
