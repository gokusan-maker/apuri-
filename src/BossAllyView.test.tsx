import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BossAlly } from './BossAllyView'

it('ボス部屋の上に読解の竜と次の進化までが出る', () => {
  render(<BossAlly buddy={{ xp: 0 }} />)
  const el = screen.getByLabelText('いっしょに戦う読解の竜')
  expect(el.textContent).toContain('りゅうのタマゴ Lv.1')
  expect(el.textContent).toContain('あと1レベルで ？？？ に進化')
})

it('次の進化の姿は ？？？ でひみつ（わかったほうがワクワクしない）', async () => {
  const { BUDDY_FORMS } = await import('./buddies')
  render(<BossAlly buddy={{ xp: 0 }} />)
  expect(document.body.textContent).not.toContain(BUDDY_FORMS.reading[1].name)
})
