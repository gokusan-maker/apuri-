import { expect, it } from 'vitest'
import { OMIKUJI, omikujiDiscount, omikujiOf } from './omikuji'

it('おみくじは日付で決まり、大吉の日だけガチャが安くなる', () => {
  expect(omikujiOf('2026-10-20')).toBe(omikujiOf('2026-10-20'))
  const seen = new Set<string>()
  for (let d = 1; d <= 28; d++) {
    const day = `2026-02-${String(d).padStart(2, '0')}`
    const o = omikujiOf(day)
    seen.add(o.id)
    expect(omikujiDiscount(day)).toBe(o.id === 'daikichi' ? 5 : 0)
  }
  expect(seen.size).toBe(OMIKUJI.length) // 1か月でいろいろ出る
})
