import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BuddyFigure } from './BuddyFigureView'

it('文法のペット・長文の竜はオリジナルの絵（SVG）で、姿の名前がラベルになる', () => {
  const { container, rerender } = render(<BuddyFigure track="grammar" buddy={{ xp: 0 }} />)
  expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('ペットのタマゴ')
  rerender(<BuddyFigure track="reading" buddy={{ xp: 100000 }} />)
  expect(container.querySelector('svg')!.getAttribute('aria-label')).toBe('つきのしんりゅう（月の神竜）')
})
