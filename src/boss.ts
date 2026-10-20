// ボス戦：単語帳の全ステージをクリアすると挑戦できる。
import { stagesOf, type StageRecord } from './stages'
import type { Level } from './words'

export const BOSS_HP = 100
export const HEARTS = 3
export const BOSS_QUESTIONS = 20
export const BOSS_XP = 100

// 正解のダメージ。連続正解で少しずつ強くなる（最大10）
export function damage(combo: number): number {
  return 6 + Math.min(Math.max(combo - 1, 0), 4)
}

export function bossUnlocked(level: Level, rec: StageRecord): boolean {
  const list = stagesOf(level)
  return list.length > 0 && list.every((s) => (rec[s.id] ?? 0) >= 1)
}

export type BossRecord = Partial<Record<Level, string>> // 倒した日

const STORAGE_KEY = 'eitan:boss'

export function loadBoss(): BossRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as BossRecord) : {}
  } catch {
    return {}
  }
}

export function saveBoss(r: BossRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
