import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BuddyFigure } from './BuddyFigureView'
import { BUDDY_FORMS, growthStars } from './buddies'
import { levelInfo } from './monster'

// そのレベルになるXP
const xpFor = (lv: number) => {
  let xp = 0
  while (levelInfo(xp).level < lv) xp += 5
  return xp
}

it('文法のことばモンスター・長文の竜はオリジナルの絵（SVG）で、姿の名前がラベルになる', () => {
  const { container, rerender } = render(<BuddyFigure track="grammar" buddy={{ xp: 0 }} />)
  expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('ことばのタマゴ')
  rerender(<BuddyFigure track="reading" buddy={{ xp: 1000000 }} />)
  expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('つきのしんりゅう（月の神竜）')
})

it('文法のなかまは動物ではない、ことば・文房具のモンスター（8つの姿）', () => {
  expect(BUDDY_FORMS.grammar.map((f) => f.name)).toEqual(['ことばのタマゴ', 'インクぷる', 'ペンボウ', 'けしゴーン', 'ノートン', 'ルーンゴーレム', 'まどうしょナイト', 'ブンポウキング'])
  for (const f of BUDDY_FORMS.grammar) expect(f.icon).not.toMatch(/[🐹🐰🐶🐱🦜]/u)
})

it('進化のあいだも1レベルごとに星がふえて育つ', () => {
  const b2 = { xp: xpFor(2) }
  const b3 = { xp: xpFor(3) }
  expect(growthStars('grammar', b2)).toBe(0) // Lv.2 でインクぷるに進化したばかり
  expect(growthStars('grammar', b3)).toBe(1)
  const { container } = render(<BuddyFigure track="grammar" buddy={b3} />)
  expect(container.querySelectorAll('.buddy-star')).toHaveLength(1)
})
