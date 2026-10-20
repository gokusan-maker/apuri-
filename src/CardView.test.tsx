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
