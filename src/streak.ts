// 連続学習日数。1問でも学習した日を「学習した日」と数える。
import { addDays } from './srs'

export type Streak = {
  last: string // 最後に学習した日
  count: number // last までの連続日数
}

const STORAGE_KEY = 'eitan:streak'

export function recordStudy(s: Streak | null, today: string): Streak {
  if (!s) return { last: today, count: 1 }
  if (s.last === today) return s
  if (addDays(s.last, 1) === today) return { last: today, count: s.count + 1 }
  return { last: today, count: 1 }
}

// 表示用：今日か昨日まで続いていれば有効。途切れていたら0。
export function currentStreak(s: Streak | null, today: string): number {
  if (!s) return 0
  return s.last === today || addDays(s.last, 1) === today ? s.count : 0
}

export function loadStreak(): Streak | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const s = raw ? (JSON.parse(raw) as Streak) : null
    return s && typeof s.last === 'string' && typeof s.count === 'number' ? s : null
  } catch {
    return null
  }
}

export function saveStreak(s: Streak | null): void {
  if (!s) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// お休みチケット：1日休んでも、チケットがあれば連続が切れない（使うと1枚へる）
export function recordStudyWithFreeze(s: Streak | null, today: string, freezes: number): { streak: Streak; used: boolean } {
  if (s && freezes > 0 && addDays(s.last, 2) === today) {
    return { streak: { last: today, count: s.count + 1 }, used: true }
  }
  return { streak: recordStudy(s, today), used: false }
}

// チケットがあれば、きのう休んだだけなら連続日数をそのまま見せる
export function currentStreakWithFreeze(s: Streak | null, today: string, freezes: number): number {
  if (s && freezes > 0 && addDays(s.last, 2) === today) return s.count
  return currentStreak(s, today)
}
