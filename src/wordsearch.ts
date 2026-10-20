// ことばさがし：6×6 の文字に英単語を横か縦にかくす
import { shuffle, type Rng } from './quiz'
import type { Word } from './words'

export const SIZE = 6
export type Placed = { word: Word; cells: number[] } // cells はマスの番号（行*SIZE+列）
export type Puzzle = { grid: string[]; placed: Placed[]; size: number }

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

// 3〜size文字の英字だけの単語を count 個かくす（置けなければ少なくなる）
export function makeSearch(words: Word[], count = 3, rng: Rng = Math.random, size = SIZE): Puzzle {
  const SIZE = size
  const grid: string[] = Array(SIZE * SIZE).fill('')
  const placed: Placed[] = []
  const pool = shuffle(
    words.filter((w) => w.en.length >= 3 && w.en.length <= Math.min(SIZE, 7) && /^[a-z]+$/.test(w.en)),
    rng,
  )
  for (const w of pool) {
    if (placed.length >= count) break
    if (placed.some((p) => p.word.en === w.en)) continue
    for (let tries = 0; tries < 30; tries++) {
      const across = rng() < 0.5
      const r = Math.floor(rng() * (across ? SIZE : SIZE - w.en.length + 1))
      const c = Math.floor(rng() * (across ? SIZE - w.en.length + 1 : SIZE))
      const cells = [...w.en].map((_, i) => (across ? r * SIZE + c + i : (r + i) * SIZE + c))
      if (cells.every((k, i) => grid[k] === '' || grid[k] === w.en[i])) {
        cells.forEach((k, i) => (grid[k] = w.en[i]))
        placed.push({ word: w, cells })
        break
      }
    }
  }
  for (let k = 0; k < grid.length; k++) if (!grid[k]) grid[k] = LETTERS[Math.floor(rng() * LETTERS.length)]
  return { grid, placed, size }
}

// えらんだマス（順番どおり）がかくした単語のどれかと一致するか
export function matchWord(p: Puzzle, picked: number[]): Placed | undefined {
  return p.placed.find((x) => x.cells.length === picked.length && x.cells.every((k, i) => k === picked[i]))
}
