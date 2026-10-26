import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BossArena } from './BossArenaView'
import { BOSSES, traitOf } from './boss'

it('ボス戦の舞台：ステージごとの景色に、ボスの色のオーラと台', () => {
  for (const bg of ['field', 'forest', 'mountain', 'night', 'castle', 'sea', 'gold'] as const) {
    const { container, unmount } = render(<BossArena bg={bg} color="#ff0000" />)
    expect(container.querySelector(`svg.boss-arena.arena-${bg}`)).not.toBeNull()
    expect(container.querySelector('.arena-aura')).not.toBeNull()
    unmount()
  }
})

it('ボスのとくぎは、似た名前のボスでもばらける（4種類とも使われる）', () => {
  expect(new Set(Object.values(BOSSES).map((b) => traitOf(b.name))).size).toBe(4)
})
