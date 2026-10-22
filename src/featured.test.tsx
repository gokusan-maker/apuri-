import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { quizXp } from './monster'
import { Quiz } from './QuizView'
import { WORDS } from './words'

vi.mock('./featured', async (orig) => ({ ...(await orig<typeof import('./featured')>()), featuredFor: () => 'en-ja' }))

it('今日のおすすめの種類で、その日はじめての正解は +10XP（1日1回）', () => {
  localStorage.clear()
  const got: number[] = []
  const words = WORDS.slice(0, 10)
  render(<Quiz words={words} direction="en-ja" onAnswer={(c, xp) => c && got.push(xp)} />)
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  expect(screen.getByLabelText('今日のおすすめ')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  for (let i = 0; i < 2; i++) {
    const en = document.querySelector('.quiz .en')!.textContent
    const w = words.find((x) => x.en === en)!
    fireEvent.click(screen.getByRole('button', { name: w.ja }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(got).toEqual([quizXp(1) + 10, quizXp(2)])
})
