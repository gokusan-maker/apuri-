import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BuddyFigure } from './BuddyFigureView'

it('文法のペットモンスター・長文の竜はオリジナルの絵（SVG）で、姿の名前がラベルになる', () => {
  const { container, rerender } = render(<BuddyFigure track="grammar" buddy={{ xp: 0 }} />)
  expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('モンスターのタマゴ')
  rerender(<BuddyFigure track="reading" buddy={{ xp: 100000 }} />)
  expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('つきのしんりゅう（月の神竜）')
})

it('文法のなかまはペットの名前のモンスター（タマゴからかえるとハムモン、つきの絵）', async () => {
  const { BUDDY_FORMS } = await import('./buddies')
  expect(BUDDY_FORMS.grammar.map((f) => f.name)).toEqual(['モンスターのタマゴ', 'ハムモン', 'ピョンモン', 'ワンモン', 'ニャンモン', 'インコモンはかせ'])
  const { container } = render(<BuddyFigure track="grammar" buddy={{ xp: 20 }} />)
  expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('ハムモン')
  expect(container.querySelectorAll('path').length).toBeGreaterThanOrEqual(3) // つの2本＋きば
})
