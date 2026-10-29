import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Party } from './MonsterView'


it('仲間がたくさんいるときは24体ずつ見せて「もっと見る」（相棒はかならず見える）', () => {
  const party = { active: 30, gacha: 39, members: Array.from({ length: 40 }, () => ({ xp: 0 })) }
  render(<Party party={party} onSelect={() => {}} />)
  expect(document.querySelectorAll('.party-member')).toHaveLength(24)
  expect(document.querySelector('.party-member[aria-pressed="true"]')).not.toBeNull()
  fireEvent.click(screen.getByRole('button', { name: /もっと見る（あと16体）/ }))
  expect(document.querySelectorAll('.party-member')).toHaveLength(40)
})

it('デザイン82：なかまを「レベルの高い順」にならべかえられる', () => {
  const party = { active: 0, members: [{ xp: 10, name: 'A' }, { xp: 900, name: 'B' }, { xp: 300, name: 'C' }] }
  render(<Party party={party as never} onSelect={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: '⬆️ レベルの高い順' }))
  const names = [...document.querySelectorAll('.party-member .badge-name')].map((e) => e.textContent)
  expect(names).toEqual(['B', 'C', 'A'])
})

it('デザイン83：なかま一覧で「おきにいりだけ」にすると、★の子と相棒だけが見える', () => {
  const party = { active: 0, members: [{ xp: 10, name: 'A' }, { xp: 900, name: 'B', fav: true }, { xp: 300, name: 'C' }] }
  render(<Party party={party as never} onSelect={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: '★ おきにいりだけ' }))
  const names = [...document.querySelectorAll('.party-member .badge-name')].map((e) => e.textContent)
  expect(names.sort()).toEqual(['A', 'B'])
})

it('デザイン84：なかま一覧をタイプでしぼりこめる（相棒はいつも見える）', async () => {
  const { typeOf } = await import('./chartype')
  const { SPECIES } = await import('./monster')
  const a = SPECIES.find((s) => s.id !== 'mochi' && typeOf(s.id).id !== typeOf('mochi').id)!
  const party = { active: 0, members: [{ xp: 10, name: 'A', species: 'mochi' }, { xp: 20, name: 'B', species: a.id }, { xp: 30, name: 'C', species: 'mochi' }] }
  render(<Party party={party as never} onSelect={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: `${typeOf(a.id).icon} ${typeOf(a.id).name}` }))
  const names = [...document.querySelectorAll('.party-member .badge-name')].map((e) => e.textContent)
  expect(names.sort()).toEqual(['A', 'B'])
})

it('デザイン85：なかま一覧の上に、なかまの数とおきにいり★の数が出る', () => {
  const party = { active: 0, members: [{ xp: 10 }, { xp: 20, fav: true }, { xp: 30, fav: true }] }
  render(<Party party={party as never} onSelect={() => {}} />)
  expect(screen.getByLabelText('なかま 3体・おきにいり 2体').textContent).toBe('🐾 3体・★ 2体')
})
