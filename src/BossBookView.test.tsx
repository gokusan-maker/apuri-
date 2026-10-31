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

it('バトル中はとくぎの説明（カットイン・封じ中の表示）を出さない（オーナーの要望：セリフのすぐ下はアイテム）', () => {
  localStorage.clear()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} traits={['regen', 'armor']} />)
  expect(document.querySelector('.trait-cutin')).toBeNull()
  expect(screen.queryByText('🔒 とくぎ封じ中')).toBeNull()
})

it('ボス図鑑に「とくぎのしくみ」：4しゅるいのとくぎと説明、とくぎ封じのこと', async () => {
  const { BossBook } = await import('./BossBookView')
  localStorage.clear()
  render(<BossBook />)
  const guide = document.querySelector('.trait-guide')!
  expect(guide.querySelectorAll('li')).toHaveLength(5)
  expect(guide.textContent).toContain('さいせい')
  expect(guide.textContent).toContain('とくぎ封じ')
  expect(guide.querySelectorAll('.trait-tip')).toHaveLength(4) // とくぎごとの封じのコツ
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

it('とくぎ封じが10回目のとき、ガチャチケットももらえる', async () => {
  const { ChestTicketContext } = await import('./castle')
  localStorage.clear()
  localStorage.setItem('eitan:seal-wins', '9')
  let tickets = 0
  render(
    <ChestTicketContext.Provider value={() => tickets++}>
      <Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} traits={['armor']} />
    </ChestTicketContext.Provider>,
  )
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  expect(tickets).toBe(1)
  expect(screen.getByText(/＋🎟（10回ごとのごほうび）/)).toBeInTheDocument()
})

it('ボス図鑑の、たおしたボスのカードには戦った舞台が背景に出る', async () => {
  const { BossBook } = await import('./BossBookView')
  const { BOSSES } = await import('./boss')
  localStorage.clear()
  localStorage.setItem('eitan:boss-book', JSON.stringify({ [BOSSES['中1'].name]: { look: BOSSES['中1'], wins: 1, best: 'A', first: '2026-10-01' } }))
  const { container } = render(<BossBook />)
  expect(container.querySelector('.boss-book-fig .boss-arena.arena-field')).not.toBeNull()
})

it('ボス図鑑はとくぎでしぼりこめる（もう一度おすと全部にもどる）', async () => {
  const { BossBook } = await import('./BossBookView')
  const { BOSSES, BOSS_TRAITS, traitOf } = await import('./boss')
  localStorage.clear()
  const book = Object.fromEntries(Object.values(BOSSES).map((b) => [b.name, { look: b, wins: 1, best: 'A', first: '2026-10-01' }]))
  localStorage.setItem('eitan:boss-book', JSON.stringify(book))
  const { container } = render(<BossBook />)
  const all = container.querySelectorAll('.boss-book-list li.got').length
  const t = traitOf(BOSSES['中1'].name)
  fireEvent.click(screen.getByRole('button', { name: BOSS_TRAITS[t].name }))
  const shown = container.querySelectorAll('.boss-book-list li.got').length
  expect(shown).toBe(Object.values(BOSSES).filter((b) => traitOf(b.name) === t).length)
  expect(shown).toBeLessThan(all)
  fireEvent.click(screen.getByRole('button', { name: BOSS_TRAITS[t].name }))
  expect(container.querySelectorAll('.boss-book-list li.got').length).toBe(all)
})

it('とくぎ封じは、とくぎの種類ごとにも数えて、図鑑の「とくぎのしくみ」に🔒×回数が出る', async () => {
  const { BossBook } = await import('./BossBookView')
  const { loadSealTraits } = await import('./boss')
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} traits={['armor', 'quick']} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  expect(loadSealTraits()).toEqual({ armor: 1, quick: 1 })
  unmount()
  render(<BossBook />)
  expect(document.querySelector('.trait-guide')!.textContent).toContain('🔒×1')
})

it('デザイン94：ノーミスでたおしたボスのカードに「✨ ノーミス」', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  expect(screen.getByText(/✨ ノーミス/)).toBeInTheDocument()
})

it('デザイン94：ノーミスの記録がなければ「✨ ノーミス」は出ない', () => {
  localStorage.clear()
  render(<BossBook />)
  expect(screen.queryByText(/✨ ノーミス/)).toBeNull()
})

it('デザイン106：ボス図鑑のとくぎをタップすると、説明と封じのコツが出て、もう一度タップで閉じる', async () => {
  const { BOSS_TRAITS, traitOf } = await import('./boss')
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  const btn = document.querySelector<HTMLButtonElement>('button.boss-book-trait')!
  const name = document.querySelector('.boss-book li.got .badge-name, li.got .badge-name')!.textContent!
  fireEvent.click(btn)
  const t = BOSS_TRAITS[traitOf(name)]
  expect(document.querySelector('.boss-book-trait-desc')!.textContent).toBe(`${t.desc}／🔑 ${t.tip}`)
  fireEvent.click(btn)
  expect(document.querySelector('.boss-book-trait-desc')).toBeNull()
})

it('デザイン107：ボス図鑑のカードに、そのボスに初めて勝った日が出る', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  expect(document.querySelector('.boss-book-first')!.textContent).toMatch(/^・📅 はじめて勝った日 \d{1,2}月\d{1,2}日$/)
})

it('デザイン108：ボス図鑑の見出しに、ノーミスでたおしたボスの数が出る', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  expect(screen.getByLabelText('ノーミス 1体').textContent).toBe('✨1')
})

it('デザイン109：ボス図鑑の「✨ノーミスだけ」で、ノーミスでたおしたボスだけになる', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  localStorage.setItem('eitan:boss-nomiss', '[]')
  const { unmount: u2 } = render(<BossBook />)
  expect(screen.queryByRole('button', { name: '✨ノーミスだけ' })).toBeNull() // ノーミスがいなければボタンは出ない
  u2()
  localStorage.setItem('eitan:boss-nomiss', JSON.stringify([document.title === 'x' ? '' : 'dummy']))
  const book = JSON.parse(localStorage.getItem('eitan:boss-book')!) as Record<string, unknown>
  localStorage.setItem('eitan:boss-nomiss', JSON.stringify(Object.keys(book)))
  render(<BossBook />)
  const before = document.querySelectorAll('.boss-book-list li.got').length
  fireEvent.click(screen.getByRole('button', { name: '✨ノーミスだけ' }))
  expect(document.querySelectorAll('.boss-book-list li.got').length).toBe(before)
  expect(screen.getByRole('button', { name: '✨ノーミスだけ' })).toHaveAttribute('aria-pressed', 'true')
})

it('デザイン117：2回以上勝ったボスがいると、いちばん勝ったボスに「🏆 いちばん勝った」が出る', () => {
  localStorage.clear()
  for (let k = 0; k < 2; k++) {
    const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
    const en = document.querySelector('.boss .en')!.textContent
    const w = wordsOf(['中1']).find((x) => x.en === en)!
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
    unmount()
  }
  const book = JSON.parse(localStorage.getItem('eitan:boss-book')!) as Record<string, { wins: number }>
  const best = Math.max(...Object.values(book).map((e) => e.wins))
  render(<BossBook />)
  if (best >= 2) expect(screen.getAllByText(/🏆 いちばん勝った/)).toHaveLength(1)
  else expect(screen.queryByText(/🏆 いちばん勝った/)).toBeNull()
})

it('デザイン117：どのボスにも1回しか勝っていなければ「いちばん勝った」は出ない', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  expect(screen.queryByText(/🏆 いちばん勝った/)).toBeNull()
})

it('デザイン118：ボス図鑑の「🏆 勝った回数順」で、勝った回数の多いボスが先に来る', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  const book = JSON.parse(localStorage.getItem('eitan:boss-book')!) as Record<string, { wins: number; best: string; look: unknown; first: string }>
  const [name, e] = Object.entries(book)[0]
  const fake = { ...(e.look as { name: string }), name: 'テストボス' }
  localStorage.setItem('eitan:boss-book', JSON.stringify({ [name]: e, テストボス: { wins: 9, best: 'S', look: fake, first: '2026-10-01' } }))
  render(<BossBook />)
  fireEvent.click(screen.getByRole('button', { name: '🏆 勝った回数順' }))
  const names = [...document.querySelectorAll('.boss-book-list li.got .badge-name')].map((x) => x.textContent)
  expect(names[0]).toBe('テストボス')
})

it('デザイン124：ボス図鑑に、まだ勝っていないボスの数が「あと○体」で出る', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  const total = Number(screen.getByLabelText(/ボス図鑑 1 \/ \d+体/).getAttribute('aria-label')!.match(/\/ (\d+)体/)![1])
  expect(screen.getByLabelText(`まだ勝っていないボス ${total - 1}体`).textContent).toBe(`あと${total - 1}体`)
})

it('デザイン129：ボス図鑑で、いちばん早くたおしたボスに ⚡最速 がつく（タイムが2体以上あるとき）', async () => {
  const { BOSSES } = await import('./boss')
  localStorage.clear()
  const a = BOSSES['中1']
  const b = BOSSES['中2']
  localStorage.setItem('eitan:boss-book', JSON.stringify({ [a.name]: { look: a, wins: 1, best: 'A', first: '2026-10-01' }, [b.name]: { look: b, wins: 1, best: 'A', first: '2026-10-02' } }))
  localStorage.setItem('eitan:boss-times', JSON.stringify({ [a.name]: 90, [b.name]: 70 }))
  const r = render(<BossBook />)
  expect(screen.getAllByLabelText('いちばん早くたおしたボス')).toHaveLength(1)
  expect(screen.getByLabelText('いちばん早くたおしたボス').closest('li')!.textContent).toContain(b.name)
  r.unmount()
  localStorage.setItem('eitan:boss-times', JSON.stringify({ [a.name]: 90 }))
  render(<BossBook />)
  expect(screen.queryByLabelText('いちばん早くたおしたボス')).toBeNull()
})

it('デザイン135：ボス図鑑の見出しに、ノーミスでたおしたボスの割合が出る', async () => {
  const { BOSSES } = await import('./boss')
  localStorage.clear()
  const a = BOSSES['中1']
  const b = BOSSES['中2']
  localStorage.setItem('eitan:boss-book', JSON.stringify({ [a.name]: { look: a, wins: 1, best: 'A', first: '2026-10-01' }, [b.name]: { look: b, wins: 1, best: 'A', first: '2026-10-02' } }))
  localStorage.setItem('eitan:boss-nomiss', JSON.stringify([a.name]))
  render(<BossBook />)
  expect(screen.getByLabelText('ノーミス率 50%').textContent).toBe('（50%）')
})

it('デザイン138：ボス図鑑に、まだ勝っていないステージのボスが「つぎのめあて」として1体出る', async () => {
  const { BOSSES } = await import('./boss')
  localStorage.clear()
  const [lv1, a] = Object.entries(BOSSES)[0]
  const [lv2] = Object.entries(BOSSES)[1]
  const r = render(<BossBook />)
  expect(screen.getByLabelText('つぎのめあて').textContent).toBe(`🎯 つぎのめあて：${lv1}のボス`)
  r.unmount()
  localStorage.setItem('eitan:boss-book', JSON.stringify({ [a.name]: { look: a, wins: 1, best: 'A', first: '2026-10-01' } }))
  render(<BossBook />)
  expect(screen.getByLabelText('つぎのめあて').textContent).toBe(`🎯 つぎのめあて：${lv2}のボス`)
})

it('デザイン144：ボス図鑑に、とくぎの種類ごとに勝ったボスの数が出る', async () => {
  const { BOSSES } = await import('./boss')
  localStorage.clear()
  const a = BOSSES['中1']
  localStorage.setItem('eitan:boss-book', JSON.stringify({ [a.name]: { look: a, wins: 1, best: 'A', first: '2026-10-01' } }))
  render(<BossBook />)
  const t = traitOf(a.name)
  expect(screen.getByLabelText('とくぎごとに勝ったボスの数').textContent).toContain(`${BOSS_TRAITS[t].icon}1`)
})

it('デザイン154：ボス図鑑で、いちばん最近たおしたボスに「🆕 さいきん」が出る', () => {
  localStorage.clear()
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  const en = document.querySelector('.boss .en')!.textContent
  const w = wordsOf(['中1']).find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
  unmount()
  render(<BossBook />)
  const mark = screen.getByLabelText('いちばん最近たおしたボス')
  expect(mark.textContent).toBe(' 🆕 さいきん')
  expect(mark.closest('li')!.querySelector('.badge-name')!.textContent).toBe('ヤミモチ')
})
