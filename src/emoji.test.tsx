import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EMOJI } from './emoji'
import { Quiz } from './QuizView'
import { WORDS } from './words'

describe('絵文字クイズ', () => {
  it('すべて単語帳にある単語で、絵文字は重ならない', () => {
    for (const id of Object.keys(EMOJI)) expect(WORDS.some((w) => w.id === id), id).toBe(true)
    expect(new Set(Object.values(EMOJI)).size).toBe(Object.keys(EMOJI).length)
    expect(Object.keys(EMOJI).length).toBeGreaterThanOrEqual(80)
  })

  it('絵文字を見て英単語を選ぶ', () => {
    render(<Quiz words={WORDS} count={1} direction="emoji" />)
    const e = document.querySelector('.emoji-prompt')!.textContent!
    const id = Object.keys(EMOJI).find((k) => EMOJI[k] === e)!
    fireEvent.click(screen.getByRole('button', { name: WORDS.find((x) => x.id === id)!.en }))
    expect(screen.getByText(/正解！/)).toBeInTheDocument()
  })
})

it('逆：英語を見て絵文字を選ぶ', () => {
  render(<Quiz words={WORDS} count={1} direction="emoji-rev" />)
  const en = document.querySelector('.quiz .en')!.textContent!
  const w = WORDS.find((x) => x.en === en && EMOJI[x.id])!
  const choices = [...document.querySelectorAll('.choice')].map((b) => b.textContent)
  expect(choices.every((c) => Object.values(EMOJI).includes(c!))).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: EMOJI[w.id] }))
  expect(screen.getByText(/正解！/)).toBeInTheDocument()
})

it('聞いて絵文字を選ぶ', () => {
  const spoken: string[] = []
  class FakeUtterance {
    text: string
    lang = ''
    constructor(t: string) {
      this.text = t
    }
  }
  Object.assign(window, {
    SpeechSynthesisUtterance: FakeUtterance,
    speechSynthesis: { cancel() {}, speak: (u: FakeUtterance) => spoken.push(u.text) },
  })
  render(<Quiz words={WORDS} count={1} direction="emoji-ear" />)
  expect(screen.getByText('？')).toBeInTheDocument()
  const w = WORDS.find((x) => x.en === spoken[spoken.length - 1] && EMOJI[x.id])!
  fireEvent.click(screen.getByRole('button', { name: EMOJI[w.id] }))
  expect(screen.getByText(/正解！/)).toBeInTheDocument()
})
