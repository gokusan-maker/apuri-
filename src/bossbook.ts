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

// デザイン154：いちばん最近たおしたボスの名前（図鑑に 🆕 さいきん を出す）
const LAST_KEY = 'eitan:boss-last'
export function loadLastBoss(): string {
  try {
    return localStorage.getItem(LAST_KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveLastBoss(name: string): void {
  try {
    localStorage.setItem(LAST_KEY, name)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
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

// リベンジ：負けたボスの名前を覚えておき、次に勝つと🪙5
export const REVENGE_COINS = 5
const LOST_KEY = 'eitan:boss-lost'
export function loadLost(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(LOST_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
function saveLost(list: string[]): void {
  try {
    localStorage.setItem(LOST_KEY, JSON.stringify(list.slice(-50)))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export function markLost(name: string): void {
  const l = loadLost()
  if (!l.includes(name)) saveLost([...l, name])
}
// 勝ったとき：リベンジだったら true（記録から消す）
export function takeRevenge(name: string): boolean {
  const l = loadLost()
  if (!l.includes(name)) return false
  saveLost(l.filter((x) => x !== name))
  return true
}

// ボスのひみつ：同じボスを3回たおすと読める（名前で1つに決まる）
export const SECRET_WINS = 3
const SECRETS = [
  'じつは、夜ねる前に英語の歌を聞くのが好き。',
  'いつもこわい顔をしているけれど、子ねこを見るとにっこりしてしまう。',
  '小さいころは英単語が苦手で、毎日10語ずつ覚えて強くなった。',
  'たおされたあとは、こっそり単語帳を読んで次の戦いの準備をしている。',
  'すきな食べ物はプリン。でも、ほかのボスにはないしょ。',
  '本当はきみと友だちになりたくて、何度も戦いにくる。',
  '口ぐせの英語は、むかし旅で出会った人から教わった。',
  'ひみつの特技は、さかだちしながら英語の早口ことばを言うこと。',
]
export function secretOf(name: string): string {
  const k = [...name].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 0)
  return SECRETS[k % SECRETS.length]
}

// デザイン130：勝った回数の区切り（10・30・50回、そのあとは100回ごと）
export const isWinMilestone = (n: number): boolean => n === 10 || n === 30 || n === 50 || (n >= 100 && n % 100 === 0)
