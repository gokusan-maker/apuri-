// 週替わりのレアボス：金色に光るボスが週に1体。週の最初の撃破で色ちがい確定のタマゴ
import { BOSSES, dailyBossLevel, type BossLook } from './boss'
import type { Level } from './words'

export const RARE_HP = 130
export const RARE_LEVELS: Level[] = ['中1', '中2', '中3', '高校基礎', '熟語']

// その日をふくむ週の月曜日（YYYY-MM-DD）
export function weekKey(day: string): string {
  const [y, m, d] = day.split('-').map(Number)
  const t = new Date(y, m - 1, d)
  t.setDate(t.getDate() - ((t.getDay() + 6) % 7))
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}

export function rareBossOf(week: string): { level: Level; look: BossLook } {
  const level = dailyBossLevel(RARE_LEVELS, week) ?? '中1'
  const base = BOSSES[level]
  return {
    level,
    look: { ...base, name: `キラキラ${base.name}`, color: '#facc15', line: '#a16207', eye: '#7c3aed', desc: '週に一度だけあらわれる、金色に光るレアボス。', taunt: { en: 'Can you catch my shine?', ja: 'わたしの光をつかまえられるかな？' } },
  }
}

const KEY = 'eitan:rare-boss'

export function loadRareWeek(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveRareWeek(w: string): void {
  try {
    localStorage.setItem(KEY, w)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 週末ボス：土日だけあらわれる強いボス。その週末の最初の撃破で🎟1
export const WEEKEND_HP = 160
export function weekendBossOf(week: string): { level: Level; look: BossLook } {
  const level = dailyBossLevel(RARE_LEVELS, `weekend-${week}`) ?? '中2'
  const base = BOSSES[level]
  return {
    level,
    look: { ...base, name: `週末の${base.name}`, color: '#7c3aed', line: '#4c1d95', eye: '#facc15', desc: '土曜と日曜だけあらわれる、とても強いボス。', taunt: { en: 'Weekends are for training!', ja: '週末は修行の日だ！' } },
  }
}

const WEEKEND_KEY = 'eitan:weekend-boss'
export function loadWeekendWeek(): string {
  try {
    return localStorage.getItem(WEEKEND_KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveWeekendWeek(w: string): void {
  try {
    localStorage.setItem(WEEKEND_KEY, w)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
