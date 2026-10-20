// 初回だけの案内。すでに学習したことがある人には出さない
const KEY = 'eitan:onboarded'

export function loadOnboarded(): boolean {
  try {
    if (localStorage.getItem(KEY) === '1') return true
    const p = localStorage.getItem('eitan:progress')
    return p !== null && p !== '{}'
  } catch {
    return true
  }
}

export function saveOnboarded(v: boolean): void {
  try {
    if (v) localStorage.setItem(KEY, '1')
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
