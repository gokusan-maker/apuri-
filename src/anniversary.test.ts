import { describe, expect, it } from 'vitest'
import { dueAnniversary } from './anniversary'

describe('記念日', () => {
  it('7日・30日…でお祝い、済んだものは出ない', () => {
    expect(dueAnniversary('2026-10-13', '2026-10-19', [], 'm0')).toBeNull()
    expect(dueAnniversary('2026-10-13', '2026-10-20', [], 'm0')).toBe(7)
    expect(dueAnniversary('2026-10-13', '2026-10-20', ['m0:7'], 'm0')).toBeNull()
    expect(dueAnniversary('2026-01-01', '2026-10-20', [], 'm0')).toBe(100)
    expect(dueAnniversary(undefined, '2026-10-20', [], 'm0')).toBeNull()
  })
})
