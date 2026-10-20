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

// 1日の新出単語数の上限。復習（一度でも出題した単語）を先に、新出は上限まで出す。
export const DAILY_NEW_LIMIT = 10

export type DailyNew = {
  day: string
  count: number
}

const DAILY_KEY = 'eitan:daily-new'

export function buildQueue<T extends { id: string }>(
  words: T[],
  progress: ProgressMap,
  today: string,
  newToday: number,
  limit = DAILY_NEW_LIMIT,
): T[] {
  const reviews = words.filter((w) => progress[w.id] && isDue(progress[w.id], today))
  const fresh = words.filter((w) => !progress[w.id]).slice(0, Math.max(0, limit - newToday))
  // 今日「まだ」にした単語（箱0）は最後に回し、同じ単語が続けて出ないようにする
  const relearn = (w: T) => progress[w.id]?.box === 0 && progress[w.id]?.due === today
  return [...reviews.filter((w) => !relearn(w)), ...fresh, ...reviews.filter(relearn)]
}

export function loadDailyNew(today: string): DailyNew {
  try {
    const raw = localStorage.getItem(DAILY_KEY)
    const d = raw ? (JSON.parse(raw) as DailyNew) : null
    return d && d.day === today ? d : { day: today, count: 0 }
  } catch {
    return { day: today, count: 0 }
  }
}

export function saveDailyNew(d: DailyNew): void {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(d))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
