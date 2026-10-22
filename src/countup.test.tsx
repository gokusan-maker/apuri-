import { act, render } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { CountUp } from './CountUpView'

it('数字を0から数えあげて、最後は指定の数になる', () => {
  vi.useFakeTimers()
  const { container } = render(<CountUp to={100} />)
  expect(container.textContent).toBe('0')
  act(() => {
    vi.advanceTimersByTime(400)
  })
  const mid = Number(container.textContent)
  expect(mid).toBeGreaterThan(0)
  expect(mid).toBeLessThan(100)
  act(() => {
    vi.advanceTimersByTime(600)
  })
  expect(container.textContent).toBe('100')
  vi.useRealTimers()
})
