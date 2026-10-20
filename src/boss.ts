// ボス戦：単語帳の全ステージをクリアすると挑戦できる。
import { stagesOf, type StageRecord } from './stages'
import type { Level } from './words'

export const BOSS_HP = 100
export const HEARTS = 3
export const BOSS_QUESTIONS = 20
export const BOSS_XP = 100
export const BOSS_REMATCH_XP = 20 // 2回目以降の撃破ボーナス

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

// 単語帳ごとのボス（すべてオリジナル）
export type BossLook = { name: string; color: string; line: string; eye: string }

export const BOSSES: Record<Level, BossLook> = {
  中1: { name: 'ヤミモチ', color: '#6d28d9', line: '#3b0764', eye: '#fde047' },
  中2: { name: 'ホノオモチ', color: '#dc2626', line: '#7f1d1d', eye: '#fef08a' },
  中3: { name: 'コオリモチ', color: '#0ea5e9', line: '#0c4a6e', eye: '#f0f9ff' },
  高校基礎: { name: 'カゲノオオモチ', color: '#334155', line: '#020617', eye: '#f87171' },
  熟語: { name: 'ナゾナゾモチ', color: '#0d9488', line: '#134e4a', eye: '#fde68a' },
  '曜日・月': { name: 'トケイモチ', color: '#ca8a04', line: '#713f12', eye: '#fff7ed' },
}
