import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { hasBingo } from './bingo'
import { Bingo } from './BingoView'
import { WORDS } from './words'

it('1列そろうとビンゴ', () => {
  expect(hasBingo([0, 1, 2])).toBe(true)
  expect(hasBingo([0, 4, 8])).toBe(true)
  expect(hasBingo([0, 1, 5])).toBe(false)
})

it('日本語を見て英単語をタップし、そろえばビンゴ', () => {
  const board = WORDS.slice(0, 9)
  const got: boolean[] = []
  render(<Bingo words={WORDS} initialBoard={board} onAnswer={(c) => got.push(c)} />)
  for (let n = 0; n < 9 && !screen.queryByText(/ビンゴ！/); n++) {
    const ja = document.querySelector('.verb-ask strong')!.textContent
    const w = board.find((x) => x.ja === ja)!
    fireEvent.click(screen.getByRole('button', { name: w.en }))
  }
  expect(screen.getByText(/🎉 ビンゴ！/)).toBeInTheDocument()
  expect(got.every(Boolean)).toBe(true)
  expect(got.length).toBeGreaterThanOrEqual(3)
})
