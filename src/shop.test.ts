import { beforeEach, describe, expect, it } from 'vitest'
import { buy, ITEMS, loadWallet, saveWallet } from './shop'

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
