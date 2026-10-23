import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Onboarding } from './OnboardingView'

it('ページの点：いまのページだけ on になる', () => {
  const { container } = render(<Onboarding onDone={() => {}} />)
  const dots = container.querySelectorAll('.onboarding-dots span')
  expect(dots[0].className).toBe('on')
  expect(dots[1].className).toBe('')
})

it('案内の題名は「へ」のあとでだけ改行できる（カタカナのとちゅうで切れない）', () => {
  render(<Onboarding onDone={() => {}} />)
  const t = document.querySelector('.onboarding-title')!
  expect(t.textContent).toBe('イングリッシュモンスターへようこそ！')
  expect(t.querySelectorAll('wbr').length).toBe(1)
})
