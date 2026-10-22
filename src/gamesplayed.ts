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
