import { beforeEach, describe, expect, it } from 'vitest'
import { buy, eat, ITEMS, loadWallet, saveWallet, snacksLeft } from './shop'

describe('ショップ', () => {
  beforeEach(() => localStorage.clear())

  it('コインが足りれば買えて、二度は買えない', () => {
    const w = buy({ coins: 40, owned: [] }, 'ribbon')
    expect(w).toEqual({ coins: 10, owned: ['ribbon'] })
    expect(buy(w!, 'ribbon')).toBeNull()
    expect(buy(w!, 'hat')).toBeNull()
    expect(buy(w!, 'nothing')).toBeNull()
  })

  it('アイテムは安い順で、idが重複しない', () => {
    expect(new Set(ITEMS.map((i) => i.id)).size).toBe(ITEMS.length)
    expect(ITEMS.map((i) => i.price)).toEqual([...ITEMS.map((i) => i.price)].sort((a, b) => a - b))
  })

  it('保存と読み込み。知らないアイテムは捨てる', () => {
    saveWallet({ coins: 5, owned: ['hat'] })
    expect(loadWallet()).toEqual({ coins: 5, owned: ['hat'] })
    localStorage.setItem('eitan:wallet', '{"coins":-1,"owned":["sword","ribbon"]}')
    expect(loadWallet()).toEqual({ coins: 0, owned: ['ribbon'] })
  })
})

describe('おやつ', () => {
  it('コインで買ってXP、1日3回まで、日が変わると戻る', () => {
    let w = { coins: 100, owned: [] as string[] }
    let log = { day: '', count: 0 }
    for (let i = 0; i < 3; i++) {
      const r = eat(w, log, 'cookie', '2026-10-20')!
      expect(r.xp).toBe(20)
      w = r.wallet
      log = r.log
    }
    expect(w.coins).toBe(70)
    expect(snacksLeft(log, '2026-10-20')).toBe(0)
    expect(eat(w, log, 'cookie', '2026-10-20')).toBeNull()
    expect(snacksLeft(log, '2026-10-21')).toBe(3)
    expect(eat({ coins: 5, owned: [] }, log, 'cookie', '2026-10-21')).toBeNull()
  })
})
