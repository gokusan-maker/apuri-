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
  expect(screen.getAllByText('？？？').length).toBeGreaterThanOrEqual(2) // まだ会っていない種類は名前もひみつ
  expect(screen.getByText(/会えた姿 4 \/ 24/)).toBeInTheDocument()
})

it('なかま図鑑の会えた姿をタップすると、その姿の名前が出る', async () => {
  const { fireEvent } = await import('@testing-library/react')
  render(<BuddyZukan buddies={{ grammar: { xp: xpForLevel(2) }, reading: { xp: 0 } }} box={{ grammar: {}, reading: {} }} />)
  fireEvent.click(screen.getByLabelText('インクぷる（Lv.2〜）'))
  expect(screen.getByRole('status').textContent).toBe('インクぷる（Lv.2〜）')
})
