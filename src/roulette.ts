// 毎日のルーレット：1日1回まわして、コインかおやつ（XP）が当たる
export type RoulettePrize = { kind: 'coins' | 'xp'; amount: number; label: string }

export const ROULETTE: RoulettePrize[] = [
  { kind: 'coins', amount: 1, label: '🪙1' },
  { kind: 'coins', amount: 3, label: '🪙3' },
  { kind: 'xp', amount: 10, label: '🍪XP+10' },
  { kind: 'coins', amount: 5, label: '🪙5' },
  { kind: 'coins', amount: 2, label: '🪙2' },
  { kind: 'xp', amount: 20, label: '🍪XP+20' },
  { kind: 'coins', amount: 10, label: '🪙10' },
  { kind: 'coins', amount: 4, label: '🪙4' },
]

// r は 0〜1 の乱数
export const spinRoulette = (r: number): number => Math.min(ROULETTE.length - 1, Math.max(0, Math.floor(r * ROULETTE.length)))

const KEY = 'eitan:roulette'
export function loadRouletteDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveRouletteDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
