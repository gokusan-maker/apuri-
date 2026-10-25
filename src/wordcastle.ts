// 単語の城：単語ステージ（10語）を1つの単元にして、5問×3階で登る。
// 1階目のはじめにその10語の解説（意味と例文）、1階目は前半5語・2階目は後半5語・3階目は10語から日本語→英語で5問
import { stagesOf, type Stage } from './stages'
import type { Level, Word } from './words'

export const WC_QS = 5
export const WC_PASS = 4

export type WcFloor = { id: string; label: string; sub: string; stage: Stage; floor: number; words: Word[]; direction: 'en-ja' | 'ja-en' }

export function wordCastleFloors(levels: Level[]): WcFloor[] {
  return levels.flatMap((lv) =>
    stagesOf(lv).flatMap((st) => {
      const name = `${st.level} 単元${st.no}`
      const a = st.words.slice(0, WC_QS)
      const b = st.words.slice(WC_QS)
      const review = st.words.filter((_, i) => i % 2 === 0).slice(0, WC_QS)
      const fl: [Word[], 'en-ja' | 'ja-en', string][] = [
        [a, 'en-ja', '📖 解説から'],
        [b.length > 0 ? b : a, 'en-ja', '英語→日本語'],
        [review.length > 0 ? review : a, 'ja-en', 'ふりかえり：日本語→英語'],
      ]
      return fl.map(([words, direction, sub], f) => ({ id: `wc:${st.id}:${f + 1}`, label: `${name}　${f + 1}/3`, sub, stage: st, floor: f, words, direction }))
    }),
  )
}

const KEY = 'eitan:wcastle'
export function loadWcClears(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveWcClears(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* 保存できなくても動く */
  }
}
