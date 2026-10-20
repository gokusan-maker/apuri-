// コインと着せ替え。正解するとコイン、ショップで飾りを買って相棒に着せる。
export type Item = { id: string; name: string; price: number; icon: string }

export const ITEMS: Item[] = [
  { id: 'ribbon', name: 'リボン', price: 30, icon: '🎀' },
  { id: 'glasses', name: 'まるメガネ', price: 60, icon: '👓' },
  { id: 'scarf', name: 'マフラー', price: 90, icon: '🧣' },
  { id: 'bowtie', name: '蝶ネクタイ', price: 100, icon: '🦋' },
  { id: 'hat', name: 'シルクハット', price: 120, icon: '🎩' },
  { id: 'flower', name: '花かんむり', price: 150, icon: '🌼' },
  { id: 'catears', name: 'ねこみみ', price: 180, icon: '🐱' },
  { id: 'headphones', name: 'ヘッドホン', price: 200, icon: '🎧' },
  { id: 'crown', name: '王冠', price: 300, icon: '👑' },
]

// イベント期間だけ並ぶ限定の着せ替え（買ったものはずっと使える）
export const EVENT_ITEMS: (Item & { event: string })[] = [
  { id: 'witchhat', name: '魔女のぼうし', price: 80, icon: '🧙', event: 'halloween' },
  { id: 'santahat', name: 'サンタのぼうし', price: 80, icon: '🎅', event: 'christmas' },
]

// ショップに並べる着せ替え：いつもの品＋今のイベントの品＋持っている限定品
export function shopItems(eventId: string | undefined, owned: string[]): Item[] {
  return [...ITEMS, ...EVENT_ITEMS.filter((i) => i.event === eventId || owned.includes(i.id))]
}

export const COIN_PER_CORRECT = 1
export const LOGIN_COINS = 5 // その日はじめての学習
export const EARLY_COINS = 3 // 朝5〜10時にその日はじめての学習（早起きボーナス）
export const isEarly = (hour: number) => hour >= 5 && hour < 10
export const isEarlyNow = () => isEarly(new Date().getHours())
export const LOGIN_WEEK_COINS = 20 // 7日連続ごと

export type Wallet = { coins: number; owned: string[]; freezes?: number; room?: string; coupons?: number }

// 相棒のレベルがこの数になったら割引券（次の着せ替え・部屋が半額）
export const COUPON_LEVELS = [10, 20, 30]
export const couponsBetween = (from: number, to: number) => COUPON_LEVELS.filter((l) => l > from && l <= to).length
export const priceWith = (w: Wallet, price: number) => ((w.coupons ?? 0) > 0 ? Math.ceil(price / 2) : price)

// 相棒の部屋の背景
export const ROOMS: Item[] = [
  { id: 'meadow', name: '草原', price: 80, icon: '🌿' },
  { id: 'ocean', name: '海', price: 80, icon: '🌊' },
  { id: 'space', name: '宇宙', price: 120, icon: '🌌' },
  { id: 'school', name: '教室', price: 80, icon: '🏫' },
  { id: 'night', name: '夜の町', price: 120, icon: '🌃' },
  { id: 'sakura', name: 'さくら', price: 100, icon: '🌸' },
  { id: 'bookroom', name: '図書室', price: 100, icon: '📚' },
  { id: 'royal', name: 'お城', price: 150, icon: '🏰' },
]

export const FREEZE_PRICE = 50
export const FREEZE_MAX = 2

export function buyFreeze(w: Wallet): Wallet | null {
  const n = w.freezes ?? 0
  if (n >= FREEZE_MAX || w.coins < FREEZE_PRICE) return null
  return { ...w, coins: w.coins - FREEZE_PRICE, freezes: n + 1 }
}

export function buy(w: Wallet, id: string): Wallet | null {
  const item = [...ITEMS, ...EVENT_ITEMS, ...ROOMS].find((i) => i.id === id)
  if (!item || w.owned.includes(id)) return null
  const price = priceWith(w, item.price)
  if (w.coins < price) return null
  const coupons = price < item.price ? (w.coupons ?? 0) - 1 : w.coupons
  return { ...w, coins: w.coins - price, owned: [...w.owned, id], ...(coupons !== undefined ? { coupons } : {}) }
}

const STORAGE_KEY = 'eitan:wallet'

export function loadWallet(): Wallet {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as Partial<Wallet>) : null
    return {
      coins: typeof v?.coins === 'number' && v.coins >= 0 ? v.coins : 0,
      owned: Array.isArray(v?.owned) ? v.owned.filter((x) => [...ITEMS, ...EVENT_ITEMS, ...ROOMS].some((i) => i.id === x)) : [],
      ...(typeof v?.room === 'string' && ROOMS.some((r) => r.id === v.room) ? { room: v.room } : {}),
      freezes: typeof v?.freezes === 'number' && v.freezes > 0 ? Math.min(v.freezes, FREEZE_MAX) : 0,
      ...(typeof v?.coupons === 'number' && v.coupons > 0 ? { coupons: Math.min(Math.floor(v.coupons), 9) } : {}),
    }
  } catch {
    return { coins: 0, owned: [] }
  }
}

export function saveWallet(w: Wallet): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(w))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// おやつ：コインで買ってその場であげるとXP。1日3回まで
export type Snack = { id: string; name: string; price: number; xp: number; icon: string }

export const SNACKS: Snack[] = [
  { id: 'cookie', name: 'クッキー', price: 10, xp: 20, icon: '🍪' },
  { id: 'onigiri', name: 'おにぎり', price: 14, xp: 30, icon: '🍙' },
  { id: 'pudding', name: 'プリン', price: 18, xp: 40, icon: '🍮' },
  { id: 'cake', name: 'ケーキ', price: 25, xp: 60, icon: '🍰' },
]

export const SNACKS_PER_DAY = 3

export type SnackLog = { day: string; count: number }

export function snacksLeft(log: SnackLog, today: string): number {
  return SNACKS_PER_DAY - (log.day === today ? log.count : 0)
}

// 買えるなら新しい財布と記録を返す
export function eat(w: Wallet, log: SnackLog, id: string, today: string): { wallet: Wallet; log: SnackLog; xp: number } | null {
  const s = SNACKS.find((x) => x.id === id)
  if (!s || w.coins < s.price || snacksLeft(log, today) <= 0) return null
  return {
    wallet: { ...w, coins: w.coins - s.price },
    log: { day: today, count: (log.day === today ? log.count : 0) + 1 },
    xp: s.xp,
  }
}

const SNACK_KEY = 'eitan:snacks'

export function loadSnacks(): SnackLog {
  try {
    const raw = localStorage.getItem(SNACK_KEY)
    const v = raw ? (JSON.parse(raw) as Partial<SnackLog>) : null
    return typeof v?.day === 'string' && typeof v.count === 'number' ? { day: v.day, count: v.count } : { day: '', count: 0 }
  } catch {
    return { day: '', count: 0 }
  }
}

export function saveSnacks(l: SnackLog): void {
  try {
    localStorage.setItem(SNACK_KEY, JSON.stringify(l))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 着せ替えの場所（頭・顔・首）。同じ場所には1つだけ
const SLOT: Record<string, 'head' | 'face' | 'neck'> = { glasses: 'face', scarf: 'neck', bowtie: 'neck' }
export const slotOf = (id: string) => SLOT[id] ?? 'head'

// つけている着せ替え（「hat,glasses」のようにカンマ区切り。昔の1つだけのデータもそのまま読める）
export const wearList = (wear: string | undefined) => (wear ?? '').split(',').filter(Boolean)

// つける／はずす：同じ場所のものは入れかわる
export function toggleWear(wear: string | undefined, id: string): string | undefined {
  const list = wearList(wear)
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list.filter((x) => slotOf(x) !== slotOf(id)), id]
  return next.length ? next.join(',') : undefined
}
