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
