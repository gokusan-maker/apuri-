import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Gacha } from './GachaView'
import { GACHA_PRICE, PARTY_MAX } from './gacha'
import { kindOf } from './monster'

it('ガチャを引くとレア度と出たタマゴが表示される', () => {
  const onDraw = vi.fn(() => kindOf('kin'))
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(onDraw).toHaveBeenCalled()
  expect(screen.getByText('スーパーレア！')).toBeInTheDocument()
  expect(screen.getByText('きんいろのタマゴが仲間になった！')).toBeInTheDocument()
  fireEvent.click(screen.getByText('とじる'))
  expect(screen.queryByText('スーパーレア！')).toBeNull()
})

it('コインが足りないときや仲間がいっぱいのときは引けない', () => {
  const { unmount } = render(<Gacha coins={GACHA_PRICE - 1} members={1} onDraw={() => null} />)
  expect(screen.getByRole('button', { name: /ガチャを引く/ })).toBeDisabled()
  unmount()
  render(<Gacha coins={999} members={PARTY_MAX} onDraw={() => null} />)
  expect(screen.getByRole('button', { name: '仲間がいっぱい' })).toBeDisabled()
})
