// ホームの「🎮 きょうのあそび」をひらいたままにするか（端末ごとの見た目の好み）
const KEY = 'eitan:home-play-open'

export function loadPlayOpen(): boolean {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function savePlayOpen(open: boolean): void {
  try {
    localStorage.setItem(KEY, open ? '1' : '0')
  } catch {
    // 保存できなくても続ける
  }
}
