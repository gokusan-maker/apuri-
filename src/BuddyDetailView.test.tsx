import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { addBuddyToday, loadBuddyDays, renameBuddy, type Buddies } from './buddies'
import { BuddyDetail } from './BuddyDetailView'

it('文法のことばモンスター・長文の竜に名前をつけられ、進化の一覧と次までのXPが出る', () => {
  let b: Buddies = { grammar: { xp: 200 }, reading: { xp: 0 } }
  const { rerender } = render(<BuddyDetail buddies={b} onRename={(t, n) => (b = renameBuddy(b, t, n))} />)
  const g = screen.getByLabelText('文法のなかま')
  expect(g.textContent).toMatch(/次のレベルまで あと \d+ XP/)
  expect(g.querySelectorAll('.buddy-forms li')).toHaveLength(8)
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
  expect(hoshi.textContent).toContain('Lv.5 にすると仲間に')
  expect(hoshi.textContent).toContain('ショップの属性のタマゴ')
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
  expect(screen.getByLabelText('文法のなかま')).toHaveTextContent('いっしょに学んだ日：2日')
  expect(screen.getByLabelText('読解のなかま')).toHaveTextContent('いっしょに学んだ日：0日')
})
