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

it('「かんたん」ボタンと↑キー', () => {
  const answers: [boolean, boolean | undefined][] = []
  render(<Card card={WORDS[0]} onAnswer={(c, e) => answers.push([c, e])} />)
  fireEvent.click(screen.getByText('意味を見る'))
  fireEvent.click(screen.getByText('かんたん'))
  fireEvent.keyDown(window, { key: ' ' })
  fireEvent.keyDown(window, { key: 'ArrowUp' })
  expect(answers).toEqual([
    [true, true],
    [true, true],
  ])
})

it('例文の訳を隠す設定：タップで見える', () => {
  render(<Card card={WORDS[0]} onAnswer={() => {}} hideExampleJa />)
  fireEvent.click(screen.getByText('意味を見る'))
  expect(screen.queryByText(WORDS[0].exampleJa)).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('訳を見る'))
  expect(screen.getByText(WORDS[0].exampleJa)).toBeInTheDocument()
})

it('🐢 でゆっくり発音する', () => {
  const rates: number[] = []
  Object.assign(window, {
    SpeechSynthesisUtterance: class {
      text: string
      rate = 1
      constructor(t: string) {
        this.text = t
      }
    },
    speechSynthesis: { cancel() {}, speak: (u: { rate: number }) => rates.push(u.rate), getVoices: () => [] },
  })
  render(<Card card={WORDS[0]} onAnswer={() => {}} />)
  fireEvent.click(screen.getByLabelText('発音を聞く'))
  fireEvent.click(screen.getByLabelText('ゆっくり聞く'))
  expect(rates[0]).toBe(1)
  expect(rates[1]).toBeLessThan(0.6)
})

it('例文の中の単語をタップすると意味が出る', () => {
  const w = WORDS.find((x) => x.id === 'library')!
  render(<Card card={w} onAnswer={() => {}} lookup={(t) => (t.toLowerCase() === 'school.' ? { ...w, id: 'school', en: 'school', ja: '学校' } : undefined)} />)
  fireEvent.click(screen.getByText('意味を見る'))
  fireEvent.click(screen.getByRole('button', { name: 'school.' }))
  expect(screen.getByText('school：学校')).toBeInTheDocument()
})

it('まちがえやすい単語は、カードの裏で解説を見られる', () => {
  const w = WORDS.find((x) => x.id === 'borrow')!
  render(<Card card={w} onAnswer={() => {}} />)
  fireEvent.click(screen.getByText('意味を見る'))
  expect(screen.getByText(/⚠ まちがえやすい：borrow と lend/)).toBeInTheDocument()
})

it('不規則動詞のカードの裏に、過去形・過去分詞を出す', () => {
  const w = WORDS.find((x) => x.id === 'begin')!
  render(<Card card={w} onAnswer={() => {}} />)
  fireEvent.click(screen.getByText('意味を見る'))
  expect(screen.getByText('begin - began - begun')).toBeInTheDocument()
})

it('カードの裏に、その単語の絵文字を出す', () => {
  const w = WORDS.find((x) => x.id === 'apple')!
  render(<Card card={w} onAnswer={() => {}} />)
  fireEvent.click(screen.getByText('意味を見る'))
  expect(document.querySelector('.card-emoji')?.textContent).toContain('🍎')
})
