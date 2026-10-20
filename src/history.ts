// 日ごとの学習数（グラフ用）。直近60日分だけ残す。
import { addDays } from './srs'

export type History = Record<string, number> // YYYY-MM-DD → 問題数

const STORAGE_KEY = 'eitan:history'
const KEEP_DAYS = 60

export function addHistory(h: History, today: string): History {
  const next: History = { ...h, [today]: (h[today] ?? 0) + 1 }
  const oldest = addDays(today, -KEEP_DAYS)
  for (const d of Object.keys(next)) if (d < oldest) delete next[d]
  return next
}

export type DayBar = { day: string; count: number; label: string }

const WEEK = ['日', '月', '火', '水', '木', '金', '土']

export function lastDays(h: History, today: string, n = 7): DayBar[] {
  return Array.from({ length: n }, (_, i) => {
    const day = addDays(today, i - n + 1)
    const [y, m, d] = day.split('-').map(Number)
    return { day, count: h[day] ?? 0, label: WEEK[new Date(y, m - 1, d).getDay()] }
  })
}

export function loadHistory(): History {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(
      Object.entries(v).filter(([k, n]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && typeof n === 'number' && n >= 0),
    ) as History
  } catch {
    return {}
  }
}

export function saveHistory(h: History): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(h))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
