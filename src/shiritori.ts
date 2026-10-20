// 英語しりとり：前の単語の最後の文字で始まる単語を選ぶ
import { shuffle, type Rng } from './quiz'
import type { Word } from './words'

export const usable = (w: Word) => /^[a-z]+$/.test(w.en)

export function lastLetter(en: string): string {
  return en[en.length - 1]
}

export type Turn = { choices: Word[]; answer: number } | null

// 正解（最後の文字で始まる、まだ使っていない単語）1つ＋そうでない単語3つ。正解が作れなければ null
export function makeTurn(current: Word, pool: Word[], used: Set<string>, rng: Rng = Math.random): Turn {
  const ch = lastLetter(current.en)
  const ok = shuffle(pool.filter((w) => w.en[0] === ch && !used.has(w.id)), rng)
  if (ok.length === 0) return null
  const ng = shuffle(pool.filter((w) => w.en[0] !== ch && w.id !== current.id), rng).slice(0, 3)
  const choices = shuffle([ok[0], ...ng], rng)
  return { choices, answer: choices.indexOf(ok[0]) }
}
