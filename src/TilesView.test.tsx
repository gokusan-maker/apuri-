import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Tiles } from './TilesView'
import { WORDS } from './words'

describe('文字タイル', () => {
  it('文字を正しい順にタップすると正解、タップで戻せる', () => {
    const w = WORDS.find((x) => x.id === 'apple')!
    const onAnswer = vi.fn()
    render(<Tiles words={[w]} count={1} onAnswer={onAnswer} />)
    const pool = () => [...document.querySelectorAll<HTMLButtonElement>('.tile-pool .tile')]
    fireEvent.click(pool()[0])
    fireEvent.click(document.querySelector<HTMLButtonElement>('.tile-built .tile')!)
    expect(pool()).toHaveLength(5)
    for (const ch of 'apple') fireEvent.click(pool().find((b) => b.textContent === ch)!)
    expect(screen.getByText('正解！')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledWith(true, 15, 'apple', 'ear')
  })
})
