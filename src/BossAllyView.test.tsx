import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { BossAlly } from './BossAllyView'

it('ボス部屋の上に読解の竜と次の進化までが出る', () => {
  render(<BossAlly buddy={{ xp: 0 }} />)
  const el = screen.getByLabelText('いっしょに戦う読解の竜')
  expect(el.textContent).toContain('りゅうのタマゴ Lv.1')
  expect(el.textContent).toContain('あと1レベルで「ちびドラ」に進化')
})
