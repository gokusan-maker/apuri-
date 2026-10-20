import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Card } from './CardView'
import { WORDS } from './words'

const spoken: string[] = []
function fakeSpeech() {
  spoken.length = 0
  Object.assign(window, {
    SpeechSynthesisUtterance: class {
      text: string
      constructor(t: string) {
        this.text = t
      }
    },
    speechSynthesis: { cancel() {}, speak: (u: { text: string }) => spoken.push(u.text), getVoices: () => [] },
  })
}

describe('カードの設定', () => {
  afterEach(() => localStorage.clear())

  it('日→英カード：表は日本語、めくると英語', () => {
    const w = WORDS[0]
    render(<Card card={w} onAnswer={() => {}} jaFirst />)
    expect(screen.getByText(w.ja)).toBeInTheDocument()
    expect(screen.queryByText(w.en)).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('英語を見る'))
    expect(screen.getByText(w.en)).toBeInTheDocument()
  })

  it('自動で発音：英→日は表示したとき、日→英はめくったとき', () => {
    fakeSpeech()
    const w = WORDS[0]
    const { unmount } = render(<Card card={w} onAnswer={() => {}} autoSpeak />)
    expect(spoken).toEqual([w.en])
    unmount()
    spoken.length = 0
    render(<Card card={w} onAnswer={() => {}} autoSpeak jaFirst />)
    expect(spoken).toEqual([])
    fireEvent.click(screen.getByText('英語を見る'))
    expect(spoken).toEqual([w.en])
  })
})

it('めくったあと右にスワイプすると「覚えた」', () => {
  const answers: boolean[] = []
  render(<Card card={WORDS[0]} onAnswer={(c) => answers.push(c)} />)
  const card = document.querySelector('.card')!
  // めくる前のスワイプは無視
  fireEvent.pointerDown(card, { clientX: 0, clientY: 0 })
  fireEvent.pointerUp(card, { clientX: 200, clientY: 0 })
  expect(answers).toEqual([])
  fireEvent.click(screen.getByText('意味を見る'))
  fireEvent.pointerDown(card, { clientX: 0, clientY: 0 })
  fireEvent.pointerMove(card, { clientX: 100, clientY: 0 })
  fireEvent.pointerUp(card, { clientX: 150, clientY: 5 })
  fireEvent.click(screen.getByText('意味を見る'))
  fireEvent.pointerDown(card, { clientX: 200, clientY: 0 })
  fireEvent.pointerUp(card, { clientX: 50, clientY: 0 })
  expect(answers).toEqual([true, false])
})

it('キーボード：スペースでめくって、→で覚えた、←でまだ', () => {
  const answers: boolean[] = []
  render(<Card card={WORDS[0]} onAnswer={(c) => answers.push(c)} />)
  fireEvent.keyDown(window, { key: ' ' })
  expect(screen.getByText(WORDS[0].ja)).toBeInTheDocument()
  fireEvent.keyDown(window, { key: 'ArrowRight' })
  fireEvent.keyDown(window, { key: ' ' })
  fireEvent.keyDown(window, { key: 'ArrowLeft' })
  expect(answers).toEqual([true, false])
})
