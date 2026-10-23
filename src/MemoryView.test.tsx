import { act, fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { isPair, makeDeck } from './memory'
import { Memory } from './MemoryView'
import { WORDS } from './words'

it('山札は6ペア12枚で、英語と日本語がそろう', () => {
  const d = makeDeck(WORDS)
  expect(d).toHaveLength(12)
  for (const c of d) expect(d.filter((x) => isPair(x, c))).toHaveLength(1)
})

it('ちがう2枚は伏せもどり、ペアをそろえると XP、全部でクリア', () => {
  localStorage.clear()
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const deck = makeDeck(WORDS.slice(0, 6))
  const got: boolean[] = []
  render(<Memory words={WORDS} initialDeck={deck} onAnswer={(c) => got.push(c)} />)
  const cards = () => [...document.querySelectorAll<HTMLButtonElement>('.memory-card')]
  const other = deck.findIndex((c) => c.wordId !== deck[0].wordId)
  fireEvent.click(cards()[0])
  fireEvent.click(cards()[other])
  expect(cards()[other].textContent).toBe(deck[other].text)
  act(() => vi.advanceTimersByTime(1000))
  expect(cards()[0].textContent).toBe('？')
  for (let i = 0; i < deck.length; i++) {
    const j = deck.findIndex((c, k) => k > i && isPair(c, deck[i]))
    if (j < 0) continue
    fireEvent.click(cards()[i])
    fireEvent.click(cards()[j])
  }
  vi.useRealTimers()
  expect(got).toEqual([true, true, true, true, true, true])
  expect(screen.getByRole('status').textContent).toMatch(/クリア！.*7手.*自己ベスト！/)
  expect(localStorage.getItem('eitan:best-memory')).toBe('7')
})

it('全部そろえると onClear が呼ばれる', () => {
  const deck = makeDeck(WORDS.slice(0, 6))
  let cleared = 0
  render(<Memory words={WORDS} initialDeck={deck} onClear={() => cleared++} />)
  const cards = () => [...document.querySelectorAll<HTMLButtonElement>('.memory-card')]
  for (let i = 0; i < deck.length; i++) {
    const j = deck.findIndex((c, k) => k > i && isPair(c, deck[i]))
    if (j < 0) continue
    fireEvent.click(cards()[i])
    fireEvent.click(cards()[j])
  }
  expect(cleared).toBe(1)
})

it('むずかしい（8ペア）に切りかえられる', () => {
  render(<Memory words={WORDS} />)
  fireEvent.click(screen.getByRole('button', { name: /むずかしい/ }))
  expect(document.querySelectorAll('.memory-card')).toHaveLength(16)
})
