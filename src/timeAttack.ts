// タイムアタックの制限時間と自己ベストの保存
export const TIME_LIMIT = 60
export const LENGTHS = [30, 60, 90]
const BEST_KEY = 'eitan:best-time-attack'
// 60秒はこれまでのキーのまま（前のデータを引きつぐ）、ほかの長さは別のキー
const bestKey = (sec: number) => (sec === 60 ? BEST_KEY : `${BEST_KEY}-${sec}`)

export function loadBest(sec = 60): number {
  try {
    const n = Number(localStorage.getItem(bestKey(sec)))
    return Number.isFinite(n) && n > 0 ? n : 0
  } catch {
    return 0
  }
}

export function saveBest(n: number, sec = 60): void {
  try {
    localStorage.setItem(bestKey(sec), String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 上位5回の記録
export type Record5 = { score: number; day: string }[]
const TOP_KEY = 'eitan:time-attack-top'

export function addTop(list: Record5, score: number, day: string): Record5 {
  return [...list, { score, day }].sort((a, b) => b.score - a.score).slice(0, 5)
}

export function loadTop(): Record5 {
  try {
    const raw = localStorage.getItem(TOP_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    return Array.isArray(v) ? v.filter((x) => typeof x?.score === 'number' && typeof x?.day === 'string').slice(0, 5) : []
  } catch {
    return []
  }
}

export function saveTop(list: Record5): void {
  try {
    localStorage.setItem(TOP_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
