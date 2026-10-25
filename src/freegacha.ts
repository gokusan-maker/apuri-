// ガチャは1日1回無料（オーナーの要望）。無料で引いた日を保存する
const KEY = 'eitan:gacha-free-day'
export function loadFreeGachaDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveFreeGachaDay(day: string) {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // 保存できなくても続ける
  }
}
