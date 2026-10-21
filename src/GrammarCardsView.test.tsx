import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { GrammarCards } from './GrammarCardsView'

it('要点カードはタップでめくれて、つぎ・まえに進める', () => {
  render(<GrammarCards units={GRAMMAR.slice(0, 3)} onBack={() => {}} />)
  expect(screen.getByText(GRAMMAR[0].title)).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('カードをめくる'))
  expect(screen.getByText(`・${GRAMMAR[0].points[0]}`)).toBeInTheDocument()
  fireEvent.click(screen.getByText('つぎ ▶'))
  expect(screen.getByText(GRAMMAR[1].title)).toBeInTheDocument()
  fireEvent.click(screen.getByText('◀ まえ'))
  fireEvent.click(screen.getByText('◀ まえ'))
  expect(screen.getByText(GRAMMAR[2].title)).toBeInTheDocument() // 先頭からまえは最後へ
})
