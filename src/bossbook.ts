// ボス図鑑：倒したボスごとに、倒した回数と最高ランクを記録する
import type { BossLook, Rank } from './boss'

export type BookEntry = { wins: number; best: Rank; look: BossLook; first: string }
export type BossBook = Record<string, BookEntry> // ボスの名前 → 記録

const KEY = 'eitan:boss-book'
const ORDER: Rank[] = ['B', 'A', 'S']

export const betterRank = (a: Rank, b: Rank): Rank => (ORDER.indexOf(a) >= ORDER.indexOf(b) ? a : b)

export function recordWin(book: BossBook, look: BossLook, rank: Rank, day: string): BossBook {
  const old = book[look.name]
  return { ...book, [look.name]: old ? { ...old, wins: old.wins + 1, best: betterRank(old.best, rank) } : { wins: 1, best: rank, look, first: day } }
}

export function loadBook(): BossBook {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(
      Object.entries(v as BossBook).filter(([, e]) => e && typeof e.wins === 'number' && ORDER.includes(e.best) && e.look && typeof e.look.name === 'string'),
    )
  } catch {
    return {}
  }
}

export function saveBook(b: BossBook): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(b))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 相棒の二つ名：ボスをたおした回数（ボス図鑑の合計）で変わる
export const EPITHETS: { wins: number; name: string }[] = [
  { wins: 1, name: 'かけだし勇者' },
  { wins: 10, name: 'ボスハンター' },
  { wins: 30, name: '伝説の勇者' },
]
export const totalWins = (book: BossBook) => Object.values(book).reduce((a, e) => a + e.wins, 0)
export function epithetOf(wins: number): string | null {
  return [...EPITHETS].reverse().find((e) => wins >= e.wins)?.name ?? null
}

// ステージと大学入試の塔のボス（図鑑の基本の顔ぶれ）のうち、たおした数
export function baseBeaten(book: BossBook, baseNames: string[]): number {
  return baseNames.filter((n) => book[n]).length
}
