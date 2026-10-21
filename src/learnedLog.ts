// 定着した単語の数（全単語帳）を日ごとに記録する
import { addDays } from './srs'

export type LearnedLog = Record<string, number>
const KEY = 'eitan:learned-log'

export function loadLearnedLog(): LearnedLog {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([k, n]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && typeof n === 'number')) as LearnedLog
  } catch {
    return {}
  }
}

export function saveLearnedLog(log: LearnedLog): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(log))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 今日の数を記録（古いもの＝1年より前は消す）
export function recordLearned(log: LearnedLog, day: string, n: number): LearnedLog {
  if (log[day] === n) return log
  const cut = addDays(day, -365)
  return { ...Object.fromEntries(Object.entries(log).filter(([k]) => k >= cut)), [day]: n }
}

// 最近 days 日分（記録がない日は前の日の数で埋める）
export function lastLearned(log: LearnedLog, today: string, days = 30): number[] {
  const out: number[] = []
  let prev = 0
  const start = addDays(today, -(days - 1))
  for (const k of Object.keys(log).sort()) if (k < start) prev = log[k]
  for (let i = 0; i < days; i++) {
    const d = addDays(start, i)
    if (log[d] !== undefined) prev = log[d]
    out.push(prev)
  }
  return out
}
