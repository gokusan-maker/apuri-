import { beforeEach, describe, expect, it } from 'vitest'
import { roomLine, ROOM_LINES, buyAndMove, favSnackOf, buy, buyFreeze, couponsBetween, toggleWear, wearList, eat, ITEMS, loadWallet, ROOMS, saveWallet, shopItems, SNACKS, isEarly, snacksLeft } from './shop'

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
      expect(r.xp).toBe(40) // 2026-10-20 はクッキーがきょうの好物（2倍）
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

it('着せ替えは場所ごとに1つずつ重ねられる', () => {
  let w = toggleWear(undefined, 'hat')
  w = toggleWear(w, 'glasses')
  expect(wearList(w)).toEqual(['hat', 'glasses'])
  w = toggleWear(w, 'crown') // 頭どうしは入れかわる
  expect(wearList(w)).toEqual(['glasses', 'crown'])
  w = toggleWear(w, 'glasses') // はずす
  expect(w).toBe('crown')
  expect(toggleWear('crown', 'crown')).toBeUndefined()
  expect(wearList('ribbon')).toEqual(['ribbon']) // 昔のデータ
})

it('部屋に雪山と森の中がある', () => {
  for (const id of ['snowy', 'forest']) expect(ROOMS.some((r) => r.id === id)).toBe(true)
})

it('名前は物そのままではなく、アレンジした名前', () => {
  const plain = ['リボン', 'マフラー', 'サングラス', 'キャップ', '王冠', 'クッキー', 'プリン', 'ケーキ', '草原', '海', '宇宙']
  for (const i of [...ITEMS, ...ROOMS, ...SNACKS]) expect(plain, i.id).not.toContain(i.name)
})

it('きょうの好物は日替わりで、あげると XP 2倍', () => {
  const days = ['2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25']
  expect(new Set(days.map((d) => favSnackOf(d).id)).size).toBeGreaterThan(1)
  const d = '2026-10-21'
  const fav = favSnackOf(d)
  const other = SNACKS.find((s) => s.id !== fav.id)!
  const w = { coins: 100, owned: [] }
  expect(eat(w, { day: '', count: 0 }, fav.id, d)!.xp).toBe(fav.xp * 2)
  expect(eat(w, { day: '', count: 0 }, other.id, d)!.xp).toBe(other.xp)
})

describe('部屋を買ったらすぐお引っこし', () => {
  it('部屋を買うとその部屋になり、着せ替えを買っても部屋はかわらない', () => {
    const room = ROOMS[0]
    const r = buyAndMove({ coins: 9999, owned: [] }, room.id)!
    expect(r.wallet.room).toBe(room.id)
    expect(r.wallet.owned).toContain(room.id)
    expect(r.moved?.id).toBe(room.id)
    const w = buyAndMove({ coins: 9999, owned: [], room: room.id }, ITEMS[0].id)!
    expect(w.wallet.room).toBe(room.id)
    expect(w.moved).toBeNull()
    expect(buyAndMove({ coins: 0, owned: [] }, room.id)).toBeNull()
  })
})

describe('部屋をかえたときの相棒のひとこと', () => {
  it('部屋ごとに決まったひとことで、部屋なしにもどすと別のひとこと', () => {
    expect(roomLine(ROOMS[0].id)).toEqual(ROOM_LINES[0])
    expect(roomLine(ROOMS[1].id)).toEqual(ROOM_LINES[1])
    expect(roomLine(ROOMS[0].id)).toEqual(roomLine(ROOMS[0].id))
    expect(roomLine(undefined).ja).toMatch(/もとの部屋/)
  })
})

it('コインは正解10回で🪙1（1ゲームで1まいくらい）', async () => {
  const { coinStep, CORRECT_PER_COIN } = await import('./shop')
  expect(CORRECT_PER_COIN).toBe(10)
  expect(coinStep(0)).toEqual({ prog: 1, coins: 0 })
  expect(coinStep(9)).toEqual({ prog: 0, coins: 1 })
})
