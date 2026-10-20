// コインと着せ替え。正解するとコイン、ショップで飾りを買って相棒に着せる。
export type Item = { id: string; name: string; price: number; icon: string }

export const ITEMS: Item[] = [
  { id: 'ribbon', name: 'リボン', price: 30, icon: '🎀' },
  { id: 'glasses', name: 'まるメガネ', price: 60, icon: '👓' },
  { id: 'scarf', name: 'マフラー', price: 90, icon: '🧣' },
  { id: 'hat', name: 'シルクハット', price: 120, icon: '🎩' },
  { id: 'flower', name: '花かんむり', price: 150, icon: '🌼' },
  { id: 'headphones', name: 'ヘッドホン', price: 200, icon: '🎧' },
]

export const COIN_PER_CORRECT = 1

export type Wallet = { coins: number; owned: string[] }

export function buy(w: Wallet, id: string): Wallet | null {
  const item = ITEMS.find((i) => i.id === id)
  if (!item || w.owned.includes(id) || w.coins < item.price) return null
  return { coins: w.coins - item.price, owned: [...w.owned, id] }
}

const STORAGE_KEY = 'eitan:wallet'

export function loadWallet(): Wallet {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as Partial<Wallet>) : null
    return {
      coins: typeof v?.coins === 'number' && v.coins >= 0 ? v.coins : 0,
      owned: Array.isArray(v?.owned) ? v.owned.filter((x) => ITEMS.some((i) => i.id === x)) : [],
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
