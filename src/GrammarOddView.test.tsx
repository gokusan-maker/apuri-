import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { GrammarOdd } from './GrammarOddView'

it('ちがう文を選ぶと答えと単元名が出る', () => {
  render(<GrammarOdd onBack={() => {}} />)
  fireEvent.click(document.querySelector<HTMLButtonElement>('.grammar-odd .duel-option')!)
  expect(screen.getByText(/ほかの3つは「/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.getByText(/なかま分け 2 \/ 5/)).toBeInTheDocument()
})
