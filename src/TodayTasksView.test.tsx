import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { TodayTasks } from './TodayTasksView'

it('今日の課題を3つクリアするとトリオボーナスを1日1回受け取れる', () => {
  localStorage.clear()
  const day = '2026-10-22'
  const trio = vi.fn()
  const { unmount } = render(<TodayTasks today={day} onGo={() => {}} onTrio={trio} />)
  expect(screen.queryByText(/トリオボーナス/)).toBeNull()
  unmount()
  localStorage.setItem('eitan:today-words', day)
  localStorage.setItem('eitan:grammar-daily', day)
  localStorage.setItem('eitan:daily-short', day)
  render(<TodayTasks today={day} onGo={() => {}} onTrio={trio} />)
  fireEvent.click(screen.getByText(/トリオボーナスを受け取る/))
  expect(trio).toHaveBeenCalledWith(30, false, false)
  expect(screen.getByText(/トリオボーナス受け取りずみ/)).toBeInTheDocument()
  expect(localStorage.getItem('eitan:trio-day')).toBe(day)
})
