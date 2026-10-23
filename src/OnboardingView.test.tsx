import { fireEvent, render, screen } from '@testing-library/react'
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

it('ページの点は .done（ほかの画面の大きな余白がつくクラス）を使わず、1行にならぶ', () => {
  render(<Onboarding onDone={() => {}} />)
  fireEvent.click(screen.getByText('つぎへ'))
  fireEvent.click(screen.getByText('つぎへ'))
  const dots = document.querySelectorAll('.onboarding-dots span')
  expect([...dots].map((d) => d.className)).toEqual(['seen', 'seen', 'on'])
})
