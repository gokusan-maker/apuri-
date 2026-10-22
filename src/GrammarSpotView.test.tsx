import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Grammar } from './GrammarView'

it('文法のまちがいさがしで○×に答えられる', () => {
  localStorage.clear()
  const onAnswer = vi.fn()
  render(<Grammar onAnswer={onAnswer} />)
  fireEvent.click(screen.getByText('まちがいさがし'))
  for (let i = 0; i < 10; i++) {
    fireEvent.click(screen.getByRole('button', { name: '正しい' }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(/\d+ \/ 10 問正解/)).toBeInTheDocument()
  expect(onAnswer).toHaveBeenCalledTimes(10)
})
