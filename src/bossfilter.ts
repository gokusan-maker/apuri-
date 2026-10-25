// ボス部屋：ボスをレベルでしぼりこむ（中学・高校・きほん）。はじめは設定の学年に合わせる
import { loadGrade } from './usergrade'
import type { Level } from './words'

export type BossGroup = 'jh' | 'hs' | 'basic'
export const BOSS_GROUPS: { id: BossGroup; label: string; levels: Level[] }[] = [
  { id: 'jh', label: '🏫 中学', levels: ['中1', '中2', '中3'] },
  { id: 'hs', label: '🎓 高校・大人', levels: ['高校基礎', '熟語', '英検2級', 'ビジネス'] },
  { id: 'basic', label: '🌱 きほん', levels: ['曜日・月', '数', '色・形', '会話', 'テーマ別'] },
]

const KEY = 'eitan:boss-group'
export function loadBossGroup(): BossGroup {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'jh' || v === 'hs' || v === 'basic') return v
  } catch {
    /* ない */
  }
  const g = loadGrade()
  return g === 'hs' || g === 'adult' ? 'hs' : 'jh'
}
export function saveBossGroup(g: BossGroup): void {
  try {
    localStorage.setItem(KEY, g)
  } catch {
    /* 保存できなくても動く */
  }
}
