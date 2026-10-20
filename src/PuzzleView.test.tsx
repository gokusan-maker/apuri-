import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Puzzle, PUZZLE_COUNT } from './PuzzleView'

it('10問で結果が出る', () => {
  const make = () => ({ prompt: 'どれ？', choices: ['a', 'b', 'c', 'd'], answer: 1, why: 'b だから', wordId: 'apple' })
  const got: boolean[] = []
  render(<Puzzle make={make} onAnswer={(c) => got.push(c)} />)
  for (let i = 0; i < PUZZLE_COUNT; i++) {
    fireEvent.click(screen.getByRole('button', { name: i === 0 ? 'a' : 'b' }))
    expect(screen.getByText('b だから')).toBeInTheDocument()
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(screen.getByText(`${PUZZLE_COUNT - 1} / ${PUZZLE_COUNT} 問正解`)).toBeInTheDocument()
  expect(got.filter(Boolean)).toHaveLength(PUZZLE_COUNT - 1)
})
