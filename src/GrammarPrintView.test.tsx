import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { GrammarPrint } from './GrammarPrintView'

it('要点・例文・問題・答えが1画面に出て、印刷できる', () => {
  const u = GRAMMAR[0]
  const print = vi.fn()
  vi.stubGlobal('print', print)
  render(<GrammarPrint unit={u} onBack={() => {}} />)
  expect(screen.getByText(u.points[0])).toBeInTheDocument()
  expect(screen.getByText(u.examples[0].en)).toBeInTheDocument()
  expect(screen.getByText('よくあるまちがい')).toBeInTheDocument()
  expect(screen.getAllByRole('listitem').length).toBeGreaterThan(u.questions.length * 2)
  fireEvent.click(screen.getByText('🖨 印刷する'))
  expect(print).toHaveBeenCalled()
  vi.unstubAllGlobals()
})
