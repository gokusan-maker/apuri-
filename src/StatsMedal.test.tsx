import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Stats } from './StatsView'

it('単語帳ごとの定着にメダルが出る', () => {
  const props = { streakDays: 0, studiedToday: 0, learned: 0, total: 0, week: [], goal: 20, weak: [], mistakes: {}, onReviewWeak: () => {}, schedule: [] } as unknown as Parameters<typeof Stats>[0]
  render(<Stats {...props} byLevel={[{ level: '中1', learned: 85, total: 100 }, { level: '数', learned: 10, total: 44 }]} />)
  expect(screen.getByText(/🥈/).textContent).toContain('中1')
})
