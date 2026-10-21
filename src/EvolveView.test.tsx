import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Evolve } from './EvolveView'
import { FORMS } from './monster'

it('進化の演出：名前と図鑑の説明が出て、タップで閉じる', () => {
  const close = vi.fn()
  const f = FORMS.find((x) => x.id === 'sora')!
  render(<Evolve form={f} onClose={close} />)
  expect(screen.getByText('進化した！')).toBeInTheDocument()
  expect(screen.getByText('ソラモチ')).toBeInTheDocument()
  expect(screen.getByText(/つばさを広げて/)).toBeInTheDocument()
  expect(document.querySelectorAll('.evolve-spark')).toHaveLength(6)
  fireEvent.click(screen.getByText('やったね！'))
  expect(close).toHaveBeenCalled()
})
