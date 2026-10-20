// 単語ビンゴ：3×3 の英単語。読まれた日本語の単語をタップし、1列そろえばビンゴ
import { shuffle, type Rng } from './quiz'
import type { Word } from './words'

export const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

export function makeBoard(words: Word[], rng: Rng = Math.random): Word[] {
  return shuffle(words, rng).slice(0, 9)
}

export function hasBingo(marked: number[]): boolean {
  return LINES.some((l) => l.every((i) => marked.includes(i)))
}
