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
