// 2回目のレビューで見つかった不具合の再発防止テスト
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { blankOut, canBlank } from './blank'
import { Card } from './CardView'
import { Quiz } from './QuizView'
import { hintText } from './spell'
import { WORDS, wordsOf } from './words'

describe('再発防止（2回目）', () => {
  beforeEach(() => localStorage.clear())

  it('はじめての案内が開いている間はキーボードでカードに答えられない', () => {
    render(<App />)
    expect(screen.getByRole('dialog', { name: 'はじめての案内' })).toBeInTheDocument()
    fireEvent.keyDown(window, { key: ' ' })
    expect(screen.queryByText(WORDS[0].ja)).not.toBeInTheDocument()
  })

  it('ボタンにフォーカスして Enter を押したら、そのボタンが押される（覚えたにならない）', () => {
    const answers: boolean[] = []
    render(<Card card={WORDS[0]} onAnswer={(c) => answers.push(c)} />)
    fireEvent.click(screen.getByText('意味を見る'))
    const mada = screen.getByText('まだ')
    fireEvent.keyDown(mada, { key: 'Enter' })
    expect(answers).toEqual([])
  })

  it('キーの押しっぱなしでは連続で答えない', () => {
    const answers: boolean[] = []
    render(<Card card={WORDS[0]} onAnswer={(c) => answers.push(c)} />)
    fireEvent.keyDown(window, { key: 'Enter', repeat: true })
    expect(screen.queryByText(WORDS[0].ja)).not.toBeInTheDocument()
  })

  it('熟語も穴埋めにできる（be 動詞の熟語は後ろを空欄に）', () => {
    expect(blankOut("I'm looking for my glasses.", 'look for')?.answer).toBe('looking for')
    expect(blankOut('My sister is good at drawing.', 'be good at')?.answer).toBe('good at')
    expect(wordsOf(['熟語']).filter(canBlank).length).toBeGreaterThan(30)
  })

  it('熟語だけでも穴埋めクイズに問題が出る', () => {
    const idioms = wordsOf(['熟語'])
    render(<Quiz words={idioms} direction="blank" count={3} />)
    expect(document.querySelector('.blank-sentence')).not.toBeNull()
  })

  it('スペルのヒントは熟語の区切りを見せ、文字数にスペースを数えない', () => {
    expect(hintText('go to bed', 0)).toBe('_ _   _ _   _ _ _')
    expect(hintText('go to bed', 3)).toBe('g o   t _   _ _ _')
    expect(hintText('go to bed', 99)).toBe('g o   t o   b e _')
  })
})
