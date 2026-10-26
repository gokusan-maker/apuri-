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

it('夜は舞台の空が暗くなり星が出る（夜の舞台はもとから夜なので重ねない）', () => {
  const { container, unmount } = render(<BossArena bg="field" color="#ff0000" night />)
  expect(container.querySelector('.arena-nightfall')).not.toBeNull()
  unmount()
  expect(render(<BossArena bg="night" color="#ff0000" night />).container.querySelector('.arena-nightfall')).toBeNull()
})

it('ボスがいかると舞台が赤く脈打つ（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.boss-figure\.rage \.boss-arena \{ animation: arena-rage/)
})

it('季節：12〜2月は雪、3〜4月はさくら、ほかはなし。海と金の舞台には出さない', async () => {
  const { arenaSeasonOf } = await import('./boss')
  expect([11, 0, 1].map(arenaSeasonOf)).toEqual(['snow', 'snow', 'snow'])
  expect([2, 3].map(arenaSeasonOf)).toEqual(['sakura', 'sakura'])
  expect(arenaSeasonOf(6)).toBeNull()
  const { container, unmount } = render(<BossArena bg="forest" color="#f00" season="snow" />)
  expect(container.querySelector('.arena-season.s-snow')).not.toBeNull()
  unmount()
  expect(render(<BossArena bg="sea" color="#f00" season="snow" />).container.querySelector('.arena-season')).toBeNull()
})
