// ガチャの「きょうの1回目」：その日はじめて引いたときはカプセルがキラキラ
const KEY = 'eitan:gacha-first-day'

export function loadFirstPullDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

// 今日はじめての1回なら true を返して、今日を記録する
export function takeFirstPull(today: string): boolean {
  if (loadFirstPullDay() === today) return false
  try {
    localStorage.setItem(KEY, today)
  } catch {
    // 保存できなくても続ける
  }
  return true
}
