// 単語のつながり（反対の意味・同じ発音）。パズル用の表から引く
import { HOMOPHONES, OPPOSITES } from './puzzles'

export function oppositeOf(en: string): string | undefined {
  const p = OPPOSITES.find(([a, b]) => a === en || b === en)
  return p ? (p[0] === en ? p[1] : p[0]) : undefined
}

// 同じ発音の単語（「see（見る）」の形）
export function homophoneOf(en: string): string | undefined {
  const h = HOMOPHONES.find((x) => x[0] === en || x[2] === en)
  if (!h) return undefined
  return h[0] === en ? `${h[2]}（${h[3]}）` : `${h[0]}（${h[1]}）`
}
