import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { CHAR_TYPES, typeOf } from './chartype'
import { Gacha } from './GachaView'
import { SPECIES } from './monster'

it('どのキャラクターにもタイプがある（特技からきまる）', () => {
  for (const sp of SPECIES) expect(Object.values(CHAR_TYPES)).toContain(typeOf(sp.id))
  expect(typeOf('dragon').name).toBe('アタック型')
  expect(typeOf('penguin').name).toBe('シールド型')
  expect(typeOf(undefined).name).toBe('ねばり型')
})

it('ガチャのページにキャラクター図鑑：会っていない子は ？？？、タップでタイプの説明', () => {
  render(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox']} />)
  expect(screen.getByLabelText(`キャラクター図鑑 2 / ${SPECIES.length}`)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'コンコン（アタック型）' })).toBeInTheDocument()
  const locked = screen.getAllByRole('button', { name: 'まだ会っていないキャラクター' })
  expect(locked).toHaveLength(SPECIES.length - 2)
  fireEvent.click(screen.getByRole('button', { name: 'コンコン（アタック型）' }))
  expect(screen.getByRole('status').textContent).toContain('ボスへのダメージをふやす')
})

it('なかま交換は、交換する10体をえらべる（10体えらぶまで交換できない）', () => {
  const pool = Array.from({ length: 12 }, (_, i) => ({ index: i + 1, member: { xp: 0, name: `子${i + 1}` } }))
  let got: number[] | undefined
  render(<Gacha partnerName="モチ" coins={0} members={13} pityLeft={10} onDraw={() => null} tradeCount={12} tradePool={pool} onTrade={(p) => (got = p)} />)
  fireEvent.click(screen.getByRole('button', { name: '🎟 えらんで交換' }))
  expect(screen.getByRole('status').textContent).toContain('10/10')
  expect(screen.getByRole('button', { name: '子3 Lv.1' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: '子1 Lv.1' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: '子3 Lv.1' }))
  expect(screen.getByRole('button', { name: '🎟 この10体と交換' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: '子1 Lv.1' }))
  fireEvent.click(screen.getByRole('button', { name: '🎟 この10体と交換' }))
  expect(got?.sort((a, b) => a - b)).toEqual([1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((x) => x !== 2))
})

it('新しいキャラ（フクロウ・カメ・タコ）は、色ちがいではなくちがう形のパーツで描かれる', async () => {
  const { MonsterFigure } = await import('./MonsterView')
  const { FORMS, withSpecies } = await import('./monster')
  const paths = (sp: string) => {
    const r = render(<MonsterFigure form={withSpecies(FORMS[2], sp)} />)
    const d = [...r.container.querySelectorAll('path, circle')].map((e) => e.getAttribute('d') ?? `c${e.getAttribute('cx')},${e.getAttribute('cy')}`).join('|')
    r.unmount()
    return d
  }
  const base = paths('mochi')
  for (const sp of ['owl', 'turtle', 'octopus']) {
    expect(paths(sp)).not.toBe(base)
    expect(SPECIES.some((s) => s.id === sp)).toBe(true)
  }
  expect(typeOf('turtle').name).toBe('シールド型')
  expect(typeOf('owl').name).toBe('サポート型')
  expect(typeOf('octopus').name).toBe('スピード型')
})
