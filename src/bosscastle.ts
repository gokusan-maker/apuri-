// ボス部屋の城：ボスごとに5階。1〜4階は単語・文法・読解・ミックスの問題（5問・4問正解で次へ）、5階でボスと戦う
import { teamBossQuestions, type TeamQ } from './boss'
import { wordsOf, type Level } from './words'

export const BC_FLOORS = 5
export const BC_QS = 5
export const BC_PASS = 4
export const BC_KIND = ['単語', '文法', '読解', 'ミックス'] as const
export type BcFloor = { id: string; level: Level; floor: number } // floor：0〜3 が問題の階、4 がボス

export function bossCastleFloors(levels: Level[]): BcFloor[] {
  return levels.flatMap((level) => Array.from({ length: BC_FLOORS }, (_, f) => ({ id: `bc:${level}:${f + 1}`, level, floor: f })))
}

// 問題の階の5問（ボスのレベルの単語・文法・例文の訳から）
export function bossFloorQs(level: Level, floor: number, rnd: () => number = Math.random): TeamQ[] {
  const all = teamBossQuestions(wordsOf([level]), rnd, 24) as TeamQ[]
  const by = (t: TeamQ['team']) => all.filter((q) => q.team === t)
  if (floor === 0) return by('word').slice(0, BC_QS)
  if (floor === 1) return by('grammar').slice(0, BC_QS)
  if (floor === 2) return by('reading').slice(0, BC_QS)
  return [...by('word').slice(5, 7), ...by('grammar').slice(5, 7), ...by('reading').slice(5, 6)]
}

const KEY = 'eitan:bcastle'
export function loadBcClears(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveBcClears(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* 保存できなくても動く */
  }
}
