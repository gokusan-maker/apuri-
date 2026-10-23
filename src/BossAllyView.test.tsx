import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BossAlly } from './BossAllyView'

it('ボス部屋の上に読解の竜と次の進化までが出る', () => {
  render(<BossAlly buddy={{ xp: 0 }} />)
  const el = screen.getByLabelText('いっしょに戦う読解の竜')
  expect(el.textContent).toContain('りゅうのタマゴ Lv.1')
  expect(el.textContent).toContain('あと1レベルで ？？？ に進化')
  expect(el.textContent).not.toContain('正解すると育つ')
})

it('次の進化の姿は ？？？ でひみつ（わかったほうがワクワクしない）', async () => {
  const { BUDDY_FORMS } = await import('./buddies')
  render(<BossAlly buddy={{ xp: 0 }} />)
  expect(document.body.textContent).not.toContain(BUDDY_FORMS.reading[1].name)
})

it('ボス部屋の上にタマゴのかけらの数が出る', () => {
  localStorage.setItem('eitan:egg-pieces', '3')
  render(<BossAlly buddy={{ xp: 0 }} />)
  expect(screen.getByLabelText('タマゴのかけら 3 / 5')).toBeInTheDocument()
})

it('ボス部屋の上に、たおしたボスの数が出る', () => {
  render(<BossAlly buddy={{ xp: 0 }} wins={3} total={19} />)
  expect(screen.getByLabelText('たおしたボスの数').textContent).toContain('3/19体')
})

it('上のなかまをタップすると英語でひとこと（和訳つき）', async () => {
  const { fireEvent } = await import('@testing-library/react')
  const { TAP_LINES } = await import('./buddies')
  render(<BossAlly buddy={{ xp: 0 }} />)
  fireEvent.click(screen.getByLabelText(/に話しかける/))
  expect(screen.getByRole('status').textContent).toContain(TAP_LINES.reading[0].en)
  expect(screen.getByRole('status').textContent).toContain(TAP_LINES.reading[0].ja)
})

it('タップのひとことは文法・読解それぞれ6種類で、重ならない', async () => {
  const { TAP_LINES } = await import('./buddies')
  for (const t of ['grammar', 'reading'] as const) {
    expect(TAP_LINES[t]).toHaveLength(6)
    expect(new Set(TAP_LINES[t].map((l) => l.en)).size).toBe(6)
  }
})
