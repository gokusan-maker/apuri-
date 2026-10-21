// 英語すごろく：1日1回サイコロ。止まったマスの問題に正解すると進める。ゴールで🎟1
export const BOARD = 20
export type Sugoroku = { pos: number; day: string; laps: number }
const KEY = 'eitan:sugoroku'

export function loadSugoroku(): Sugoroku {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<Sugoroku> | null
    const n = (x: unknown, max: number) => (typeof x === 'number' && x > 0 ? Math.min(Math.floor(x), max) : 0)
    return { pos: n(v?.pos, BOARD - 1), day: typeof v?.day === 'string' ? v.day : '', laps: n(v?.laps, 9999) }
  } catch {
    return { pos: 0, day: '', laps: 0 }
  }
}
export function saveSugoroku(s: Sugoroku): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// r は 0〜1 の乱数 → 1〜6
export const rollDice = (r: number) => Math.min(6, Math.floor(r * 6) + 1)

// 正解なら進む（ゴールしたら0にもどって laps+1）。まちがいなら進まない
export function moveAfter(s: Sugoroku, dice: number, ok: boolean, day: string): { next: Sugoroku; goal: boolean } {
  if (!ok) return { next: { ...s, day }, goal: false }
  const to = s.pos + dice
  if (to >= BOARD) return { next: { pos: 0, day, laps: s.laps + 1 }, goal: true }
  return { next: { ...s, pos: to, day }, goal: false }
}
