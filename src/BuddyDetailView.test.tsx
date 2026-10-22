import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { renameBuddy, type Buddies } from './buddies'
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
  expect(screen.getByLabelText('長文のなかま').textContent).toContain('りゅうのタマゴ')
})

it('名前を空にすると名前が消える', () => {
  expect(renameBuddy({ grammar: { xp: 5, name: 'ポチ' }, reading: { xp: 0 } }, 'grammar', '')).toEqual({ grammar: { xp: 5 }, reading: { xp: 0 } })
})
