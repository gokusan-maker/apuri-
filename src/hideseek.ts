// 相棒のかくれんぼ：1日1回。9マスのどこかにかくれた相棒を3回以内で見つけると🪙3
export const HIDE_CELLS = 9
export const HIDE_TRIES = 3
export const HIDE_COINS = 3
const KEY = 'eitan:hideseek'

export function loadHideDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveHideDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
// r は 0〜1 の乱数 → かくれる場所
export const hideSpot = (r: number) => Math.min(HIDE_CELLS - 1, Math.floor(r * HIDE_CELLS))
// 近さのヒント（たて・よこのマスの距離）
export function hint(guess: number, spot: number): string {
  const d = Math.abs((guess % 3) - (spot % 3)) + Math.abs(Math.floor(guess / 3) - Math.floor(spot / 3))
  return d === 1 ? 'すぐ近くにいる気がする…！' : 'このあたりにはいないみたい'
}
