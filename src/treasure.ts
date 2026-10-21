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
