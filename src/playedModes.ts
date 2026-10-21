// 遊んだことのあるクイズの種類（NEW マーク用）
const KEY = 'eitan:played-modes'

// 最近ふえた種類（遊ぶまで NEW を出す）
export const NEW_MODES = ['numbers', 'sounds', 'emoji', 'emoji-rev', 'emoji-ear', 'versus', 'abc', 'opposite', 'odd', 'count', 'clock', 'color', 'alphabet', 'calc', 'plural', 'past-ed', 'compare', 'memory', 'bingo', 'third', 'ing', 'wordsearch', 'twister', 'be', 'article', 'timeprep', 'wh', 'gmix', 'placement', 'riddle', 'neg', 'homophone', 'placeprep', 'modal', 'pronoun']

export function loadPlayed(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function markPlayed(list: string[], id: string): string[] {
  if (list.includes(id)) return list
  const next = [...list, id]
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return next
}

export const isNew = (id: string, played: string[]) => NEW_MODES.includes(id) && !played.includes(id)

// さいきん遊んだ種類（新しい順・最大3つ）
const RECENT_KEY = 'eitan:recent-modes'

export function loadRecent(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, 3) : []
  } catch {
    return []
  }
}

export function pushRecent(list: string[], id: string): string[] {
  const next = [id, ...list.filter((x) => x !== id)].slice(0, 3)
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return next
}
