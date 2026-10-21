import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GrammarBingo } from './GrammarBingoView'
import { GRAMMAR } from './grammar'

const answerCell = (n: number, right: boolean) => {
  fireEvent.click(screen.getByLabelText(`マス ${n}`))
  const sentence = document.querySelector('.bingo-q .blank-sentence')!.textContent!
  const q = GRAMMAR.flatMap((u) => u.questions).find((x) => x.sentence.replace('___', '（　　）') === sentence)!
  const btns = [...document.querySelectorAll<HTMLButtonElement>('.bingo-q .choice')]
  fireEvent.click(btns[right ? q.answer : (q.answer + 1) % q.choices.length])
}

it('1列そろうとビンゴで、ごほうびは1回だけ', () => {
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
})
