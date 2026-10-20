import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Versus, VERSUS_EACH } from './VersusView'
import { WORDS } from './words'

it('2人で交代に答え、多く正解したほうが勝ち', () => {
  const words = WORDS.slice(0, 30)
  render(<Versus words={words} />)
  for (let i = 0; i < VERSUS_EACH * 2; i++) {
    expect(screen.getByText(new RegExp(i % 2 === 0 ? 'プレイヤー1 の番' : 'プレイヤー2 の番'))).toBeInTheDocument()
    const en = document.querySelector('.quiz .en')!.textContent
    const w = words.find((x) => x.en === en)!
    // プレイヤー1は全問正解、プレイヤー2は全問まちがい
    if (i % 2 === 0) fireEvent.click(screen.getByRole('button', { name: w.ja }))
    else fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== w.ja)!)
    fireEvent.click(screen.getByText(/にわたす|結果を見る/))
  }
  expect(screen.getByText(`${VERSUS_EACH} 対 0`)).toBeInTheDocument()
  expect(screen.getByText('🔴 プレイヤー1 の勝ち！')).toBeInTheDocument()
  fireEvent.click(screen.getByText('もう1回'))
  expect(screen.getByText(/プレイヤー1 の番/)).toBeInTheDocument()
})

it('日→英も選べる（1問目の前だけ切りかえられる）', () => {
  const words = WORDS.slice(0, 30)
  render(<Versus words={words} />)
  fireEvent.click(screen.getByText('日→英'))
  const ja = document.querySelector('.quiz .ja-prompt')!.textContent
  const w = words.find((x) => x.ja === ja)!
  fireEvent.click(screen.getByRole('button', { name: w.en }))
  expect(screen.getByText('正解！')).toBeInTheDocument()
  expect(screen.queryByRole('group', { name: '向き' })).not.toBeInTheDocument()
})
