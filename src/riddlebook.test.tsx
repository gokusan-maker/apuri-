import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { RIDDLES } from './puzzles'
import { addRiddle, loadRiddleBook } from './riddlebook'
import { RiddleBook } from './RiddleBookView'

it('なぞなぞ図鑑：正解したなぞなぞだけ（重ならずに）覚える', () => {
  localStorage.clear()
  let b = addRiddle([], RIDDLES[0].q)
  b = addRiddle(b, RIDDLES[0].q)
  b = addRiddle(b, 'not a riddle')
  expect(b).toEqual([RIDDLES[0].q])
  expect(loadRiddleBook()).toEqual([RIDDLES[0].q])
})

it('なぞなぞ図鑑に、正解したなぞなぞと答え・しかけの解説が出る', () => {
  render(<RiddleBook solved={[RIDDLES[1].q]} />)
  fireEvent.click(screen.getByText(`📚 なぞなぞ図鑑（1 / ${RIDDLES.length}）`))
  expect(screen.getByText(RIDDLES[1].q)).toBeInTheDocument()
  expect(screen.getByText(RIDDLES[1].trick)).toBeInTheDocument()
})
