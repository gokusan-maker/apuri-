import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Shop } from './ShopView'
import { SNACKS } from './shop'

it('おやつをあげると相棒がもぐもぐ食べる', () => {
  const onEat = vi.fn()
  render(<Shop wallet={{ coins: 100, owned: [] }} monster={{ xp: 200 }} onBuy={() => {}} onWear={() => {}} onClose={() => {}} snacksLeft={3} onEat={onEat} />)
  expect(screen.queryByLabelText('もぐもぐ')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: new RegExp(SNACKS[0].name) }))
  expect(onEat).toHaveBeenCalledWith(SNACKS[0].id)
  expect(screen.getByLabelText('もぐもぐ').textContent).toBe(SNACKS[0].icon)
  expect(document.querySelector('.face-eat .chew')).not.toBeNull()
})

it('ショップの見本は今の部屋の中に相棒が立つ', () => {
  render(<Shop wallet={{ coins: 100, owned: ['ocean'], room: 'ocean' }} monster={{ xp: 200 }} onBuy={() => {}} onWear={() => {}} onClose={() => {}} snacksLeft={3} onEat={() => {}} />)
  expect(document.querySelector('.shop-stage.room-ocean .scene-ocean')).not.toBeNull()
})

it('いまの着せかえをコーデに保存して、あとで切りかえられる', () => {
  localStorage.clear()
  const onSetWear = vi.fn()
  render(<Shop wallet={{ coins: 100, owned: ['ribbon'] }} monster={{ xp: 200, wear: 'ribbon' }} onBuy={() => {}} onWear={() => {}} onSetWear={onSetWear} onClose={() => {}} snacksLeft={3} onEat={() => {}} />)
  fireEvent.click(screen.getByRole('tab', { name: /きせかえ/ }))
  expect(screen.getByText('👗 コーデ1（空き）')).toBeDisabled()
  fireEvent.click(screen.getByLabelText('いまの着せかえをコーデ1に保存'))
  fireEvent.click(screen.getByText('👗 コーデ1'))
  expect(onSetWear).toHaveBeenCalledWith('ribbon')
  expect(JSON.parse(localStorage.getItem('eitan:outfits')!)[0]).toBe('ribbon')
})

it('ショップは「ガチャ」「おやつ」「きせかえ」「アイテム」のタブで切りかわる', () => {
  render(<Shop wallet={{ coins: 100, owned: [] }} monster={{ xp: 200 }} onBuy={() => {}} onWear={() => {}} onClose={() => {}} snacksLeft={3} onEat={() => {}} onGacha={() => null} />)
  expect(screen.getByRole('tab', { name: /ガチャ/ })).toHaveAttribute('aria-selected', 'true')
  expect(screen.queryByText(/おやつ（今日あと/)).toBeNull()
  fireEvent.click(screen.getByRole('tab', { name: /おやつ/ }))
  expect(screen.getByText(/おやつ（今日あと3回）/)).toBeInTheDocument()
  expect(screen.queryByText('着せ替え')).toBeNull()
  fireEvent.click(screen.getByRole('tab', { name: /きせかえ/ }))
  expect(screen.getByText('着せ替え')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('tab', { name: /アイテム/ }))
  expect(screen.getByText(/お休みチケット/)).toBeInTheDocument()
})

it('ショップの部屋のプレビューは、ホームと同じく絵の右はしを見せる四角', () => {
  localStorage.clear()
  const { container } = render(<Shop wallet={{ coins: 100, owned: ['ocean'], room: 'ocean' }} monster={{ xp: 200 }} onBuy={() => {}} onWear={() => {}} onClose={() => {}} snacksLeft={3} onEat={() => {}} />)
  expect(container.querySelector('.shop-stage.room-ocean svg.scene-ocean')?.getAttribute('preserveAspectRatio')).toBe('xMaxYMax slice')
})


it('まだ買っていない部屋を「👀 ためす」でプレビューだけ試せる（もう一度押すと元にもどる）', async () => {
  const { ROOMS } = await import('./shop')
  const target = ROOMS.find((r) => r.id !== 'ocean')!
  const onBuy = vi.fn()
  render(<Shop initialTab="wear" wallet={{ coins: 0, owned: ['ocean'], room: 'ocean' }} monster={{ xp: 200 }} onBuy={onBuy} onWear={() => {}} onClose={() => {}} snacksLeft={3} onEat={() => {}} />)
  const card = screen.getByText(target.name).closest('li')!
  fireEvent.click(within(card).getByRole('button', { name: '👀 ためす' }))
  expect(document.querySelector(`.shop-stage.room-${target.id}`)).not.toBeNull()
  expect(onBuy).not.toHaveBeenCalled()
  fireEvent.click(within(card).getByRole('button', { name: '👀 ためし中' }))
  expect(document.querySelector('.shop-stage.room-ocean')).not.toBeNull()
})

it('部屋をためしているあいだ、名前と「この部屋を買う」ボタンが出る', async () => {
  const { ROOMS } = await import('./shop')
  const target = ROOMS.find((r) => r.id !== 'ocean')!
  const onBuy = vi.fn()
  render(<Shop initialTab="wear" wallet={{ coins: 9999, owned: ['ocean'], room: 'ocean' }} monster={{ xp: 200 }} onBuy={onBuy} onWear={() => {}} onClose={() => {}} snacksLeft={3} onEat={() => {}} />)
  expect(screen.queryByText(/おためし中/)).toBeNull()
  fireEvent.click(within(screen.getByText(target.name).closest('li')!).getByRole('button', { name: '👀 ためす' }))
  const st = screen.getByText(/おためし中/)
  expect(st).toHaveTextContent(target.name)
  fireEvent.click(within(st).getByRole('button', { name: /この部屋を買う/ }))
  expect(onBuy).toHaveBeenCalledWith(target.id)
})

it('属性のタマゴのボタンは題名・値段・短い説明だけ', () => {
  render(<Shop initialTab="gacha" wallet={{ coins: 500, owned: [] }} monster={{ xp: 200 }} onBuy={() => {}} onWear={() => {}} onClose={() => {}} snacksLeft={3} onEat={() => {}} attrEgg={{ price: 120, left: 3, onBuy: () => null }} />)
  const b = screen.getByText('🥚 属性のタマゴ').closest('button')!
  expect(b.textContent).toBe('🥚 属性のタマゴ🪙120文法・読解のなかま')
})
