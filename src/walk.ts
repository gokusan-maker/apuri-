// モンスターのおさんぽ：1日1回。さんぽで単語を1つ拾ってきて🪙3
import type { Word } from './words'

export const WALK_COINS = 3
const KEY = 'eitan:walk'

export function loadWalkDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveWalkDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// r は 0〜1 の乱数
export const walkFind = (words: Word[], r: number): Word | undefined => (words.length ? words[Math.min(words.length - 1, Math.floor(r * words.length))] : undefined)

const PLACES = ['公園', '川原', '商店街', '図書館の前', '森の小道']
export const walkPlace = (r: number) => PLACES[Math.min(PLACES.length - 1, Math.floor(r * PLACES.length))]
