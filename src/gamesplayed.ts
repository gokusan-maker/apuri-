// 一度でも遊んだゲーム（タイルの NEW 印を消すため）
const KEY = 'eitan:games-played'
export function loadPlayedGames(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
// 今日あそんだゲーム（タイルの「✅ 今日」印）
const TODAY_KEY = 'eitan:games-today'
export function loadTodayGames(day: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(TODAY_KEY) ?? 'null') as { day?: unknown; keys?: unknown } | null
    if (v && v.day === day && Array.isArray(v.keys)) return v.keys.filter((x): x is string => typeof x === 'string')
  } catch {
    // こわれていたら空から
  }
  return []
}
export function markTodayGame(key: string, day: string): void {
  const keys = loadTodayGames(day)
  if (keys.includes(key)) return
  try {
    localStorage.setItem(TODAY_KEY, JSON.stringify({ day, keys: [...keys, key] }))
  } catch {
    // 保存できなくても続ける
  }
}
export function markPlayedGame(key: string): void {
  const list = loadPlayedGames()
  if (list.includes(key)) return
  try {
    localStorage.setItem(KEY, JSON.stringify([...list, key]))
  } catch {
    // 保存できなくても続ける
  }
}

// 文法ゲームを1日に全部あそんだごほうび（1日1回）
export const ALL_GAMES_COINS = 10
// 単語ゲームは1日に5しゅるいあそぶとごほうび
export const WORD_GAMES_GOAL = 5
export const WORD_GAMES_COINS = 5
const CLAIM_KEYS = { grammar: 'eitan:all-games-day', word: 'eitan:word-games-day' }
export function allGamesClaimed(day: string, kind: 'grammar' | 'word' = 'grammar'): boolean {
  try {
    return localStorage.getItem(CLAIM_KEYS[kind]) === day
  } catch {
    return false
  }
}
export function claimAllGames(day: string, kind: 'grammar' | 'word' = 'grammar'): void {
  try {
    localStorage.setItem(CLAIM_KEYS[kind], day)
  } catch {
    // 保存できなくても続ける
  }
}
