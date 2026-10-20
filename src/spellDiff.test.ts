import { describe, expect, it } from 'vitest'
import { markSpelling } from './spellDiff'

const show = (r: { ch: string; ok: boolean }[]) => r.map((x) => (x.ok ? x.ch : `[${x.ch}]`)).join('')

describe('markSpelling', () => {
  it('ちがう文字に印', () => {
    expect(show(markSpelling('libary', 'library'))).toBe('libary')
    // 入れかわりは、どちらか1文字に印がつく
    expect(markSpelling('freind', 'friend').filter((x) => !x.ok)).toHaveLength(1)
    expect(markSpelling('appel', 'apple').filter((x) => !x.ok)).toHaveLength(1)
    expect(show(markSpelling('Apple', 'apple'))).toBe('Apple')
    expect(show(markSpelling('xyz', 'cat'))).toBe('[x][y][z]')
  })
})
