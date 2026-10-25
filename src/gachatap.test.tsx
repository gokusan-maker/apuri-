import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { GachaReveal } from './GachaRevealView'
import { KINDS, SPECIES } from './monster'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())
const k = { kind: KINDS[0], species: SPECIES[1] }

it('ガチャの演出：タマゴを3回タップするとわれて、生まれた子が出る', () => {
  render(<GachaReveal list={[k]} onClose={() => {}} />)
  act(() => {
    vi.advanceTimersByTime(1800)
  })
  for (let n = 3; n >= 1; n--) fireEvent.click(screen.getByRole('button', { name: `タマゴをたたいてわる（あと${n}回）` }))
  act(() => {
    vi.advanceTimersByTime(600)
  })
  expect(screen.queryByRole('button', { name: /タマゴをたたいてわる/ })).toBeNull()
  expect(screen.getByText(new RegExp(SPECIES[1].name))).toBeInTheDocument()
})

it('タップしなくても、1.5秒ほどで自動でわれる', () => {
  render(<GachaReveal list={[k]} onClose={() => {}} />)
  act(() => {
    vi.advanceTimersByTime(1800)
  })
  act(() => {
    vi.advanceTimersByTime(1500)
  })
  act(() => {
    vi.advanceTimersByTime(600)
  })
  expect(screen.queryByRole('button', { name: /タマゴをたたいてわる/ })).toBeNull()
  expect(screen.getByText(new RegExp(SPECIES[1].name))).toBeInTheDocument()
})
