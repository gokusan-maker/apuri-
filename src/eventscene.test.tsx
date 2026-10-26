import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { EventScene } from './EventSceneView'

it('その日のイベントは、イベントごとにちがう絵（金の宝箱・大学入試の塔は自分の絵があるので出さない）', () => {
  for (const id of ['endless', 'rush', 'rush-ex', 'night', 'weekend', 'time', 'rare', 'quest'] as const) {
    const { container, unmount } = render(<EventScene id={id} />)
    expect(container.querySelector(`svg.event-scene.es-${id}`)).not.toBeNull()
    unmount()
  }
  expect(render(<EventScene id="univ" />).container.querySelector('svg')).toBeNull()
})
