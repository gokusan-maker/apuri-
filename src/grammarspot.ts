// 文法のまちがいさがし：確認問題の空欄を、正しい語か まちがった語でうめた文を出し、○（正しい）か×（まちがい）かを答える
import { GRAMMAR, type GrammarQuestion } from './grammar'

export type SpotQ = { text: string; correct: boolean; right: string; why: string }

export function makeSpot(q: GrammarQuestion, r: number, r2: number): SpotQ {
  const right = q.sentence.replace('___', q.choices[q.answer])
  if (r < 0.5) return { text: right, correct: true, right, why: q.why }
  const wrongs = q.choices.filter((_, i) => i !== q.answer)
  return { text: q.sentence.replace('___', wrongs[Math.floor(r2 * wrongs.length)]), correct: false, right, why: q.why }
}

export function spotSet(n: number, rng: () => number = Math.random): SpotQ[] {
  const all = GRAMMAR.flatMap((u) => u.questions)
  const out: SpotQ[] = []
  const used = new Set<number>()
  while (out.length < n && used.size < all.length) {
    const i = Math.floor(rng() * all.length)
    if (used.has(i)) continue
    used.add(i)
    out.push(makeSpot(all[i], rng(), rng()))
  }
  return out
}
