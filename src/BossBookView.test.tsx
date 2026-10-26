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

it('とくぎを1回も発動させずに勝つと「とくぎ封じ」でコインがもらえる', async () => {
  const { SEAL_COINS } = await import('./boss')
  localStorage.clear()
  const got: number[] = []
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} onRankBonus={(n) => got.push(n)} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  expect(screen.getByText(`🔒 とくぎ封じ！ 🪙${SEAL_COINS}`)).toBeInTheDocument()
  expect(got).toContain(SEAL_COINS)
})

it('とくぎ封じで勝った回数を数え、5回でバッジ・記録の部屋にも出る', async () => {
  const { loadSealWins } = await import('./boss')
  const { newlyEarned } = await import('./badges')
  const { collectRecords } = await import('./records')
  localStorage.clear()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} traits={['armor']} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  expect(loadSealWins()).toBe(1)
  expect(newlyEarned({ answers: 0, correct: 0, streak: 0, sealWins: 5 } as never, {}).map((b) => b.id)).toContain('seal-5')
  expect(collectRecords().some((r) => r.label === 'とくぎ封じ' && r.value === '1回')).toBe(true)
})

it('バトルの最初に、ボスのとくぎのカットインが出る（とくぎなしなら出ない）', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} traits={['regen', 'armor']} />)
  expect(document.querySelector('.trait-cutin')?.textContent).toContain('のとくぎ「さいせい・かたいウロコ」')
  unmount()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} traits={[]} />)
  expect(document.querySelector('.trait-cutin')).toBeNull()
})

it('ボス図鑑に「とくぎのしくみ」：4しゅるいのとくぎと説明、とくぎ封じのこと', async () => {
  const { BossBook } = await import('./BossBookView')
  localStorage.clear()
  render(<BossBook />)
  const guide = document.querySelector('.trait-guide')!
  expect(guide.querySelectorAll('li')).toHaveLength(5)
  expect(guide.textContent).toContain('さいせい')
  expect(guide.textContent).toContain('とくぎ封じ')
})

it('ボスをたおしたときの紙ふぶきに、そのボスの色がまざる', async () => {
  const { BOSSES } = await import('./boss')
  localStorage.clear()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} traits={[]} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  const hex = BOSSES['中1'].color
  const rgb = `rgb(${[1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16)).join(', ')})`
  expect(document.querySelector<HTMLElement>('.boss .confetti:not(.gold)')!.style.background).toBe(rgb)
})
