import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Wear } from './MonsterView'
import { ITEMS, EVENT_ITEMS, slotOf, toggleWear } from './shop'

it('すべての着せ替えに絵がある', () => {
  for (const i of [...ITEMS, ...EVENT_ITEMS]) {
    const { container } = render(
      <svg>
        <Wear id={i.id} />
      </svg>,
    )
    expect(container.querySelector('svg')!.children.length, i.id).toBeGreaterThan(0)
  }
})

it('サングラスは顔、真珠のネックレスは首、キャップは頭', () => {
  expect([slotOf('sunglasses'), slotOf('pearls'), slotOf('cap')]).toEqual(['face', 'neck', 'head'])
  expect(toggleWear('glasses,scarf', 'sunglasses')).toBe('scarf,sunglasses')
})
