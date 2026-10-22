import { fireEvent, render, screen } from '@testing-library/react'
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
