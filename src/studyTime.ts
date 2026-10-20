// 学習時間：画面が見えていて、最近さわっている間だけ数える（秒）。日ごとに60日分
import { addDays } from './srs'

export type TimeLog = Record<string, number>

const STORAGE_KEY = 'eitan:time'
export const TICK = 10 // 何秒ごとに数えるか
export const IDLE = 60 // これ以上さわらないと数えない（秒）

export function addTime(log: TimeLog, today: string, sec: number): TimeLog {
  const next: TimeLog = { ...log, [today]: (log[today] ?? 0) + sec }
  const oldest = addDays(today, -60)
  for (const d of Object.keys(next)) if (d < oldest) delete next[d]
  return next
}

export function minutesToday(log: TimeLog, today: string): number {
  return Math.floor((log[today] ?? 0) / 60)
}

export function minutesWeek(log: TimeLog, today: string): number {
  let sec = 0
  for (let i = 0; i < 7; i++) sec += log[addDays(today, -i)] ?? 0
  return Math.floor(sec / 60)
}

export function loadTime(): TimeLog {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number' && n >= 0)) as TimeLog
  } catch {
    return {}
  }
}

export function saveTime(log: TimeLog): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
