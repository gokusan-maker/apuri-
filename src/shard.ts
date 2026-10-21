// ボスのかけら：ボスに勝つと4回に1回くらい落とす。5つたまると色ちがい確定のタマゴと交換
export const SHARD_RATE = 0.25
export const SHARDS_FOR_EGG = 5
const KEY = 'eitan:boss-shards'

export function loadShards(): number {
  try {
    const n = Number(localStorage.getItem(KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function saveShards(n: number): void {
  try {
    localStorage.setItem(KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// r は 0〜1 の乱数。かけらを落としたら、ふえたあとの数と交換するかどうか
export function shardAfter(n: number, r: number): { shards: number; dropped: boolean; exchange: boolean } {
  if (r >= SHARD_RATE) return { shards: n, dropped: false, exchange: false }
  const next = n + 1
  return next >= SHARDS_FOR_EGG ? { shards: 0, dropped: true, exchange: true } : { shards: next, dropped: true, exchange: false }
}
