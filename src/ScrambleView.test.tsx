import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { split } from './scramble'
import { Scramble } from './ScrambleView'
import { WORDS } from './words'

describe('並べ替えクイズ', () => {
  it('正しい順にタップすると正解', () => {
    const w = WORDS.find((x) => x.id === 'borrow')!
    const onAnswer = vi.fn()
    render(<Scramble words={[w]} count={1} onAnswer={onAnswer} />)
    expect(screen.getByText(w.exampleJa)).toBeInTheDocument()
    for (const word of split(w.example).words) {
      const pool = document.querySelector('.scramble-pool')!
      const chip = [...pool.querySelectorAll<HTMLButtonElement>('.chip')].find((c) => c.textContent === word)!
      fireEvent.click(chip)
    }
    fireEvent.click(screen.getByText('こたえあわせ'))
    expect(screen.getByText('正解！')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledWith(true, 15, 'borrow', 'quiz')
  })

  it('答えの単語をタップすると戻せる', () => {
    const w = WORDS.find((x) => x.id === 'borrow')!
    render(<Scramble words={[w]} count={1} />)
    const first = document.querySelector<HTMLButtonElement>('.scramble-pool .chip')!
    const text = first.textContent
    fireEvent.click(first)
    expect(document.querySelector('.scramble-answer .chip')!.textContent).toBe(text)
    fireEvent.click(document.querySelector<HTMLButtonElement>('.scramble-answer .chip')!)
    expect(document.querySelector('.scramble-answer .chip')).toBeNull()
    expect(screen.getByText('こたえあわせ')).toBeDisabled()
  })
})
