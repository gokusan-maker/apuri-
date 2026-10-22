import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Boss } from './BossView'
import { BossBook } from './BossBookView'
import { wordsOf } from './words'

it('ボスを倒すとボス図鑑にのる', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  expect(screen.getByText(/ボス図鑑（1 \/ \d+体）/)).toBeInTheDocument()
  expect(screen.getByText('ヤミモチ')).toBeInTheDocument()
  expect(screen.getByText(/1回たおした/)).toBeInTheDocument()
  expect(screen.getByText('🔒 あと2回たおすとひみつが読める')).toBeInTheDocument()
  expect(screen.getByText(/📜 ことわざ帳 1 \//)).toBeInTheDocument()
})

it('同じボスを3回たおすとひみつが読める', async () => {
  const { loadBook, saveBook, secretOf } = await import('./bossbook')
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  const book = loadBook()
  saveBook({ ...book, ヤミモチ: { ...book['ヤミモチ'], wins: 3 } })
  render(<BossBook />)
  expect(screen.getByText(`🔓 ひみつ：${secretOf('ヤミモチ')}`)).toBeInTheDocument()
})
