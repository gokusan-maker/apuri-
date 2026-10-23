import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Onboarding } from './OnboardingView'

it('ページの点：いまのページだけ on になる', () => {
  const { container } = render(<Onboarding onDone={() => {}} />)
  const dots = container.querySelectorAll('.onboarding-dots span')
  expect(dots[0].className).toBe('on')
  expect(dots[1].className).toBe('')
})
