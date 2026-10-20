// 小さいほどよい自己ベスト（神経衰弱の手数・ビンゴの問題数）
export function loadLowBest(key: string): number | null {
  try {
    const n = Number(localStorage.getItem(key))
    return Number.isFinite(n) && n > 0 ? n : null
  } catch {
    return null
  }
}

// 記録を更新したら true
export function recordLowBest(key: string, n: number): boolean {
  const best = loadLowBest(key)
  if (best !== null && best <= n) return false
  try {
    localStorage.setItem(key, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return true
}

export const MEMORY_BEST = 'eitan:best-memory'
export const BINGO_BEST = 'eitan:best-bingo'
