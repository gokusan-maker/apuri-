// ボスのエリアの地図で、ふつうのボスがうろうろする位置：日ごとに場所が入れかわる（同じ日は同じ）
export const ROAM_SPOTS = [
  { x: 18, y: 18 },
  { x: 50, y: 14 },
  { x: 82, y: 18 },
  { x: 50, y: 46 },
  { x: 18, y: 88 },
  { x: 50, y: 88 },
  { x: 82, y: 88 },
]

function hash(s: string): number {
  let h = 7
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

// n 体のボスの位置（重ならない）
export function roamSpots(n: number, day: string): { x: number; y: number }[] {
  const order = ROAM_SPOTS.map((p, i) => ({ p, k: hash(`${day}:${i}`) })).sort((a, b) => a.k - b.k)
  return order.slice(0, Math.min(n, ROAM_SPOTS.length)).map((o) => o.p)
}

// エリアの宝箱：1日1回、エリアごとに地図のどこかに落ちている（ひろうと🪙）
export const AREA_CHEST_COINS = 15
export const CHEST_SPOTS = [
  { x: 34, y: 34 },
  { x: 66, y: 32 },
  { x: 50, y: 66 },
  { x: 30, y: 90 },
  { x: 70, y: 90 },
]
export const chestSpot = (area: string, day: string) => CHEST_SPOTS[hash(`${area}@${day}`) % CHEST_SPOTS.length]
const CHEST_KEY = 'eitan:area-chest'
export function loadAreaChests(day: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(CHEST_KEY) ?? 'null') as { day?: unknown; opened?: unknown } | null
    return v && v.day === day && Array.isArray(v.opened) ? v.opened.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveAreaChests(day: string, opened: string[]): void {
  try {
    localStorage.setItem(CHEST_KEY, JSON.stringify({ day, opened }))
  } catch {
    /* 保存できなくても動く */
  }
}
