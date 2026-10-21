import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { SugorokuBoard } from './SugorokuView'
import { wordsOf } from './words'

it('サイコロをふって正解すると進み、その日はもうふれない', () => {
  localStorage.clear()
  const words = wordsOf(['中1'])
  render(<SugorokuBoard day="2026-10-20" words={words} onGoal={() => {}} />)
  fireEvent.click(screen.getByText(/サイコロをふる/))
  const en = /「(.+)」の意味は/.exec(document.querySelector('.sugoroku-q p')!.textContent!)![1]
  const dice = Number(/🎲 (\d)/.exec(document.querySelector('.sugoroku-q p')!.textContent!)![1])
  const w = words.find((x) => x.en === en)!
  fireEvent.click(screen.getByRole('button', { name: w.ja }))
  expect(screen.getByText(new RegExp(`${dice}マス進んだ`))).toBeInTheDocument()
  expect(screen.getByLabelText(`いま ${dice} マス目`)).toBeInTheDocument()
  expect(screen.queryByText(/サイコロをふる/)).toBeNull()
})

it('ゴールするとごほうび', () => {
  localStorage.setItem('eitan:sugoroku', JSON.stringify({ pos: 19, day: '', laps: 0 }))
  const onGoal = vi.fn()
  const words = wordsOf(['中1'])
  render(<SugorokuBoard day="2026-10-20" words={words} onGoal={onGoal} />)
  fireEvent.click(screen.getByText(/サイコロをふる/))
  const en = /「(.+)」の意味は/.exec(document.querySelector('.sugoroku-q p')!.textContent!)![1]
  fireEvent.click(screen.getByRole('button', { name: words.find((x) => x.en === en)!.ja }))
  expect(onGoal).toHaveBeenCalledTimes(1)
  expect(screen.getByText(/ゴール！/)).toBeInTheDocument()
})
