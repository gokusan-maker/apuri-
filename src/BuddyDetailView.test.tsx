import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { dayMedal, nextDayMedal, SPECIES_PROFILE, BUDDY_FORMS, recordEvo, loadEvoLog, addBuddyToday, loadBuddyDays, renameBuddy, type Buddies } from './buddies'
import { BuddyDetail } from './BuddyDetailView'

const speakMock = vi.hoisted(() => vi.fn())
vi.mock('./speech', () => ({ speak: speakMock }))

it('文法のことばモンスター・読解の竜に名前をつけられ、進化の一覧と次までのXPが出る', () => {
  let b: Buddies = { grammar: { xp: 200 }, reading: { xp: 0 } }
  const { rerender } = render(<BuddyDetail buddies={b} onRename={(t, n) => (b = renameBuddy(b, t, n))} />)
  const g = screen.getByLabelText('文法のなかま')
  expect(g.textContent).toMatch(/あと \d+XP で (Lv\.\d+|？？？ に進化)/)
  const lis = [...g.querySelectorAll('.buddy-forms li')]
  expect(lis.length).toBeLessThan(8) // まだ先の姿は「？？？ ×N」にまとめる
  expect(lis.filter((li) => li.classList.contains('got')).length + lis.filter((li) => li.classList.contains('locked') && !li.classList.contains('more')).length + Number(lis.at(-1)!.textContent!.match(/×(\d+)/)?.[1] ?? 0)).toBe(8)
  fireEvent.click(within(g).getByText('✏️ 名前をつける'))
  fireEvent.change(screen.getByLabelText('なかまの名前'), { target: { value: 'ポチ' } })
  fireEvent.click(screen.getByText('決定'))
  expect(b.grammar.name).toBe('ポチ')
  rerender(<BuddyDetail buddies={b} onRename={() => {}} />)
  expect(screen.getByLabelText('文法のなかま').textContent).toContain('ポチ')
  expect(screen.getByLabelText('読解のなかま').textContent).toContain('りゅうのタマゴ')
})

it('名前を空にすると名前が消える', () => {
  expect(renameBuddy({ grammar: { xp: 5, name: 'ポチ' }, reading: { xp: 0 } }, 'grammar', '')).toEqual({ grammar: { xp: 5 }, reading: { xp: 0 } })
})

it('なかまは属性ごとに入れかえられ、まだ仲間でない種類は鍵がかかっている', async () => {
  const { switchBuddy, BUDDY_SPECIES } = await import('./buddies')
  let b: Buddies = { grammar: { xp: 0 }, reading: { xp: 0 } }
  let box = { grammar: {}, reading: {} }
  const { rerender } = render(<BuddyDetail buddies={b} box={box} onRename={() => {}} onSwitch={(t, id) => ({ buddies: b, box } = switchBuddy(b, box, t, id))} />)
  const g = screen.getByLabelText('文法のなかまを入れかえる')
  expect(screen.getByLabelText('文法のなかま').textContent).toContain('属性：文法')
  // Lv.1 では2体目に鍵
  const hoshi = within(g).getByText(BUDDY_SPECIES.grammar[1].label).closest('button')!
  expect(hoshi).toBeDisabled()
  expect(hoshi.textContent).toContain('Lv.5 で仲間に')
  expect(hoshi.getAttribute('title')).toContain('ショップの属性のタマゴ')
  // Lv.5 まで育てると入れかえられる
  b = { grammar: { xp: 100000 }, reading: { xp: 0 } }
  rerender(<BuddyDetail buddies={b} box={box} onRename={() => {}} onSwitch={(t, id) => ({ buddies: b, box } = switchBuddy(b, box, t, id))} />)
  fireEvent.click(within(screen.getByLabelText('文法のなかまを入れかえる')).getByText(BUDDY_SPECIES.grammar[1].label))
  expect(b.grammar).toEqual({ xp: 0, species: 'hoshi' })
  expect(box.grammar).toEqual({ kotoba: { xp: 100000, species: 'kotoba' } })
  // 読解のわくには文法のなかまは出てこない
  expect(within(screen.getByLabelText('読解のなかまを入れかえる')).queryByText(/ことばモンスター/)).toBeNull()
})

it('入れかえると前のなかまは XP を持ったままベンチで待ち、もどすとつづきから', async () => {
  const { switchBuddy } = await import('./buddies')
  let r = switchBuddy({ grammar: { xp: 500, name: 'ポチ' }, reading: { xp: 0 } }, { grammar: {}, reading: {} }, 'grammar', 'hoshi')
  r = switchBuddy({ ...r.buddies, grammar: { ...r.buddies.grammar, xp: 30 } }, r.box, 'grammar', 'kotoba')
  expect(r.buddies.grammar).toEqual({ xp: 500, name: 'ポチ', species: 'kotoba' })
  expect(r.box.grammar.hoshi).toEqual({ xp: 30, species: 'hoshi' })
})

it('経験値をもらった日の数を「いっしょに学んだ日」として出す（同じ日は1回だけ数える）', () => {
  localStorage.clear()
  addBuddyToday('2026-10-20', 'grammar', 5)
  addBuddyToday('2026-10-20', 'grammar', 5)
  addBuddyToday('2026-10-21', 'grammar', 3)
  addBuddyToday('2026-10-21', 'reading', 0)
  expect(loadBuddyDays()).toEqual({ grammar: 2, reading: 0 })
  render(<BuddyDetail buddies={{ grammar: { xp: 13 }, reading: { xp: 0 } }} onRename={() => {}} />)
  expect(screen.getByLabelText('文法のなかま')).toHaveTextContent('🗓 2日')
  expect(screen.getByLabelText('読解のなかま')).toHaveTextContent('🗓 0日')
})

it('進化した日を記録して、進化の一覧に「M/D に進化」と出す（2回目は上書きしない）', () => {
  localStorage.clear()
  const second = BUDDY_FORMS.grammar[1].name
  recordEvo('grammar', second, '2026-10-20')
  recordEvo('grammar', second, '2026-10-21')
  expect(loadEvoLog().grammar[second]).toBe('2026-10-20')
  render(<BuddyDetail buddies={{ grammar: { xp: 200 }, reading: { xp: 0 } }} onRename={() => {}} />)
  expect(within(screen.getByLabelText('文法のなかま')).getByText(/10\/20 に進化/)).toBeInTheDocument()
  expect(within(screen.getByLabelText('読解のなかま')).queryByText(/\d+\/\d+ に進化/)).toBeNull()
})

it('これまでにもらった経験値の合計を出す', () => {
  render(<BuddyDetail buddies={{ grammar: { xp: 345 }, reading: { xp: 12 } }} onRename={() => {}} />)
  expect(screen.getByLabelText('文法のなかま')).toHaveTextContent('✨ 345XP')
  expect(screen.getByLabelText('読解のなかま')).toHaveTextContent('✨ 12XP')
})

it('種類ごとの英語のプロフィールを出し、🔊を押したときだけ読む', () => {
  speakMock.mockClear()
  render(<BuddyDetail buddies={{ grammar: { xp: 0 }, reading: { xp: 0, species: 'koori' } }} onRename={() => {}} />)
  expect(screen.getByLabelText('文法のなかま')).toHaveTextContent(SPECIES_PROFILE.kotoba.ja)
  expect(screen.getByLabelText('読解のなかま')).toHaveTextContent(SPECIES_PROFILE.koori.en)
  expect(speakMock).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: '読解のなかまのプロフィールを聞く' }))
  expect(speakMock).toHaveBeenCalledWith(SPECIES_PROFILE.koori.en)
})

it('いっしょに学んだ日の記念メダル（7日🥉・30日🥈・100日🥇）', () => {
  expect(dayMedal(6)).toBe('')
  expect(dayMedal(7)).toBe('🥉')
  expect(dayMedal(45)).toBe('🥈')
  expect(dayMedal(100)).toBe('🥇')
  expect(nextDayMedal(3)?.days).toBe(7)
  expect(nextDayMedal(100)).toBeNull()
  localStorage.clear()
  localStorage.setItem('eitan:buddy-days', JSON.stringify({ grammar: 8, reading: 2 }))
  render(<BuddyDetail buddies={{ grammar: { xp: 0 }, reading: { xp: 0 } }} onRename={() => {}} />)
  expect(screen.getByLabelText('文法のなかま')).toHaveTextContent('8日 🥉あと22日で🥈')
  expect(screen.getByLabelText('読解のなかま')).toHaveTextContent('2日あと5日で🥉')
})
