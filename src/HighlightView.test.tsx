import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Highlight } from './HighlightView'

it('見出し語（変化形）を太字にする。見つからなければそのまま', () => {
  const { container, rerender } = render(<Highlight text="She decided to study abroad." word="decide" />)
  expect(container.querySelector('.hl')?.textContent).toBe('decided')
  expect(container.textContent).toBe('She decided to study abroad.')
  rerender(<Highlight text="Hello there." word="apple" />)
  expect(container.querySelector('.hl')).toBeNull()
})
