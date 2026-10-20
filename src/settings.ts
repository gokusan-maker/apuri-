// 単語帳（レベル）の選択。端末に保存する。
import { LEVELS, type Level } from './words'

const STORAGE_KEY = 'eitan:levels'

export function loadLevels(): Level[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (Array.isArray(v)) {
      const ok = LEVELS.filter((l) => v.includes(l))
      if (ok.length > 0) return ok
    }
  } catch {
    // 壊れていたら初期値
  }
  return [...LEVELS]
}

export function saveLevels(levels: Level[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 1つは必ず選ばれている状態を保つ
export function toggleLevel(levels: Level[], l: Level): Level[] {
  const next = levels.includes(l) ? levels.filter((x) => x !== l) : [...levels, l]
  return next.length === 0 ? levels : LEVELS.filter((x) => next.includes(x))
}
