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
