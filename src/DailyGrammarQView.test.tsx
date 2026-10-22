import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { DailyGrammarQ } from './DailyGrammarQView'
import { dailyQuestion } from './grammarq'

it('正解するとXPがもらえ、その日はもう出ない', () => {
  localStorage.clear()
  const onCorrect = vi.fn()
  const { q } = dailyQuestion('2026-10-20')
  const { unmount } = render(<DailyGrammarQ day="2026-10-20" onCorrect={onCorrect} />)
  fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  expect(onCorrect).toHaveBeenCalledTimes(1)
  expect(screen.getByText(/⭕ 正解！/)).toBeInTheDocument()
  expect(screen.getByText(`📌 要点：${dailyQuestion('2026-10-20').point}`)).toBeInTheDocument()
  unmount()
  render(<DailyGrammarQ day="2026-10-20" onCorrect={onCorrect} />)
  expect(screen.queryByText(/今日の文法1問/)).toBeNull()
})
