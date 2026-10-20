import { beforeEach, describe, expect, it } from 'vitest'
import { buy, buyFreeze, couponsBetween, eat, ITEMS, loadWallet, ROOMS, saveWallet, shopItems, SNACKS, isEarly, snacksLeft } from './shop'

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
    expect(loadWallet()).toEqual({ coins: 5, owned: ['hat'], freezes: 0 })
    localStorage.setItem('eitan:wallet', '{"coins":-1,"owned":["sword","ribbon"]}')
    expect(loadWallet()).toEqual({ coins: 0, owned: ['ribbon'], freezes: 0 })
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

it('お休みチケットは🪙50で、2枚まで', () => {
  let w = buyFreeze({ coins: 200, owned: [] })!
  expect(w).toEqual({ coins: 150, owned: [], freezes: 1 })
  w = buyFreeze(w)!
  expect(buyFreeze(w)).toBeNull()
  expect(buyFreeze({ coins: 10, owned: [] })).toBeNull()
})

it('部屋の背景も買えて、えらんだ部屋は保存される', () => {
  const w = buy({ coins: 100, owned: [] }, 'ocean')!
  expect(w.owned).toEqual(['ocean'])
  saveWallet({ ...w, room: 'ocean' })
  expect(loadWallet().room).toBe('ocean')
  localStorage.setItem('eitan:wallet', '{"coins":1,"owned":[],"room":"castle"}')
  expect(loadWallet().room).toBeUndefined()
})

describe('早起き', () => {
  it('5〜10時が早起き', () => {
    expect([4, 5, 9, 10].map(isEarly)).toEqual([false, true, true, false])
  })
})

describe('着せ替えの追加', () => {
  it('王冠・ねこみみ・蝶ネクタイが買える', () => {
    for (const id of ['crown', 'catears', 'bowtie']) expect(ITEMS.some((i) => i.id === id)).toBe(true)
    expect(buy({ coins: 300, owned: [] }, 'crown')).toEqual({ coins: 0, owned: ['crown'] })
  })
})

it('買い物をしても、おやすみチケットや部屋はそのまま', () => {
  expect(buy({ coins: 200, owned: ['space'], freezes: 2, room: 'space' }, 'ribbon')).toEqual({ coins: 170, owned: ['space', 'ribbon'], freezes: 2, room: 'space' })
})

it('部屋に「夜の町」「さくら」がある', () => {
  for (const id of ['night', 'sakura']) expect(ROOMS.some((r) => r.id === id)).toBe(true)
  expect(new Set(ROOMS.map((r) => r.id)).size).toBe(ROOMS.length)
})

it('おやつにプリンがあり、値段が高いほどXPも多い', () => {
  expect(SNACKS.find((s) => s.id === 'pudding')).toMatchObject({ price: 18, xp: 40 })
  const byPrice = [...SNACKS].sort((a, b) => a.price - b.price)
  expect(byPrice.map((s) => s.xp)).toEqual([...byPrice.map((s) => s.xp)].sort((a, b) => a - b))
})

it('限定の着せ替えはイベント中か持っているときだけ並ぶ', () => {
  expect(shopItems(undefined, []).some((i) => i.id === 'witchhat')).toBe(false)
  expect(shopItems('halloween', []).some((i) => i.id === 'witchhat')).toBe(true)
  expect(shopItems('halloween', []).some((i) => i.id === 'santahat')).toBe(false)
  expect(shopItems(undefined, ['santahat']).some((i) => i.id === 'santahat')).toBe(true)
  expect(buy({ coins: 100, owned: [] }, 'witchhat')).toMatchObject({ coins: 20, owned: ['witchhat'] })
})

it('割引券：レベル10・20・30でもらえ、次の着せ替えが半額', () => {
  expect(couponsBetween(9, 10)).toBe(1)
  expect(couponsBetween(10, 25)).toBe(1)
  expect(couponsBetween(5, 31)).toBe(3)
  expect(couponsBetween(10, 11)).toBe(0)
  expect(buy({ coins: 60, owned: [], coupons: 1 }, 'hat')).toEqual({ coins: 0, owned: ['hat'], coupons: 0 })
  expect(buy({ coins: 59, owned: [], coupons: 1 }, 'hat')).toBeNull()
})

it('部屋（図書室・お城）とおやつ（おにぎり）がある', () => {
  for (const id of ['bookroom', 'royal']) expect(ROOMS.some((r) => r.id === id)).toBe(true)
  expect(SNACKS.some((s) => s.id === 'onigiri')).toBe(true)
})
