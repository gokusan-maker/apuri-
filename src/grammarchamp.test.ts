import { describe, expect, it } from 'vitest'
import { champOf, countChamp, loadGrammarChamp, saveGrammarChamp } from './grammarchamp'
import { GRAMMAR } from './grammar'

describe('今月のチャンピオン単元', () => {
  it('いちばん正解した単元がチャンピオン。月がかわるとリセット', () => {
    const [a, b] = GRAMMAR
    let c = countChamp({ month: '', counts: {} }, a.id, '2026-10')
    c = countChamp(c, b.id, '2026-10')
    c = countChamp(c, b.id, '2026-10')
    expect(champOf(c, '2026-10')).toEqual({ unit: b, count: 2 })
    expect(champOf(c, '2026-11')).toBeNull()
    c = countChamp(c, a.id, '2026-11')
    expect(c.counts).toEqual({ [a.id]: 1 })
  })
  it('保存して読みこめる。こわれたデータは空', () => {
    localStorage.clear()
    saveGrammarChamp({ month: '2026-10', counts: { x: 3 } })
    expect(loadGrammarChamp()).toEqual({ month: '2026-10', counts: { x: 3 } })
    localStorage.setItem('eitan:grammar-champ', '{bad')
    expect(loadGrammarChamp()).toEqual({ month: '', counts: {} })
  })
})
