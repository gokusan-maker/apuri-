import { describe, expect, it } from 'vitest'
import { souvenirFor, SOUVENIRS } from './souvenir'

describe('おみやげ', () => {
  it('日付で決まり、いろいろ出る', () => {
    expect(souvenirFor('2026-10-20')).toBe(souvenirFor('2026-10-20'))
    const got = new Set(Array.from({ length: 60 }, (_, i) => souvenirFor(`2026-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`).id))
    expect(got.size).toBeGreaterThan(5)
    expect(new Set(SOUVENIRS.map((s) => s.id)).size).toBe(SOUVENIRS.length)
  })
})
