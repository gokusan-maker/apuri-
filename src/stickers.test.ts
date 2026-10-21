import { expect, it } from 'vitest'
import { addSticker, loadStickers, saveStickers, stickerOf, STICKERS } from './stickers'

it('シールは12種で、全部そろうと1回だけごほうび', () => {
  expect(stickerOf(0)).toBe(STICKERS[0])
  expect(stickerOf(0.999)).toBe(STICKERS[11])
  let b = { got: [] as string[], rewarded: false }
  let done = 0
  for (const s of [...STICKERS, ...STICKERS]) {
    const r = addSticker(b, s)
    b = r.book
    if (r.complete) done++
  }
  expect(b.got).toHaveLength(12)
  expect(done).toBe(1)
  localStorage.clear()
  saveStickers({ got: ['🍎', '🍎', 'x'], rewarded: false })
  expect(loadStickers()).toEqual({ got: ['🍎'], rewarded: false })
})
