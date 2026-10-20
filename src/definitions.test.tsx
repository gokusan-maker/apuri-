import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DEFS } from './definitions'
import { Quiz } from './QuizView'
import { WORDS } from './words'

describe('英英クイズ', () => {
  it('説明は45語ぶんあり、どれも単語帳にある', () => {
    expect(Object.keys(DEFS)).toHaveLength(45)
    for (const id of Object.keys(DEFS)) expect(WORDS.some((w) => w.id === id), id).toBe(true)
  })

  it('英語の説明を読んで単語を選ぶ', () => {
    render(<Quiz words={WORDS} count={1} direction="define" />)
    const def = document.querySelector('.define-prompt')!.textContent!
    const id = Object.keys(DEFS).find((k) => DEFS[k] === def)!
    const w = WORDS.find((x) => x.id === id)!
    fireEvent.click(screen.getByRole('button', { name: w.en }))
    expect(screen.getByText(/正解！/)).toBeInTheDocument()
  })
})
