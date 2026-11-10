import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { BossTower } from './BossTowerView'
import { FLOOR_BOSSES } from './floorbosses'
import { BOSSES } from './boss'
import { COURSES } from './wordcourse'
import { floorBossLook } from './bosscastle'

it('階のボスは15レベル×4体＝60体。名前はすべてちがい、レベルのボスとも重ならない', () => {
  const all = COURSES.flatMap((c) => FLOOR_BOSSES[c.id])
  expect(all).toHaveLength(60)
  const names = all.map((b) => b.name)
  expect(new Set(names).size).toBe(60)
  for (const b of Object.values(BOSSES)) expect(names).not.toContain(b.name)
  for (const b of all) {
    expect(b.name.endsWith('モチ')).toBe(true)
    expect(b.color).toMatch(/^#[0-9a-f]{6}$/i)
    expect(b.taunt?.en).toBeTruthy()
  }
  expect(floorBossLook('東大', 3).name).toBe(FLOOR_BOSSES['東大'][3].name)
})

it('ボスの塔：どの階にもボスが見え、たおした階は「撃破」、上の階はシルエットで押せない', () => {
  const floors = [0, 1, 2, 3, 4].map((i) => ({ id: `f${i}`, label: `L${i}`, look: FLOOR_BOSSES['中1'][Math.min(i, 3)], cleared: i < 2 }))
  const onOpen = vi.fn()
  render(<BossTower name="テストの城" floors={floors} onOpen={onOpen} />)
  const tower = screen.getByRole('region', { name: 'テストの城' })
  expect(tower).toHaveTextContent('2/5階')
  expect(tower.querySelectorAll('.bt-floor .boss-svg')).toHaveLength(5)
  expect(within(tower).getAllByText('撃破')).toHaveLength(2)
  expect(tower.querySelectorAll('.bt-floor.locked')).toHaveLength(2)
  expect(tower.querySelector('.bt-floor.boss')).not.toBeNull()
  expect(within(tower).queryByRole('button', { name: /^4階/ })).toBeNull()
  fireEvent.click(within(tower).getByRole('button', { name: /^3階：L2/ }))
  expect(onOpen).toHaveBeenCalledWith('f2')
})
