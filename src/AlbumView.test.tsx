import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { albumEntries } from './album'
import { Album } from './AlbumView'

it('もらったバッジを日付順にならべる', () => {
  const e = { 'streak-3': '2026-10-05', 'answers-100': '2026-10-01' }
  expect(albumEntries(e).map((b) => b.id)).toEqual(['answers-100', 'streak-3'])
  render(<Album earned={e} born="2026-09-30" />)
  const items = screen.getByRole('list', { name: '思い出アルバム' }).querySelectorAll('li')
  expect(items).toHaveLength(3)
  expect(items[0].textContent).toContain('相棒と出会った')
})
