// タマゴガチャ：コイン（勉強でたまる）で新しいタマゴを引く。色ちがいが出ることもある
import { rollKind, type Kind } from './monster'
import type { Party } from './party'
import type { Wallet } from './shop'

export const GACHA_PRICE = 50
export const PARTY_MAX = 12

export function canDraw(w: Wallet, p: Party): boolean {
  return w.coins >= GACHA_PRICE && p.members.length < PARTY_MAX
}

// 引けたら、コインを減らしてタマゴを仲間に加える
export function drawEgg(w: Wallet, p: Party, r: number): { wallet: Wallet; party: Party; kind: Kind } | null {
  if (!canDraw(w, p)) return null
  const kind = rollKind(r)
  const egg = kind.id === 'normal' ? { xp: 0 } : { xp: 0, kind: kind.id }
  return { wallet: { ...w, coins: w.coins - GACHA_PRICE }, party: { ...p, members: [...p.members, egg], gacha: (p.gacha ?? 0) + 1 }, kind }
}
