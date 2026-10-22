// 今月のチャンピオン単元：今月いちばん正解した文法の単元
import { GRAMMAR, type GrammarUnit } from './grammar'

const KEY = 'eitan:grammar-champ'
export type GrammarChamp = { month: string; counts: Record<string, number> }

export function loadGrammarChamp(): GrammarChamp {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<GrammarChamp> | null
    if (v && typeof v.month === 'string' && v.counts && typeof v.counts === 'object') return { month: v.month, counts: v.counts }
  } catch {
    // こわれていたら空から
  }
  return { month: '', counts: {} }
}

export function saveGrammarChamp(c: GrammarChamp): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(c))
  } catch {
    // 保存できなくても続ける
  }
}

// 正解を1つ数える（月がかわったらリセット）。month は 'YYYY-MM'
export function countChamp(c: GrammarChamp, unitId: string, month: string): GrammarChamp {
  const counts = c.month === month ? c.counts : {}
  return { month, counts: { ...counts, [unitId]: (counts[unitId] ?? 0) + 1 } }
}

export function champOf(c: GrammarChamp, month: string): { unit: GrammarUnit; count: number } | null {
  if (c.month !== month) return null
  let best: { unit: GrammarUnit; count: number } | null = null
  for (const u of GRAMMAR) {
    const n = c.counts[u.id] ?? 0
    if (n > 0 && (!best || n > best.count)) best = { unit: u, count: n }
  }
  return best
}
