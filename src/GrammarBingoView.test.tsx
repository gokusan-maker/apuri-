import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GrammarBingo } from './GrammarBingoView'
import { GRAMMAR } from './grammar'

const answerCell = (n: number, right: boolean) => {
  fireEvent.click(screen.getByLabelText(`マス ${n}`))
  const sentence = document.querySelector('.bingo-q .blank-sentence')!.textContent!
  const btns = [...document.querySelectorAll<HTMLButtonElement>('.bingo-q .choice')]
  const shown = btns.map((b) => b.textContent)
  const q = GRAMMAR.flatMap((u) => u.questions).find((x) => x.sentence.replace('___', '　　　') === sentence && x.choices.length === shown.length && x.choices.every((c, i) => c === shown[i]))!
  fireEvent.click(btns[right ? q.answer : (q.answer + 1) % q.choices.length])
}

it('1列そろうとビンゴで、ごほうびは1回だけ', () => {
  localStorage.clear()
  const onBingo = vi.fn()
  render(<GrammarBingo onBack={() => {}} onBingo={onBingo} />)
  answerCell(1, true)
  answerCell(2, true)
  expect(screen.queryByText(/列そろった/)).toBeNull()
  answerCell(3, true)
  expect(screen.getByText(/ビンゴ！ 1列そろった/)).toBeInTheDocument()
  expect(onBingo).toHaveBeenCalledTimes(1)
  answerCell(5, true)
  answerCell(9, true)
  expect(onBingo).toHaveBeenCalledTimes(1)
  answerCell(4, false)
  expect(screen.getByLabelText('マス 4 まちがい')).toBeDisabled()
  expect(localStorage.getItem('eitan:grammar-bingo-best')).toBe('2') // よこ1列＋ななめ（3・5・9…ではなく1・5・9）
  expect(screen.getByText('🏆 ベスト記録 2列')).toBeInTheDocument()
})

it('ビンゴの問題文は（　）ではなく下線の空欄で出す', () => {
  render(<GrammarBingo onBack={() => {}} />)
  fireEvent.click(screen.getByLabelText('マス 1'))
  const p = document.querySelector('.bingo-q .blank-sentence')!
  expect(p.textContent).not.toContain('（　　）')
  expect(p.querySelector('.blank')).not.toBeNull()
})
