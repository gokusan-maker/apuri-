// 文法のまちがいさがし：確認問題の空欄を、正しい語か まちがった語でうめた文を出し、○（正しい）か×（まちがい）かを答える
import { GRAMMAR, type GrammarQuestion } from './grammar'

export type SpotQ = { text: string; correct: boolean; right: string; why: string }

// 「（何も入らない）」の選択肢は空にしてうめる
const fill = (sentence: string, word: string) => sentence.replace('___', word.startsWith('（') ? '' : word).replace(/\s+/g, ' ').replace(/\s([?.!,])/g, '$1')

export function makeSpot(q: GrammarQuestion, r: number, r2: number): SpotQ {
  const right = fill(q.sentence, q.choices[q.answer])
  if (r < 0.5) return { text: right, correct: true, right, why: q.why }
  const wrongs = q.choices.filter((_, i) => i !== q.answer)
  return { text: fill(q.sentence, wrongs[Math.floor(r2 * wrongs.length)]), correct: false, right, why: q.why }
}

export function spotSet(n: number, rng: () => number = Math.random, units = GRAMMAR): SpotQ[] {
  const all = units.flatMap((u) => u.questions)
  const out: SpotQ[] = []
  const used = new Set<number>()
  while (out.length < n && used.size < all.length) {
    let i = Math.floor(rng() * all.length)
    while (used.has(i)) i = (i + 1) % all.length
    used.add(i)
    out.push(makeSpot(all[i], rng(), rng()))
  }
  return out
}
