import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { GrammarDict } from './GrammarDictView'

it('聞いた英文を入力して答えあわせする', async () => {
  const speech = await import('./speech')
  const sp = vi.spyOn(speech, 'speak').mockImplementation(() => {})
  const u = GRAMMAR[0]
  render(<GrammarDict unit={u} onBack={() => {}} />)
  fireEvent.click(screen.getByText('🔊 聞く'))
  expect(sp).toHaveBeenCalledWith(u.examples[0].en)
  fireEvent.change(screen.getByLabelText('聞こえた英文'), { target: { value: u.examples[0].en.toLowerCase() } })
  fireEvent.click(screen.getByText('答えあわせ'))
  expect(screen.getByText(/⭕ 正解！/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ'))
  for (let i = 1; i < u.examples.length; i++) {
    fireEvent.change(screen.getByLabelText('聞こえた英文'), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByText('答えあわせ'))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(`1 / ${u.examples.length} 文正解`)).toBeInTheDocument()
  sp.mockRestore()
})
