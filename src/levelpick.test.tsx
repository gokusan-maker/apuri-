import { expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { LevelPick } from './LevelPickView'
import App from './App'

it('レベルえらびは小さなボタン。おすと候補が出て、えらぶと閉じる', () => {
  const pick = vi.fn()
  render(<LevelPick label="単語のレベル" current="a" spots={[{ id: 'a', name: '英検5級' }, { id: 'b', name: '英検4級', done: 1, total: 3 }]} onPick={pick} />)
  expect(screen.queryByRole('listbox')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '単語のレベル：英検5級（変更）' }))
  expect(screen.getByRole('option', { name: /英検4級/ }).textContent).toContain('1/3')
  fireEvent.click(screen.getByRole('option', { name: /英検4級/ }))
  expect(pick).toHaveBeenCalledWith('b')
  expect(screen.queryByRole('listbox')).toBeNull()
})

it('文法ページ：キャラの下でレベルをえらぶと、そのレベルの城に変わる', () => {
  localStorage.clear()
  localStorage.setItem('eitan:onboarded', '1')
  render(<App />)
  fireEvent.click(within(screen.getByRole('navigation', { name: '画面の切り替え' })).getByText('文法チャレンジ'))
  fireEvent.click(screen.getByRole('button', { name: /^文法のレベル：/ }))
  fireEvent.click(screen.getByRole('option', { name: /^国公立大/ }))
  expect(screen.getByRole('region', { name: '国公立大の文法の城' })).toBeInTheDocument()
  expect(localStorage.getItem('eitan:grammar-castle')).toBe('exam-kokkoritsu')
})

it('単語ページ：上の切りかえはなく、レベルをえらぶとその級の城に変わる', () => {
  localStorage.clear()
  localStorage.setItem('eitan:onboarded', '1')
  render(<App />)
  fireEvent.click(within(screen.getByRole('navigation', { name: '画面の切り替え' })).getByText('単語ゲーム'))
  expect(screen.queryByRole('tab', { name: '⏱ タイムアタック' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: /^単語のレベル：/ }))
  fireEvent.click(screen.getByRole('option', { name: /^英検3級/ }))
  expect(screen.getByRole('region', { name: '英検3級の城' })).toBeInTheDocument()
})
