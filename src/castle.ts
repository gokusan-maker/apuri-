import { createContext, type ReactNode } from 'react'
// 城の塔：いま挑む階と、見せる階（クリアした2階・いまの階・カギつきの次の1階。上の階ほど上に）
export const castleNow = (floors: { cleared: boolean }[]) => {
  const i = floors.findIndex((f) => !f.cleared)
  return i < 0 ? floors.length : i
}

export function castleShown(total: number, now: number): number[] {
  return Array.from({ length: total }, (_, i) => i)
    .filter((i) => i >= now - 2 && i <= now + 1)
    .reverse()
}

// 10階ごとに宝箱（クリアしたらあけられる。1つの城で1回ずつ）
export const CHEST_EVERY = 10
export const CHEST_COINS = 20
const CHEST_KEY = 'eitan:castle-chests'
export function loadChests(): Record<string, number[]> {
  try {
    const v = JSON.parse(localStorage.getItem(CHEST_KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, a]) => [k, Array.isArray(a) ? a.filter((x): x is number => typeof x === 'number') : []]))
  } catch {
    return {}
  }
}
export function saveChests(c: Record<string, number[]>): void {
  try {
    localStorage.setItem(CHEST_KEY, JSON.stringify(c))
  } catch {
    /* 保存できなくても動く */
  }
}
// 節目の階：10階ごとと、てっぺんの階（宝箱にレアの卵）
export const isMilestone = (floor: number, total: number) => floor % CHEST_EVERY === 0 || floor === total
// あけられる宝箱の階（1から数えた階の番号）
export function openableChests(cleared: number, opened: number[], total = 0): number[] {
  const out = Array.from({ length: Math.floor(cleared / CHEST_EVERY) }, (_, i) => (i + 1) * CHEST_EVERY)
  if (total > 0 && cleared >= total && total % CHEST_EVERY !== 0) out.push(total)
  return out.filter((n) => !opened.includes(n))
}

// 宝箱のレアの卵：App がわたす（なかまに入れて、入れた卵の名前を返す。いっぱいなら null）
export const RareEggContext = createContext<(() => string | null) | null>(null)

// 地図（単語＝海・文法＝森・読解＝山）を歩くキャラ：App がわたす
export type MapTheme = 'sea' | 'forest' | 'mountain'
export const WalkerContext = createContext<Partial<Record<MapTheme, ReactNode>>>({})

// 地図に出すステージ：クリアした1つ・いまのステージ・この先の2つ（下から上へ進む）
export function mapShown(total: number, now: number): number[] {
  const from = Math.max(0, Math.min(now - 1, total - 4))
  return Array.from({ length: total }, (_, i) => i).filter((i) => i >= from && i <= from + 3)
}
export const mapX = (i: number) => [24, 50, 76, 50][i % 4] // ジグザグの道

// キャラが前にいたステージ（地図ごと）：次に開いたとき、そこから歩いてくる
const WALK_KEY = 'eitan:map-walk'
export function loadWalk(name: string): number | null {
  try {
    const v = JSON.parse(localStorage.getItem(WALK_KEY) ?? '{}') as Record<string, unknown>
    return typeof v[name] === 'number' ? (v[name] as number) : null
  } catch {
    return null
  }
}
export function saveWalk(name: string, i: number): void {
  try {
    const v = JSON.parse(localStorage.getItem(WALK_KEY) ?? '{}') as Record<string, unknown>
    localStorage.setItem(WALK_KEY, JSON.stringify({ ...v, [name]: i }))
  } catch {
    /* 保存できなくても動く */
  }
}

// 階をクリアしたときの、なかまのひとこと（階ごとに順に変わる）
export const FLOOR_CHEERS = ['やったね！ この調子で次の階へ！', 'すごい！ どんどん強くなってるよ！', 'ナイス！ 宝箱まであと少しかも？', 'さすが！ てっぺんが見えてきた！', 'よくがんばったね！ ひと休みしてもいいよ']
export const floorCheer = (floor: number) => FLOOR_CHEERS[Math.abs(floor) % FLOOR_CHEERS.length]
