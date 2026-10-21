// 日替わりの「今日のおすすめクイズ」：その日はじめての正解でボーナスXP
export const FEATURED_XP = 10
const KEY = 'eitan:featured'

// 音声認識が要らない種類から、日付で1つ選ぶ（同じ日は同じ）
export const FEATURED_POOL = ['en-ja', 'ja-en', 'listen', 'spell', 'blank', 'order', 'define', 'emoji', 'emoji-rev', 'emoji-ear', 'numbers', 'irregular', 'tiles', 'sentence', 'dictation', 'abc', 'opposite', 'odd', 'count', 'clock', 'color', 'alphabet', 'calc', 'plural', 'past-ed', 'compare', 'memory', 'bingo', 'third', 'ing', 'wordsearch', 'be', 'article', 'timeprep', 'wh', 'gmix', 'riddle', 'neg', 'homophone', 'placeprep', 'modal']

export function featuredFor(day: string): string {
  let h = 7
  for (const c of day) h = (h * 33 + c.charCodeAt(0)) >>> 0
  return FEATURED_POOL[h % FEATURED_POOL.length]
}

export function featuredClaimed(day: string): boolean {
  try {
    return localStorage.getItem(KEY) === day
  } catch {
    return false
  }
}

export function claimFeatured(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
