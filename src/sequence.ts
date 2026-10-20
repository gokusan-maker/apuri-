// 順番クイズ：曜日・月・序数の「次は？」「前は？」
import { shuffle, type Rng } from './quiz'

export const SEQUENCES: { name: string; items: string[]; loop: boolean }[] = [
  { name: '曜日', items: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], loop: true },
  {
    name: '月',
    items: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    loop: true,
  },
  { name: '順番', items: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'], loop: false },
]

export type SeqQ = { word: string; dir: 'next' | 'prev'; choices: string[]; answer: number; seq: string }

export function makeSeqQ(rng: Rng = Math.random): SeqQ {
  const seq = SEQUENCES[Math.floor(rng() * SEQUENCES.length)]
  const n = seq.items.length
  const dir: 'next' | 'prev' = rng() < 0.5 ? 'next' : 'prev'
  // ループしない並び（序数）は端を出さない
  const lo = seq.loop ? 0 : dir === 'prev' ? 1 : 0
  const hi = seq.loop ? n : dir === 'next' ? n - 1 : n
  const i = lo + Math.floor(rng() * (hi - lo))
  const j = (i + (dir === 'next' ? 1 : -1) + n) % n
  const correct = seq.items[j]
  const wrong = shuffle(seq.items.filter((_, k) => k !== j && k !== i), rng).slice(0, 3)
  const choices = shuffle([correct, ...wrong], rng)
  return { word: seq.items[i], dir, choices, answer: choices.indexOf(correct), seq: seq.name }
}
