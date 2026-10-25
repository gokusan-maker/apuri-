import { fireEvent, render, screen, within, cleanup } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import App from './App'

it('今日のミニゲームは日がわりで6つ。どの日もタイルに名前があり、押すとそのゲームの画面になる', () => {
  const bad: string[] = []
  for (let d = 1; d <= 21; d++) {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date(2026, 10, d, 12))
    localStorage.clear(); localStorage.setItem('eitan:onboarded', '1')
    render(<App />)
    fireEvent.click(within(screen.getByRole('navigation', { name: '画面の切り替え' })).getByRole('button', { name: /単語/ }))
    const names = [...document.querySelectorAll('[aria-label="今日のミニゲーム"] .game-tile-name')].map((x) => x.textContent)
    if (names.length < 6) { bad.push(`${d}:names=${names.length}`); cleanup(); vi.useRealTimers(); continue }
    const g = names[1]!
    fireEvent.click(within(screen.getByLabelText('今日のミニゲーム')).getByText(g))
    if (screen.queryByLabelText('今日のミニゲーム')) bad.push(`${d}:${g}`)
    cleanup(); vi.useRealTimers()
  }
  expect(bad).toEqual([])
})
