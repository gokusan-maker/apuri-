// 文法の今週の目標：1週間に全問正解する単元の数を決め、達成で🎟1（週に1回）
import { weekKey } from './rareboss'

export const GOAL_CHOICES = [3, 5, 10] as const
export type GrammarGoal = { week: string; goal: number; cleared: string[]; rewarded: boolean }

const KEY = 'eitan:grammar-goal'

export function loadGrammarGoal(day: string): GrammarGoal {
  const week = weekKey(day)
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<GrammarGoal> | null
    const goal = typeof v?.goal === 'number' && (GOAL_CHOICES as readonly number[]).includes(v.goal) ? v.goal : 0
    // 週がかわったら目標の数だけ引きつぐ
    if (!v || v.week !== week) return { week, goal, cleared: [], rewarded: false }
    const cleared = Array.isArray(v.cleared) ? v.cleared.filter((x): x is string => typeof x === 'string') : []
    return { week, goal, cleared, rewarded: v.rewarded === true }
  } catch {
    return { week, goal: 0, cleared: [], rewarded: false }
  }
}

export function saveGrammarGoal(g: GrammarGoal): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(g))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 単元を全問正解した。目標を今回はじめて達成したら reached が true
export function clearForGoal(g: GrammarGoal, unitId: string): { goal: GrammarGoal; reached: boolean } {
  const cleared = g.cleared.includes(unitId) ? g.cleared : [...g.cleared, unitId]
  const reached = g.goal > 0 && !g.rewarded && cleared.length >= g.goal
  return { goal: { ...g, cleared, rewarded: g.rewarded || reached }, reached }
}
