import { createContext } from 'react'
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
