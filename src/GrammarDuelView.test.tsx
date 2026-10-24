import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GrammarDuel } from './GrammarDuelView'
import { GRAMMAR } from './grammar'

it('正しい英文を選んで10問答えるとタイムが出る', () => {
  localStorage.clear()
  const best = vi.fn()
  render(<GrammarDuel onBack={() => {}} onBest={best} />)
  fireEvent.click(screen.getByText('スタート'))
  const rights = new Set(GRAMMAR.flatMap((u) => u.questions).map((q) => (q.choices[q.answer].startsWith('（') ? q.sentence.replace(/___ ?/, '') : q.sentence.replace('___', q.choices[q.answer]))))
  for (let i = 0; i < 10; i++) {
    const btns = [...document.querySelectorAll<HTMLButtonElement>('.duel-option')]
    const ok = btns.find((b) => rights.has(b.textContent!))!
    if (i === 9) vi.setSystemTime(Date.now() + 20000)
    fireEvent.click(ok)
  }
  expect(screen.getByRole('status').textContent).toMatch(/⏱ 20秒.*ミス 0.*🏆 ベスト記録！.*\+20XP/)
  expect(best).toHaveBeenCalledTimes(1)
})
