import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { allCastles, claimableSteps, conquered, titleOf } from './castlecollect'
import { CastleCollection } from './CastleCollectView'

it('城の制覇コレクション：てっぺんまで登った城を数えて称号', () => {
  localStorage.clear()
  const list = allCastles()
  expect(list.some((c) => c.kind === '単語') && list.some((c) => c.kind === 'ボス')).toBe(true)
  expect(conquered(list)).toBe(0)
  expect(titleOf(0)).toBeNull()
  expect(titleOf(3)).toBe('城めぐりの旅人')
  expect(claimableSteps(5, 1)).toBe(2)
})

it('ボスの城を全部たおすと1城制覇。ごほうびの🎟は1回だけ', () => {
  localStorage.clear()
  localStorage.setItem('eitan:boss', JSON.stringify({ 中1: '2026-10-01', 中2: '2026-10-01', 中3: '2026-10-01' }))
  const reward = vi.fn()
  render(<CastleCollection onReward={reward} />)
  expect(screen.getByLabelText(/^制覇 1 \//)).toBeInTheDocument()
  expect(screen.getByText(/称号「城の見習い」/)).toBeInTheDocument()
  fireEvent.click(screen.getByText(/ごほうびを受け取る（🎟×1）/))
  expect(reward).toHaveBeenCalledWith(1)
  expect(screen.queryByText(/ごほうびを受け取る/)).toBeNull()
  expect(localStorage.getItem('eitan:castle-collect')).toBe('1')
})
