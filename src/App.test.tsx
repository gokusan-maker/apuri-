import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => localStorage.clear())

  it('習慣を追加して今日の達成をチェックできる', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('新しい習慣'), { target: { value: '水を飲む' } })
    fireEvent.click(screen.getByText('追加'))

    const habit = screen.getByRole('button', { name: /水を飲む/ })
    expect(screen.getByText('今日の達成：0 / 1')).toBeInTheDocument()

    fireEvent.click(habit)
    expect(habit).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('今日の達成：1 / 1')).toBeInTheDocument()
  })
})
