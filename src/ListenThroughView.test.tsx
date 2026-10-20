import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ListenThrough } from './ListenThroughView'
import { WORDS } from './words'

describe('聞き流し', () => {
  it('英語→日本語の順に読み上げて、自動で次の単語へ進む', () => {
    vi.useFakeTimers()
    const spoken: { text: string; lang: string; onend?: () => void }[] = []
    class U {
      text: string
      lang = ''
      rate = 1
      onend?: () => void
      constructor(t: string) {
        this.text = t
      }
    }
    Object.assign(window, { SpeechSynthesisUtterance: U, speechSynthesis: { cancel() {}, speak: (u: U) => spoken.push(u as never) } })
    render(<ListenThrough words={WORDS.slice(0, 3)} />)
    fireEvent.click(screen.getByLabelText('再生'))
    expect(spoken.map((u) => u.text)).toEqual([WORDS[0].en, WORDS[0].ja])
    expect(spoken[1].lang).toBe('ja-JP')
    act(() => {
      spoken[1].onend!()
      vi.advanceTimersByTime(800)
    })
    expect(screen.getByText(WORDS[1].en)).toBeInTheDocument()
    expect(spoken[2].text).toBe(WORDS[1].en)
  })
})
