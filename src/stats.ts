// 今日の学習数（答えた回数）。日付が変わると0から。
export type DayCount = { day: string; count: number }

const STORAGE_KEY = 'eitan:today-count'

export function loadTodayCount(today: string): DayCount {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const d = raw ? (JSON.parse(raw) as DayCount) : null
    return d && d.day === today && typeof d.count === 'number' ? d : { day: today, count: 0 }
  } catch {
    return { day: today, count: 0 }
  }
}

export function saveTodayCount(d: DayCount): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export function addToday(d: DayCount, today: string): DayCount {
  return d.day === today ? { day: today, count: d.count + 1 } : { day: today, count: 1 }
}

// 今日もらったXP（今日のまとめ用）
const XP_KEY = 'eitan:today-xp'

export function loadTodayXp(today: string): DayCount {
  try {
    const raw = localStorage.getItem(XP_KEY)
    const d = raw ? (JSON.parse(raw) as DayCount) : null
    return d && d.day === today && typeof d.count === 'number' ? d : { day: today, count: 0 }
  } catch {
    return { day: today, count: 0 }
  }
}

export function saveTodayXp(d: DayCount): void {
  try {
    localStorage.setItem(XP_KEY, JSON.stringify(d))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
