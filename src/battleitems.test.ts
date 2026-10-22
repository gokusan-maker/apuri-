import { beforeEach, expect, it } from 'vitest'
import { addItem, BAG_MAX, loadBag, saveBag, spendItem } from './battleitems'

beforeEach(() => localStorage.clear())

it('バトルアイテムは9個まで持てて、使うと減る', () => {
  let b = loadBag()
  expect(b).toEqual({ bomb: 0, charm: 0, clock: 0, lucky: 0 })
  b = addItem(b, 'bomb')
  for (let i = 0; i < 20; i++) b = addItem(b, 'charm')
  expect(b).toEqual({ bomb: 1, charm: BAG_MAX, clock: 0, lucky: 0 })
  saveBag(spendItem(b, 'bomb'))
  expect(loadBag()).toEqual({ bomb: 0, charm: BAG_MAX, clock: 0, lucky: 0 })
  expect(spendItem({ bomb: 0, charm: 0, clock: 0, lucky: 0 }, 'bomb').bomb).toBe(0)
})

it('ボスのドロップは3回に1回くらい', async () => {
  const { dropOf, DROP_RATE } = await import('./battleitems')
  expect(dropOf(0)).toBe('bomb')
  expect(dropOf(DROP_RATE * 0.75)).toBe('charm')
  expect(dropOf(DROP_RATE)).toBeNull()
  expect(dropOf(0.99)).toBeNull()
})
