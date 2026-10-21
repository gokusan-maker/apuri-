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
