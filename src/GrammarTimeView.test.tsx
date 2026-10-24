import { act, fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GRAMMAR, loadTaBest } from './grammar'
import { GrammarTime } from './GrammarTimeView'

it('60秒のあいだ答えた正解数が記録になる', () => {
  localStorage.clear()
  vi.useFakeTimers()
  render(<GrammarTime onBack={() => {}} />)
  const all = GRAMMAR.flatMap((u) => u.questions)
  for (let i = 0; i < 3; i++) {
    const text = document.querySelector('.blank-sentence')!.textContent!
    const q = all.find((x) => x.sentence.replace('___', '　　　') === text)!
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  }
  expect(screen.getByText(/✅ 3 問/)).toBeInTheDocument()
  act(() => {
    vi.advanceTimersByTime(61000)
  })
  expect(screen.getByText('3 問正解')).toBeInTheDocument()
  expect(screen.getByText('🎉 ベスト更新！')).toBeInTheDocument()
  expect(loadTaBest()).toBe(3)
  vi.useRealTimers()
})

it('ベストを更新すると、文法のなかまにボーナス（onBest が1回）', () => {
  localStorage.clear()
  vi.useFakeTimers()
  const best = vi.fn()
  render(<GrammarTime onBack={() => {}} onBest={best} />)
  const all = GRAMMAR.flatMap((u) => u.questions)
  const text = document.querySelector('.blank-sentence')!.textContent!
  const q = all.find((x) => x.sentence.replace('___', '　　　') === text)!
  fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  act(() => {
    vi.advanceTimersByTime(61000)
  })
  expect(best).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('status').textContent).toMatch(/ベスト更新！.*\+20XP/)
  vi.useRealTimers()
})
