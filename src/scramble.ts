// 並べ替えクイズ：例文を単語に分けてバラバラにする
import { shuffle, type Rng } from './quiz'

export type Scramble = { words: string[]; end: string }

// 文末の記号（. ! ?）は答えに含めず、最後に表示する
export function split(sentence: string): Scramble {
  const m = sentence.trim().match(/^(.*?)([.!?]*)$/)!
  return { words: m[1].split(/\s+/).filter(Boolean), end: m[2] }
}

export function canScramble(sentence: string): boolean {
  const n = split(sentence).words.length
  return n >= 3 && n <= 9
}

// 元と同じ並びにならないように混ぜる
export function scramble(words: string[], rng: Rng = Math.random): string[] {
  if (new Set(words).size < 2) return [...words]
  for (let i = 0; i < 10; i++) {
    const s = shuffle(words, rng)
    if (s.join(' ') !== words.join(' ')) return s
  }
  return [...words].reverse()
}

export function isCorrectOrder(answer: string[], words: string[]): boolean {
  return answer.join(' ') === words.join(' ')
}
