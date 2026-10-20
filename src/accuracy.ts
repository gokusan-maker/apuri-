// 正答率の記録：今日の分と、学び方（カード／クイズ／耳）ごとの累計
import type { Source } from './monster'

export type Pair = { correct: number; total: number }
export type Accuracy = { day: string; today: Pair; by: Partial<Record<Source, Pair>> }

const STORAGE_KEY = 'eitan:accuracy'
const ZERO: Pair = { correct: 0, total: 0 }

const add = (p: Pair | undefined, ok: boolean): Pair => ({
  correct: (p?.correct ?? 0) + (ok ? 1 : 0),
  total: (p?.total ?? 0) + 1,
})

export function recordAnswer(a: Accuracy, today: string, source: Source, ok: boolean): Accuracy {
  const t = a.day === today ? a.today : ZERO
  return { day: today, today: add(t, ok), by: { ...a.by, [source]: add(a.by[source], ok) } }
}

export function rate(p: Pair | undefined): number | null {
  return p && p.total > 0 ? Math.round((p.correct / p.total) * 100) : null
}

export function loadAccuracy(): Accuracy {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as Accuracy) : null
    if (v && typeof v.day === 'string' && v.today && v.by && typeof v.by === 'object') return v
  } catch {
    // 壊れていたら最初から
  }
  return { day: '', today: ZERO, by: {} }
}

export function saveAccuracy(a: Accuracy): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(a))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
