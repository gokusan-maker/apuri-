import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BadgeList } from './BadgesView'
import { BADGES } from './badges'

it('バッジのタイルは名前だけで、押すと条件が上に出る（もう一度押すと消える）', () => {
  const b = BADGES[1]
  render(<BadgeList earned={{}} />)
  expect(document.body.textContent).not.toContain(b.desc)
  fireEvent.click(screen.getByRole('button', { name: new RegExp(b.name) }))
  expect(screen.getByRole('status').textContent).toContain(b.desc)
  fireEvent.click(screen.getByRole('button', { name: new RegExp(b.name) }))
  expect(screen.queryByRole('status')).toBeNull()
})
