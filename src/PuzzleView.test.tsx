import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Puzzle, PUZZLE_COUNT } from './PuzzleView'

it('10問で結果が出る', () => {
  const make = () => ({ prompt: 'どれ？', choices: ['a', 'b', 'c', 'd'], answer: 1, why: 'b だから', wordId: 'apple' })
  const got: boolean[] = []
  render(<Puzzle make={make} onAnswer={(c) => got.push(c)} />)
  for (let i = 0; i < PUZZLE_COUNT; i++) {
    fireEvent.click(screen.getByRole('button', { name: i === 0 ? 'a' : 'b' }))
    expect(screen.getByText('b だから')).toBeInTheDocument()
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(screen.getByText(`${PUZZLE_COUNT - 1} / ${PUZZLE_COUNT} 問正解`)).toBeInTheDocument()
  expect(got.filter(Boolean)).toHaveLength(PUZZLE_COUNT - 1)
})

it('問題数を指定できる', () => {
  const make = () => ({ prompt: 'どれ？', choices: ['a', 'b', 'c', 'd'], answer: 1, why: '', wordId: '' })
  render(<Puzzle make={make} count={5} />)
  for (let i = 0; i < 5; i++) {
    fireEvent.click(screen.getByRole('button', { name: 'b' }))
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(screen.getByText('5 / 5 問正解')).toBeInTheDocument()
})

it('なぞなぞは答えあわせで「問題と答えを英語で聞く」と【英語のしかけ】の解説が出る', () => {
  const spoken: string[] = []
  Object.assign(window, {
    SpeechSynthesisUtterance: class {
      text: string
      constructor(t: string) {
        this.text = t
      }
    },
    speechSynthesis: { cancel() {}, speak: (u: { text: string }) => spoken.push(u.text), getVoices: () => [] },
  })
  const make = () => ({ prompt: 'What has hands but cannot clap?', choices: ['clock', 'dog', 'cat', 'tree'], answer: 0, why: 'clock（時計）', wordId: '', explain: ['【訳】…', '【答え】clock（時計）', '【英語のしかけ】hand は針'], say: 'What has hands but cannot clap? clock.' })
  render(<Puzzle make={make} count={1} />)
  fireEvent.click(screen.getByRole('button', { name: 'clock' }))
  expect(screen.getByText('【英語のしかけ】hand は針')).toBeInTheDocument()
  fireEvent.click(screen.getByText('🔊 問題と答えを英語で聞く'))
  expect(spoken).toEqual(['What has hands but cannot clap? clock.'])
})
