import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { missionsFor } from './missions'
import { Missions } from './MissionsView'

it('ミッションのチェック：達成したものだけ丸いチェック（on）になる', () => {
  const today = '2026-10-23'
  const [m] = missionsFor(today)
  const { container } = render(<Missions state={{ day: today, counts: { [m.counter]: m.target }, claimed: [] }} today={today} />)
  const checks = [...container.querySelectorAll('.mission-check')]
  expect(checks[0].classList.contains('on')).toBe(true)
  expect(checks[0].textContent).toBe('✓')
  expect(checks.slice(1).every((c) => !c.classList.contains('on'))).toBe(true)
})
