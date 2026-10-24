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

it('取ったバッジだけ並べ、まだのバッジはたたんで数だけ見せる', () => {
  render(<BadgeList earned={{ [BADGES[0].id]: '2026-10-01' }} />)
  expect(document.querySelectorAll('.badges > .badge-grid li')).toHaveLength(1)
  expect(document.querySelector('details.badges-locked:not([open]) summary')!.textContent).toContain(String(BADGES.length - 1))
})
