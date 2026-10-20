import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { makeSearch } from './wordsearch'
import { WordSearch } from './WordSearchView'
import { WORDS } from './words'

it('かくれた単語の文字を順にタップすると見つかり、全部でクリア', () => {
  const p = makeSearch(WORDS)
  let cleared = 0
  const got: boolean[] = []
  render(<WordSearch words={WORDS} initial={p} onAnswer={(c) => got.push(c)} onClear={() => cleared++} />)
  const cells = () => [...document.querySelectorAll<HTMLButtonElement>('.ws-cell')]
  for (const x of p.placed) for (const k of x.cells) fireEvent.click(cells()[k])
  expect(got).toHaveLength(p.placed.length)
  expect(cleared).toBe(1)
  expect(screen.getByText('ぜんぶ見つけた！')).toBeInTheDocument()
})

it('むずかしい（8×8）に切りかえられる', () => {
  render(<WordSearch words={WORDS} />)
  fireEvent.click(screen.getByText('むずかしい（8×8）'))
  expect(document.querySelectorAll('.ws-cell')).toHaveLength(64)
})
