import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Pronounce } from './PronounceView'
import { WORDS } from './words'

type Handler = (e: { results: { transcript: string }[][] }) => void
let last: { onresult: Handler | null; onend: (() => void) | null }

class FakeRecognition {
  lang = ''
  maxAlternatives = 1
  interimResults = false
  onresult: Handler | null = null
  onerror = null
  onend: (() => void) | null = null
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    last = this
  }
  start() {}
  abort() {}
}

describe('Pronounce', () => {
  afterEach(() => {
    delete (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
  })

  it('音声認識が無い端末では案内を出す', () => {
    render(<Pronounce words={WORDS.slice(0, 3)} />)
    expect(screen.getByText(/音声認識が使えません/)).toBeInTheDocument()
  })

  it('正しく言えたら「ばっちり！」で XP', () => {
    Object.assign(window, { webkitSpeechRecognition: FakeRecognition })
    const onAnswer = vi.fn()
    render(<Pronounce words={WORDS.slice(0, 1)} count={1} onAnswer={onAnswer} />)
    fireEvent.click(screen.getByLabelText('話す'))
    expect(screen.getByText('聞いています…')).toBeInTheDocument()
    act(() => last.onresult!({ results: [[{ transcript: `${WORDS[0].en}` }]] }))
    act(() => last.onend!())
    expect(screen.getByText('ばっちり！')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledWith(true, 10, WORDS[0].id, 'ear')
  })

  it('ちがう単語なら「もう一度」', () => {
    Object.assign(window, { webkitSpeechRecognition: FakeRecognition })
    render(<Pronounce words={WORDS.slice(0, 1)} count={1} />)
    fireEvent.click(screen.getByLabelText('話す'))
    act(() => last.onresult!({ results: [[{ transcript: 'something else' }]] }))
    expect(screen.getByText('おしい！もう一度')).toBeInTheDocument()
    expect(screen.getByText('聞こえた：「something else」')).toBeInTheDocument()
  })
})
