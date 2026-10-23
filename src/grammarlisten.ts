// 文法の例文リスニング：例文を聞いて、空所の語を3択で選ぶ（空所は3文字以上の語から）
import { GRAMMAR } from './grammar'

export type ListenQ = { en: string; ja: string; shown: string; answer: string; choices: string[] }

const clean = (w: string) => w.replace(/[^A-Za-z']/g, '')

export function makeListen(en: string, ja: string, r: number, pool: string[], r2: () => number): ListenQ | null {
  const words = en.split(' ')
  // T-shirt のようにハイフンなどをふくむ語は、記号をとると元の語の中に見つからず空所にできないので外す
  const idx = words.map((w, i) => (clean(w).length >= 3 && w.includes(clean(w)) ? i : -1)).filter((i) => i >= 0)
  if (idx.length === 0) return null
  const k = idx[Math.floor(r * idx.length)]
  const answer = clean(words[k])
  const shown = words.map((w, i) => (i === k ? w.replace(answer, '_____') : w)).join(' ')
  const others = pool.filter((w) => w.toLowerCase() !== answer.toLowerCase())
  // まちがいの選択肢は2つ（乱数の位置から順にちがう語を拾うので、かならず終わる）
  const ds: string[] = []
  const start = Math.floor(r2() * others.length)
  for (let k = 0; k < others.length && ds.length < 2; k++) {
    const w = others[(start + k) % others.length]
    if (!ds.includes(w)) ds.push(w)
  }
  const choices = [answer, ...ds].sort((a, b) => a.localeCompare(b))
  return { en, ja, shown, answer, choices }
}

export function listenSet(n: number, rng: () => number = Math.random): ListenQ[] {
  const exs = GRAMMAR.flatMap((u) => u.examples)
  const pool = [...new Set(exs.flatMap((e) => e.en.split(' ').map(clean)).filter((w) => w.length >= 3))]
  const out: ListenQ[] = []
  const used = new Set<number>()
  while (out.length < n && used.size < exs.length) {
    const i = Math.floor(rng() * exs.length)
    if (used.has(i)) continue
    used.add(i)
    const q = makeListen(exs[i].en, exs[i].ja, rng(), pool, rng)
    if (q) out.push(q)
  }
  return out
}
