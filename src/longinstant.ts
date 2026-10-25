// 長文・城の読解：1問ずつ答えと解説を出す（はじめから入。オフにしたら覚えておく）
const KEY = 'eitan:long-instant'
export function loadInstant(): boolean {
  try {
    return localStorage.getItem(KEY) !== '0'
  } catch {
    return true
  }
}
export function saveInstant(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? '1' : '0')
  } catch {
    /* 保存できなくても動く */
  }
}
