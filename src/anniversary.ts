// 相棒の記念日：出会ってから 7・30・100・365 日
export const MILESTONES = [7, 30, 100, 365]
export const ANNIV_COINS = 10

function daysBetween(a: string, b: string): number {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
}

// まだお祝いしていない、いちばん新しい記念日（過ぎていてもお祝いする）
export function dueAnniversary(born: string | undefined, today: string, done: string[], key: string): number | null {
  if (!born) return null
  const days = daysBetween(born, today)
  const hit = MILESTONES.filter((n) => days >= n && !done.includes(`${key}:${n}`))
  return hit.length ? hit[hit.length - 1] : null
}

const STORAGE_KEY = 'eitan:anniversaries'

export function loadDone(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function saveDone(list: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
