// 単語もぐらたたき：日本語の意味に合う英単語のもぐらだけをたたく。30秒でいくつたたけるか
import type { Word } from './words'

export const MOLE_SECONDS = 30
export const MOLE_HOLES = 9
export type MoleRound = { target: Word; holes: (Word | null)[] }

// rnd は 0〜1 の乱数を返す関数。9つの穴のうち3つにもぐら（正解1・まちがい2）
export function makeRound(words: Word[], rnd: () => number): MoleRound {
  const pick = (list: Word[]) => list[Math.floor(rnd() * list.length)]
  const target = pick(words)
  const others = words.filter((w) => w.id !== target.id && w.ja !== target.ja)
  const wrong: Word[] = []
  for (let i = 0; i < others.length && wrong.length < 2; i++) {
    const w = pick(others)
    if (!wrong.includes(w)) wrong.push(w)
  }
  // 決まった数だけ選べなかったときは先頭から足す
  for (const w of others) if (wrong.length < 2 && !wrong.includes(w)) wrong.push(w)
  const holes: (Word | null)[] = Array(MOLE_HOLES).fill(null)
  const free = Array.from({ length: MOLE_HOLES }, (_, i) => i)
  for (const w of [target, ...wrong]) {
    const at = free.splice(Math.floor(rnd() * free.length), 1)[0]
    holes[at] = w
  }
  return { target, holes }
}

const BEST_KEY = 'eitan:best-mole'
export function loadMoleBest(): number {
  try {
    const n = Number(localStorage.getItem(BEST_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function recordMoleBest(n: number): boolean {
  if (n <= loadMoleBest()) return false
  try {
    localStorage.setItem(BEST_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return true
}
