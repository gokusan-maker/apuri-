// 単語一覧の並べかえ
import type { ProgressMap } from './srs'
import type { Word } from './words'

export function sortWords(words: Word[], sort: 'none' | 'abc' | 'recent', progress: ProgressMap): Word[] {
  if (sort === 'abc') return [...words].sort((a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase()))
  if (sort === 'recent') {
    // はじめて学んだ日が新しい順。日付がないもの（まだ・古いデータ）はうしろ
    const f = (w: Word) => progress[w.id]?.first ?? ''
    return [...words].sort((a, b) => f(b).localeCompare(f(a)))
  }
  return words
}
