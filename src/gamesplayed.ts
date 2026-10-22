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
export function markPlayedGame(key: string): void {
  const list = loadPlayedGames()
  if (list.includes(key)) return
  try {
    localStorage.setItem(KEY, JSON.stringify([...list, key]))
  } catch {
    // 保存できなくても続ける
  }
}
