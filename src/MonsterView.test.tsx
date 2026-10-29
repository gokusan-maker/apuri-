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
