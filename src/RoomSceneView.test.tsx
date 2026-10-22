import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { RoomScene } from './RoomSceneView'
import { ROOMS } from './shop'

it('すべての部屋に背景のイラストがあり、部屋なしでは出ない', () => {
  for (const r of ROOMS) {
    const { container } = render(<RoomScene room={r.id} />)
    expect(container.querySelector(`.scene-${r.id}`), r.id).not.toBeNull()
  }
  expect(render(<RoomScene />).container.innerHTML).toBe('')
})

it('ホームでは部屋がカード全体ではなく、相棒のうしろの小さな四角にだけ敷かれる', async () => {
  const { Monster } = await import('./MonsterView')
  const { container } = render(<Monster monster={{ xp: 0 } as never} room="ocean" />)
  const card = container.querySelector('section.monster')!
  expect(card.className).not.toMatch(/room-/)
  const stage = card.querySelector('.monster-stage.room-ocean')!
  expect(stage).not.toBeNull()
  expect(stage.querySelector('.scene-ocean')).not.toBeNull()
  expect(stage.querySelector('.monster-body')).not.toBeNull()
})
