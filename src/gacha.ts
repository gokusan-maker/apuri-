// タマゴガチャ：コイン（勉強でたまる）で新しいタマゴを引く。色ちがいが出ることもある
import { kindOf, rollKind, rollSpecies, type Kind, type Species } from './monster'
import type { Party } from './party'
import type { Wallet } from './shop'

export const GACHA_PRICE = 50
export const PARTY_MAX = 12

export const TICKET_MAX = 9
export const PITY = 20 // スーパーレア以上が出ないまま20回目なら、きんいろが確定

export const pityLeft = (w: Wallet) => PITY - (w.pity ?? 0)

export function canDraw(w: Wallet, p: Party, ticket = false): boolean {
  return (ticket ? (w.tickets ?? 0) > 0 : w.coins >= GACHA_PRICE) && p.members.length < PARTY_MAX
}

// 7日連続で学習するとガチャチケットが1枚もらえる（最大9枚）
export function addTicket(w: Wallet): Wallet {
  return { ...w, tickets: Math.min((w.tickets ?? 0) + 1, TICKET_MAX) }
}

// 引けたら、コインを減らしてタマゴを仲間に加える
// ticket=true のときはコインのかわりにチケットを1枚使う
// r は色ちがい、r2 はキャラクターの種類を決める乱数
export function drawEgg(w: Wallet, p: Party, r: number, ticket = false, r2 = 0, dragonUp = false): { wallet: Wallet; party: Party; kind: Kind; species: Species } | null {
  if (!canDraw(w, p, ticket)) return null
  const rolled = rollKind(r)
  const kind = rolled.rarity === 'N' || rolled.rarity === 'R' ? ((w.pity ?? 0) + 1 >= PITY ? kindOf('kin') : rolled) : rolled
  const pity = kind.rarity === 'SR' || kind.rarity === 'UR' ? 0 : (w.pity ?? 0) + 1
  const species = rollSpecies(r2, dragonUp)
  const egg = { xp: 0, ...(kind.id === 'normal' ? {} : { kind: kind.id }), ...(species.id === 'mochi' ? {} : { species: species.id }) }
  const paid = ticket ? { ...w, tickets: (w.tickets ?? 1) - 1 } : { ...w, coins: w.coins - GACHA_PRICE }
  return { wallet: { ...paid, pity }, party: { ...p, members: [...p.members, egg], gacha: (p.gacha ?? 0) + 1 }, kind, species }
}

// 最近のガチャの結果（新しい順に10回まで）
export type GachaLog = { day: string; kind: string; species: string }[]
const LOG_KEY = 'eitan:gacha-log'

export function loadGachaLog(): GachaLog {
  try {
    const v = JSON.parse(localStorage.getItem(LOG_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is GachaLog[number] => !!x && typeof x.day === 'string' && typeof x.kind === 'string' && typeof x.species === 'string').slice(0, 10) : []
  } catch {
    return []
  }
}

export function pushGachaLog(log: GachaLog, entry: GachaLog[number]): GachaLog {
  const next = [entry, ...log].slice(0, 10)
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(next))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return next
}
