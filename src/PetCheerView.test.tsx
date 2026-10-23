import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PetCheer } from './PetCheerView'
import { FORMS } from './monster'

it('はげましの吹き出し：figure をわたすとその姿（文法・読解のなかま）が出る', () => {
  const cheer = { text: 'おしい！もう少し！', ja: 'おしい！もう少し！', lang: 'ja' as const }
  const { rerender } = render(<PetCheer cheer={cheer} form={FORMS[0]} onClose={() => {}} />)
  expect(document.querySelector('.pet-cheer-face [data-testid="buddy-fig"]')).toBeNull()
  rerender(<PetCheer cheer={cheer} form={FORMS[0]} onClose={() => {}} figure={<span data-testid="buddy-fig">🔤</span>} />)
  expect(screen.getByTestId('buddy-fig')).toBeInTheDocument()
  expect(screen.getByRole('status').textContent).toContain('おしい！もう少し！')
})
