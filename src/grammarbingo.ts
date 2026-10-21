// 文法ビンゴ：3×3のマスの文法問題に答え、正解のマスがたて・よこ・ななめにそろうとビンゴ
import { GRAMMAR, type GrammarQuestion } from './grammar'

export const BINGO_COINS = 10
export const BINGO_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

// rnd は 0〜1 の乱数を返す関数。ちがう単元から9問
export function makeBingo(rnd: () => number): GrammarQuestion[] {
  const units = [...GRAMMAR]
  for (let i = units.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[units[i], units[j]] = [units[j], units[i]]
  }
  return units.slice(0, 9).map((u) => u.questions[Math.floor(rnd() * u.questions.length)])
}

// cells: true＝正解したマス
export const bingoCount = (cells: boolean[]) => BINGO_LINES.filter((l) => l.every((i) => cells[i])).length

// ベスト記録：1回のビンゴでそろえた列の最多
const BEST_KEY = 'eitan:grammar-bingo-best'
export function loadBingoBest(): number {
  try {
    const n = Number(localStorage.getItem(BEST_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function saveBingoBest(n: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
