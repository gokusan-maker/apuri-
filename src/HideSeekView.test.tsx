import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { HideSeek } from './HideSeekView'

it('3回以内に見つけるとごほうび、その日はもうできない', () => {
  localStorage.clear()
  const onFound = vi.fn()
  const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5) // 5番
  render(<HideSeek day="2026-10-20" name="モチ" onFound={onFound} />)
  fireEvent.click(screen.getByText(/かくれんぼ/))
  rnd.mockRestore()
  fireEvent.click(screen.getByLabelText('かくれ場所 1'))
  expect(screen.getByText(/あと2回/)).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('かくれ場所 5'))
  expect(onFound).toHaveBeenCalledTimes(1)
  expect(screen.getAllByText(/見つけた！/).length).toBeGreaterThan(0)
  expect(localStorage.getItem('eitan:hideseek')).toBe('2026-10-20')
})

it('3回はずれると終わり', () => {
  localStorage.clear()
  const onFound = vi.fn()
  const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.99) // 9番
  render(<HideSeek day="2026-10-20" name="モチ" onFound={onFound} />)
  fireEvent.click(screen.getByText(/かくれんぼ/))
  rnd.mockRestore()
  for (const n of [1, 2, 3]) fireEvent.click(screen.getByLabelText(`かくれ場所 ${n}`))
  expect(onFound).not.toHaveBeenCalled()
  expect(screen.getAllByText(/9 番にかくれていた/).length).toBeGreaterThan(0)
})
