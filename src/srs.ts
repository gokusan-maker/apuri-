// ライトナー方式の簡易間隔反復。箱が上がるほど次の出題までの日数が延びる。
export type Progress = {
  box: number
  due: string // YYYY-MM-DD
}

export type ProgressMap = Record<string, Progress>

export const INTERVALS = [0, 1, 3, 7, 14, 30]

const STORAGE_KEY = 'eitan:progress'

export function dayKey(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number)
  return dayKey(new Date(y, m - 1, d + n))
}

export function grade(prev: Progress | undefined, correct: boolean, today: string): Progress {
  const box = correct ? Math.min((prev?.box ?? 0) + 1, INTERVALS.length - 1) : 0
  return { box, due: addDays(today, INTERVALS[box]) }
}

export function isDue(p: Progress | undefined, today: string): boolean {
  return !p || p.due <= today
}

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress: ProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
