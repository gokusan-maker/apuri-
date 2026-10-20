// タイムアタックの制限時間と自己ベストの保存
export const TIME_LIMIT = 60
const BEST_KEY = 'eitan:best-time-attack'

export function loadBest(): number {
  try {
    const n = Number(localStorage.getItem(BEST_KEY))
    return Number.isFinite(n) && n > 0 ? n : 0
  } catch {
    return 0
  }
}

export function saveBest(n: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
