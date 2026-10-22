// 長文の「○×だけチャレンジ」：解いた長文の内容一致（○×）から10問
import type { LongPassage, TrueFalse } from './longreading'

export type TfItem = TrueFalse & { title: string }

export function makeTfQuiz(passages: LongPassage[], rnd: () => number, n = 10): TfItem[] {
  const pool = passages.flatMap((p) => p.tf.map((t) => ({ ...t, title: p.title })))
  const out: TfItem[] = []
  const used = new Set<number>()
  while (out.length < Math.min(n, pool.length)) {
    let k = Math.floor(rnd() * pool.length)
    while (used.has(k)) k = (k + 1) % pool.length
    used.add(k)
    out.push(pool[k])
  }
  return out
}
