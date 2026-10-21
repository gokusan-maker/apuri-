// ステージクリアの宝箱：コインが多め、ときどきおやつ（XP）、★3のときだけまれにガチャチケット
export type Treasure = { kind: 'coins' | 'xp' | 'ticket'; amount: number; text: string }

export const TICKET_CHANCE = 0.05
export const XP_CHANCE = 0.3

export function openTreasure(stars: number, r: number): Treasure {
  if (stars >= 3 && r < TICKET_CHANCE) return { kind: 'ticket', amount: 1, text: '🎟 ガチャチケット！' }
  if (r < TICKET_CHANCE + XP_CHANCE) {
    const xp = 10 * stars
    return { kind: 'xp', amount: xp, text: `🍪 おやつ（XP+${xp}）` }
  }
  const coins = 2 + stars * 2
  return { kind: 'coins', amount: coins, text: `🪙 コイン ${coins}まい` }
}

// 金の宝箱：ボスをたおすと鍵が1つ。3つでガチャチケット確定＋🪙30
export const KEYS_FOR_GOLD = 3
export const GOLD_COINS = 30
const KEY_KEY = 'eitan:keys'
export function loadKeys(): number {
  try {
    const n = Number(localStorage.getItem(KEY_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), 99) : 0
  } catch {
    return 0
  }
}
export function saveKeys(n: number): void {
  try {
    localStorage.setItem(KEY_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
