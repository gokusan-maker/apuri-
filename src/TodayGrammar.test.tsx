import { render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { TodayGrammar } from './TodayGrammarView'
import { dailyGrammar } from './grammar'

beforeEach(() => localStorage.clear())

it('今日の文法：見出しは（ ）の前までの短い題名で、要点は「📌 ポイント」を開くと読める', () => {
  const day = '2026-10-23'
  const u = dailyGrammar(day)
  render(<TodayGrammar today={day} />)
  expect(screen.getByText(`📐 今日の文法：${u.title.split('（')[0]}`)).toBeInTheDocument()
  const d = screen.getByText('📌 ポイント').closest('details')!
  expect(d.open).toBe(false)
  expect(d.textContent).toContain(u.points[0])
})
