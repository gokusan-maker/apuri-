// 文法2択スピード：正しい英文はどっち？を10問。まちがいは+5秒。ベストタイムを記録
import { GRAMMAR, type GrammarQuestion } from './grammar'

export const DUEL_COUNT = 10
export const DUEL_PENALTY = 5
export type DuelQ = { right: string; wrong: string; rightFirst: boolean; why: string }

const fill = (q: GrammarQuestion, i: number) => (q.choices[i].startsWith('（') ? q.sentence.replace(/___ ?/, '') : q.sentence.replace('___', q.choices[i]))

// rnd は 0〜1 の乱数を返す関数
export function makeDuel(rnd: () => number, n = DUEL_COUNT): DuelQ[] {
  const all = GRAMMAR.flatMap((u) => u.questions)
  const out: DuelQ[] = []
  const used = new Set<number>()
  while (out.length < n && used.size < all.length) {
    let k = Math.floor(rnd() * all.length)
    // 同じ問題が続いたら、あいている次の問題にずらす（乱数がかたよっても止まらない）
    while (used.has(k)) k = (k + 1) % all.length
    used.add(k)
    const q = all[k]
    const wrongs = q.choices.map((_, i) => i).filter((i) => i !== q.answer)
    const w = wrongs[Math.floor(rnd() * wrongs.length)]
    out.push({ right: fill(q, q.answer), wrong: fill(q, w), rightFirst: rnd() < 0.5, why: q.why })
  }
  return out
}

export const duelTime = (sec: number, misses: number) => sec + misses * DUEL_PENALTY

const KEY = 'eitan:grammar-duel-best'
export function loadDuelBest(): number {
  try {
    const n = Number(localStorage.getItem(KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function recordDuelBest(sec: number): boolean {
  const b = loadDuelBest()
  if (b > 0 && b <= sec) return false
  try {
    localStorage.setItem(KEY, String(sec))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return true
}
