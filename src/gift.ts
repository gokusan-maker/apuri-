// 相棒のおみやげ：1日の目標を達成すると、次の日に相棒がおみやげのシールをくれる
const KEY = 'eitan:partner-gift'

// 目標を達成した日（まだおみやげを受け取っていない日）
export function loadGiftDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveGiftDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
// 目標を達成した日より後の日なら受け取れる
export const giftReady = (giftDay: string, today: string) => giftDay !== '' && giftDay < today
