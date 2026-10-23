import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { GameTile } from './GameTileView'
import { loadTodayGames } from './gamesplayed'
import { dayKey } from './srs'

it('はじめは NEW、あそぶと「✅ 今日」の印がつき、次の日には消える', () => {
  localStorage.clear()
  const { unmount } = render(<GameTile icon="🎯" name="テスト" playKey="t1" onClick={() => {}} />)
  expect(screen.getByText('NEW')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /テスト/ }))
  expect(screen.queryByText('NEW')).toBeNull()
  expect(screen.getByText('✅ 今日')).toBeInTheDocument()
  expect(loadTodayGames(dayKey())).toEqual(['t1'])
  unmount()
  render(<GameTile icon="🎯" name="テスト" playKey="t1" onClick={() => {}} />)
  expect(screen.getByText('✅ 今日')).toBeInTheDocument()
  expect(loadTodayGames('2099-01-01')).toEqual([])
})

it('8文字以上の名前は long になって1行に収める', () => {
  const { container } = render(<GameTile icon="👾" name="モンスターラッシュ" onClick={() => {}} />)
  expect(container.querySelector('.game-tile-name')?.classList.contains('long')).toBe(true)
  const { container: c2 } = render(<GameTile icon="🎯" name="文法ビンゴ" onClick={() => {}} />)
  expect(c2.querySelector('.game-tile-name')?.classList.contains('long')).toBe(false)
})
