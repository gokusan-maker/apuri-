import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { Stages } from './StageView'

beforeEach(() => localStorage.clear())

it('大学入試の塔：1階だけ挑戦でき、上の階はかくれている', () => {
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.getByLabelText('0 / 9 階クリア')).toBeInTheDocument()
  expect(screen.getByText(/1階 キョーツーゲートン/)).toBeInTheDocument()
  expect(screen.getAllByText(/？？？/).length).toBeGreaterThanOrEqual(8)
  fireEvent.click(screen.getByRole('button', { name: '⚔ 挑戦' }))
  expect(screen.getByText('🏯 大学入試の塔 1階')).toBeInTheDocument()
  expect(screen.getByLabelText('ボスのHP')).toHaveAttribute('aria-valuemax', '100')
  expect(screen.getByText(/Only those who know their words may pass!/)).toBeInTheDocument()
})

it('倒した階の次の階が開く', () => {
  localStorage.setItem('eitan:univ', JSON.stringify({ gate: '2026-10-20' }))
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.getByText(/2階 キンシャチホコング/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '👑 もう一度' })).toBeInTheDocument()
})
