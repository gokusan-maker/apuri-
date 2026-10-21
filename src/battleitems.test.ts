import { beforeEach, expect, it } from 'vitest'
import { addItem, BAG_MAX, loadBag, saveBag, spendItem } from './battleitems'

beforeEach(() => localStorage.clear())

it('バトルアイテムは9個まで持てて、使うと減る', () => {
  let b = loadBag()
  expect(b).toEqual({ bomb: 0, charm: 0 })
  b = addItem(b, 'bomb')
  for (let i = 0; i < 20; i++) b = addItem(b, 'charm')
  expect(b).toEqual({ bomb: 1, charm: BAG_MAX })
  saveBag(spendItem(b, 'bomb'))
  expect(loadBag()).toEqual({ bomb: 0, charm: BAG_MAX })
  expect(spendItem({ bomb: 0, charm: 0 }, 'bomb').bomb).toBe(0)
})
