// タマゴガチャ：コイン（勉強でたまる）で新しいタマゴを引く。色ちがいが出ることもある
import { rollKind, type Kind } from './monster'
import type { Party } from './party'
import type { Wallet } from './shop'

export const GACHA_PRICE = 50
export const PARTY_MAX = 12

export const TICKET_MAX = 9

export function canDraw(w: Wallet, p: Party, ticket = false): boolean {
  return (ticket ? (w.tickets ?? 0) > 0 : w.coins >= GACHA_PRICE) && p.members.length < PARTY_MAX
}

// 7日連続で学習するとガチャチケットが1枚もらえる（最大9枚）
export function addTicket(w: Wallet): Wallet {
  return { ...w, tickets: Math.min((w.tickets ?? 0) + 1, TICKET_MAX) }
}

// 引けたら、コインを減らしてタマゴを仲間に加える
// ticket=true のときはコインのかわりにチケットを1枚使う
export function drawEgg(w: Wallet, p: Party, r: number, ticket = false): { wallet: Wallet; party: Party; kind: Kind } | null {
  if (!canDraw(w, p, ticket)) return null
  const kind = rollKind(r)
  const egg = kind.id === 'normal' ? { xp: 0 } : { xp: 0, kind: kind.id }
  return { wallet: ticket ? { ...w, tickets: (w.tickets ?? 1) - 1 } : { ...w, coins: w.coins - GACHA_PRICE }, party: { ...p, members: [...p.members, egg], gacha: (p.gacha ?? 0) + 1 }, kind }
}
