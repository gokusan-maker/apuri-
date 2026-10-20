// 神経衰弱：英語と日本語のカードをめくってペアを作る
import { shuffle, type Rng } from './quiz'
import type { Word } from './words'

export type MemCard = { key: string; wordId: string; text: string; lang: 'en' | 'ja' }

export function makeDeck(words: Word[], pairs = 6, rng: Rng = Math.random): MemCard[] {
  const picked = shuffle(words, rng).slice(0, pairs)
  return shuffle(
    picked.flatMap((w) => [
      { key: `${w.id}:en`, wordId: w.id, text: w.en, lang: 'en' as const },
      { key: `${w.id}:ja`, wordId: w.id, text: w.ja, lang: 'ja' as const },
    ]),
    rng,
  )
}

export const isPair = (a: MemCard, b: MemCard) => a.wordId === b.wordId && a.lang !== b.lang
