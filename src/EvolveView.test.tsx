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

it('進化前の姿のシルエットと「前 → 後」の名前が出る', () => {
  render(<Evolve form={FORMS[2]} from={FORMS[1]} onClose={() => {}} />)
  expect(document.querySelector('.evolve-from')).not.toBeNull()
  expect(document.querySelector('.evolve-pillar')).not.toBeNull()
  expect(screen.getByText(FORMS[2].name, { selector: 'strong' })).toBeInTheDocument()
  expect(document.querySelector('.evolve-change')!.textContent).toBe(`${FORMS[1].name} → ${FORMS[2].name}`)
})
