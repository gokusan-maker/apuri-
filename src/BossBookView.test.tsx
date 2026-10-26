import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Boss } from './BossView'
import { BossBook } from './BossBookView'
import { wordsOf } from './words'
import { BOSS_TRAITS, traitOf } from './boss'

it('ボスを倒すとボス図鑑にのる', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  expect(screen.getByLabelText(/ボス図鑑 1 \/ \d+体/)).toBeInTheDocument()
  expect(screen.getByText('ヤミモチ')).toBeInTheDocument()
  expect(screen.getByText(/1回たおした/)).toBeInTheDocument()
  expect(screen.getByText('🔒 あと2回たおすとひみつが読める')).toBeInTheDocument()
  expect(document.querySelector('.boss-book-trait')?.textContent).toContain(BOSS_TRAITS[traitOf('ヤミモチ')].name) // 図鑑にとくぎ
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

it('ボス図鑑から、たおしたことのあるボスと再戦できる', async () => {
  localStorage.clear()
  const { BOSSES } = await import('./boss')
  const look = BOSSES['中1']
  localStorage.setItem('eitan:boss-book', JSON.stringify({ [look.name]: { look, wins: 1, best: 'A', last: '2026-10-20' } }))
  const fights: string[] = []
  render(<BossBook onFight={(n) => fights.push(n)} />)
  fireEvent.click(screen.getByText('⚔ 再戦する'))
  expect(fights).toEqual([look.name])
})

it('ボス図鑑に、たおしたボスの最短タイムが出る', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  localStorage.setItem('eitan:boss-times', JSON.stringify({ ヤミモチ: 83 }))
  render(<BossBook />)
  expect(screen.getByText(/⏱ 最短 1分23秒/)).toBeInTheDocument()
})

it('最短タイムが1分未満のボスに「⚡ スピードクリア」', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  localStorage.setItem('eitan:boss-times', JSON.stringify({ ヤミモチ: 45 }))
  const r = render(<BossBook />)
  expect(screen.getAllByText(/⚡ スピードクリア/).length).toBe(1) // 一覧の中の1つ（見出しは ⚡N のバッジ）
  expect(screen.getByLabelText('スピードクリア 1体')).toBeInTheDocument()
  r.unmount()
  localStorage.setItem('eitan:boss-times', JSON.stringify({ ヤミモチ: 75 }))
  render(<BossBook />)
  expect(screen.queryByText(/⚡ スピードクリア/)).toBeNull()
})
