// 週間チャレンジ：月曜はじまりの1週間で決まった数を解くと、ごほうび
import { addDays } from './srs'
import type { History } from './history'

export const WEEKLY_TARGET = 100
export const WEEKLY_COINS = 50
export const WEEKLY_XP = 60

export function weekStart(today: string): string {
  const [y, m, d] = today.split('-').map(Number)
  const dow = new Date(y, m - 1, d).getDay() // 0=日
  return addDays(today, -((dow + 6) % 7))
}

export function weekCount(h: History, today: string): number {
  const start = weekStart(today)
  let n = 0
  for (let i = 0; i < 7; i++) n += h[addDays(start, i)] ?? 0
  return n
}

const STORAGE_KEY = 'eitan:weekly'

export function loadWeeklyClaimed(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveWeeklyClaimed(week: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, week)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 土日はXP2倍
export function isWeekend(today: string): boolean {
  const [y, m, d] = today.split('-').map(Number)
  const dow = new Date(y, m - 1, d).getDay()
  return dow === 0 || dow === 6
}

// 先週のまとめ（問題数と学習した日数）
export function lastWeekSummary(h: History, today: string): { count: number; days: number; start: string } {
  const start = addDays(weekStart(today), -7)
  let count = 0
  let days = 0
  for (let i = 0; i < 7; i++) {
    const n = h[addDays(start, i)] ?? 0
    count += n
    if (n > 0) days++
  }
  return { count, days, start }
}

// 今週と先週の問題数をくらべる文
export function weekCompare(thisWeek: number, lastWeek: number): string {
  const diff = thisWeek - lastWeek
  if (lastWeek === 0) return `今週 ${thisWeek}問`
  return `今週 ${thisWeek}問（先週 ${lastWeek}問・${diff >= 0 ? `+${diff}` : diff}）`
}
