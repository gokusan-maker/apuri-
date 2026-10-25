import { render } from '@testing-library/react'
import { test, expect } from 'vitest'
import { LongReading } from './LongReadingView'
import { ADV_PASSAGES } from './advreading'
test('難関大の長文でも、下線部（本文に下線）と語句整序の問題が出る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'adv-tipping')!
  const { container } = render(<LongReading passages={[p]} start={p} />)
  expect(container.querySelector('.long-underline')?.textContent).toBe('remains to be seen')
  expect(container.textContent).toContain('並べ')
})
