import { describe, expect, it } from 'vitest'
import { recentChanges } from './changelog'

describe('recentChanges', () => {
  const md = '# 変更履歴\n\n- 2026-10-01: はじめ\n- 2026-10-02: つぎ\nメモ\n- 2026-10-03: さいご\n'
  it('新しい順に取り出す', () => {
    expect(recentChanges(md).map((c) => c.text)).toEqual(['さいご', 'つぎ', 'はじめ'])
    expect(recentChanges(md)[0].date).toBe('2026-10-03')
  })
  it('件数をしぼれる', () => {
    expect(recentChanges(md, 2)).toHaveLength(2)
  })
})
