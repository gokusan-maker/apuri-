import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BuddyZukan } from './BuddyZukanView'
import { xpForLevel } from './buddies'
import { levelInfo } from './monster'

it('なかま図鑑：会えた姿だけ絵が出て、まだの姿や会っていない種類は ？？？', () => {
  expect(levelInfo(xpForLevel(6)).level).toBe(6)
  render(<BuddyZukan buddies={{ grammar: { xp: xpForLevel(6) }, reading: { xp: 0 } }} box={{ grammar: {}, reading: {} }} />)
  const row = screen.getByLabelText('ことばモンスターの図鑑')
  expect(row.querySelectorAll('svg')).toHaveLength(4) // Lv.6 までの4つの姿
  expect(within(row).getAllByLabelText('まだ会っていない姿')).toHaveLength(4)
  expect(screen.getAllByLabelText(/^まだ会っていない種類 \d+$/).length).toBe(2) // まだ会っていない種類は数だけ（名前もひみつ）
  expect(document.querySelectorAll('.buddy-zukan-row')).toHaveLength(2) // 会えた種類（文法・読解の1つずつ）だけ行を出す
  expect(screen.getByText(/会えた姿 4 \/ 24/)).toBeInTheDocument()
})

it('なかま図鑑の会えた姿をタップすると、その姿の名前が出る', async () => {
  const { fireEvent } = await import('@testing-library/react')
  render(<BuddyZukan buddies={{ grammar: { xp: xpForLevel(2) }, reading: { xp: 0 } }} box={{ grammar: {}, reading: {} }} />)
  fireEvent.click(screen.getByLabelText('インクぷる（Lv.2〜）'))
  expect(screen.getByRole('status').textContent).toBe('インクぷる（Lv.2〜）')
})

it('1つの種類の姿を全部そろえると、コンプボーナスを1回だけ受け取れる', async () => {
  const { fireEvent } = await import('@testing-library/react')
  const { vi } = await import('vitest')
  localStorage.clear()
  const comp = vi.fn()
  const { unmount } = render(<BuddyZukan buddies={{ grammar: { xp: xpForLevel(30) }, reading: { xp: 0 } }} box={{ grammar: {}, reading: {} }} onComp={comp} />)
  fireEvent.click(screen.getByText('🎁 コンプボーナス🎟を受け取る'))
  expect(comp).toHaveBeenCalledTimes(1)
  expect(screen.getByText(/🏆 コンプ！/)).toBeInTheDocument()
  unmount()
  render(<BuddyZukan buddies={{ grammar: { xp: xpForLevel(30) }, reading: { xp: 0 } }} box={{ grammar: {}, reading: {} }} onComp={comp} />)
  expect(screen.queryByText('🎁 コンプボーナス🎟を受け取る')).toBeNull()
})
