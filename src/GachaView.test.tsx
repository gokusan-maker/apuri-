import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Gacha } from './GachaView'
import { GACHA_PRICE, PARTY_MAX } from './gacha'
import { kindOf, speciesOf } from './monster'

it('ガチャを引くとレア度と出たタマゴが表示される', () => {
  const onDraw = vi.fn(() => ({ kind: kindOf('kin'), species: speciesOf('mochi') }))
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(onDraw).toHaveBeenCalled()
  expect(screen.getByText('スーパーレア！')).toBeInTheDocument()
  expect(screen.getByText('きんいろのふしぎなタマゴが仲間になった！')).toBeInTheDocument()
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

it('チケットがあるときはチケットで引ける', () => {
  const onDraw = vi.fn(() => ({ kind: kindOf('umi'), species: speciesOf('dragon') }))
  render(<Gacha coins={0} members={1} tickets={2} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: '🎟 チケットで引く（あと2枚）' }))
  expect(onDraw).toHaveBeenCalledWith(true)
  expect(screen.getByText('レア！')).toBeInTheDocument()
  expect(screen.getByText('うみ色のほのおのタマゴが仲間になった！')).toBeInTheDocument()
  expect(screen.getByText(/「ドラコ」の仲間だ！/)).toBeInTheDocument()
})

it('出る確率が見られる（合計100%）', () => {
  render(<Gacha coins={0} members={1} onDraw={() => null} />)
  expect(screen.getByText('出る確率')).toBeInTheDocument()
  const pct = [...document.querySelectorAll('.gacha-odds li')].map((li) => {
    const n = Number(li.textContent!.match(/(\d+)%/)![1])
    return li.textContent!.includes('キャラクター') ? 0 : li.textContent!.includes('各') ? n * 3 : n
  })
  expect(pct.reduce((a, b) => a + b, 0)).toBe(100)
})

it('週末はドラコ出現アップのお知らせが出る', () => {
  render(<Gacha coins={0} members={1} dragonUp onDraw={() => null} />)
  expect(screen.getByText(/週末はドラコが出やすい/)).toBeInTheDocument()
})
