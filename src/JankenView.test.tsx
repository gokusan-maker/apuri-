import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Janken } from './JankenView'

it('勝つとごほうび、あいこは回数にふくめず、3回で終わり', () => {
  localStorage.clear()
  const onWin = vi.fn()
  render(<Janken day="2026-10-20" name="モチ" onWin={onWin} />)
  const rnd = vi.spyOn(Math, 'random')
  rnd.mockReturnValue(0.5) // 相棒はチョキ
  fireEvent.click(screen.getByLabelText('グー'))
  expect(screen.getByText(/かち！/)).toBeInTheDocument()
  expect(onWin).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByLabelText('チョキ'))
  expect(screen.getByText(/あいこ！/)).toBeInTheDocument()
  expect(screen.getByText(/今日あと2回/)).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('パー'))
  expect(screen.getByText(/まけ…/)).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('グー'))
  rnd.mockRestore()
  expect(screen.getByText(/今日あと0回/)).toBeInTheDocument()
  expect(screen.queryByLabelText('グー')).toBeNull()
  expect(onWin).toHaveBeenCalledTimes(2)
})
