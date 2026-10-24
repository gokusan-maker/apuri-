import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { GrammarOrder } from './GrammarOrderView'

it('例文をタップで並べなおして答えあわせする', () => {
  const u = GRAMMAR[0]
  const onAnswer = vi.fn()
  render(<GrammarOrder unit={u} onAnswer={onAnswer} onBack={() => {}} />)
  for (const ex of u.examples) {
    expect(screen.getByText(ex.ja)).toBeInTheDocument()
    for (const w of ex.en.split(' ')) {
      const btn = [...document.querySelectorAll<HTMLButtonElement>('.long-order-words button')].find((b) => b.textContent === w && !b.disabled)!
      fireEvent.click(btn)
    }
    fireEvent.click(screen.getByText(/答えあわせ/))
    expect(screen.getByText('⭕ 正解！')).toBeInTheDocument()
    fireEvent.click(screen.getByText(/次へ/))
  }
  expect(screen.getByText(`${u.examples.length} / ${u.examples.length} 問正解`)).toBeInTheDocument()
  expect(onAnswer).toHaveBeenCalledTimes(u.examples.length)
})

it('ヒントで最初の1語が置かれる（コインが足りなければ置かれない）', () => {
  const u = GRAMMAR[0]
  const spend = vi.fn(() => true)
  const { unmount } = render(<GrammarOrder unit={u} onBack={() => {}} onSpend={spend} />)
  fireEvent.click(screen.getByText(/最初の1語を教えて/))
  expect(spend).toHaveBeenCalledWith(3)
  expect(screen.getByLabelText('並べた英文')).toHaveTextContent(u.examples[0].en.split(' ')[0])
  expect(screen.queryByText(/最初の1語を教えて/)).toBeNull()
  unmount()
  render(<GrammarOrder unit={u} onBack={() => {}} onSpend={() => false} />)
  fireEvent.click(screen.getByText(/最初の1語を教えて/))
  expect(screen.getByLabelText('並べた英文').textContent!.trim()).toBe('')
})
