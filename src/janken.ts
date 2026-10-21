// 相棒とじゃんけん：1日3回。勝つと🪙1、あいこは回数にふくめない
export const HANDS = [
  { id: 'rock', icon: '✊', name: 'グー' },
  { id: 'scissors', icon: '✌️', name: 'チョキ' },
  { id: 'paper', icon: '🖐', name: 'パー' },
] as const
export type Hand = 0 | 1 | 2 // HANDS の番号
export const JANKEN_PER_DAY = 3
export const JANKEN_COINS = 1

// 0: あいこ、1: 勝ち、-1: 負け（グーはチョキに勝つ…）
export function judge(me: Hand, partner: Hand): 0 | 1 | -1 {
  if (me === partner) return 0
  return (me + 1) % 3 === partner ? 1 : -1
}

export const handOf = (r: number): Hand => Math.min(2, Math.floor(r * 3)) as Hand

export type JankenLog = { day: string; count: number }
const KEY = 'eitan:janken'
export function loadJanken(day: string): JankenLog {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<JankenLog> | null
    return v && v.day === day && typeof v.count === 'number' ? { day, count: Math.max(0, Math.floor(v.count)) } : { day, count: 0 }
  } catch {
    return { day, count: 0 }
  }
}
export function saveJanken(l: JankenLog): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(l))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
