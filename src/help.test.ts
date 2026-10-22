import { describe, expect, it } from 'vitest'
import { HELP } from './help'

describe('HELP', () => {
  it('主な画面の説明がそろっている', () => {
    for (const t of ['カード', 'ステージ', 'ミニゲーム', 'タイム', '記録', '2人対戦', 'おすすめ', 'かんたん', 'はじめて']) expect(HELP.some((h) => h.title.includes(t))).toBe(true)
    expect(HELP.every((h) => h.text.length > 0)).toBe(true)
  })
})
