// チケットのレア度（オーナーの要望）：🎟ふつう・💎レア（レア以上確定）・🌟スーパーレア（スーパーレア以上確定）
// 学習で正解すると、ときどきチケットが出る（出ないときもある）。1日3まいまで
import { TICKET_MAX } from './gacha'
import type { Wallet } from './shop'

export type TicketTier = 'normal' | 'rare' | 'sr'
export const TICKET_DROP_RATE = 0.04 // 正解1回あたりチケットが出る確率
export const TICKET_DROPS_PER_DAY = 3
export const TIER_INFO: Record<TicketTier, { icon: string; name: string; note: string }> = {
  normal: { icon: '🎟', name: 'チケット', note: 'ガチャを1回' },
  rare: { icon: '💎', name: 'レアチケット', note: 'レア以上確定' },
  sr: { icon: '🌟', name: 'SRチケット', note: 'スーパーレア以上確定' },
}

// 正解したとき：出るかどうかと、出たときのレア度（r1 で出るか、r2 でレア度）
export function ticketDrop(r1: number, r2: number): TicketTier | null {
  if (r1 >= TICKET_DROP_RATE) return null
  return r2 < 0.06 ? 'sr' : r2 < 0.3 ? 'rare' : 'normal'
}

export function addTierTicket(w: Wallet, tier: TicketTier): Wallet {
  if (tier === 'normal') return { ...w, tickets: Math.min((w.tickets ?? 0) + 1, TICKET_MAX) }
  if (tier === 'rare') return { ...w, rareTickets: Math.min((w.rareTickets ?? 0) + 1, TICKET_MAX) }
  return { ...w, srTickets: Math.min((w.srTickets ?? 0) + 1, TICKET_MAX) }
}

const KEY = 'eitan:ticket-drops'
export function loadDrops(): { day: string; count: number } {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as { day?: unknown; count?: unknown } | null
    return v && typeof v.day === 'string' && typeof v.count === 'number' ? { day: v.day, count: v.count } : { day: '', count: 0 }
  } catch {
    return { day: '', count: 0 }
  }
}
export function saveDrops(v: { day: string; count: number }) {
  try {
    localStorage.setItem(KEY, JSON.stringify(v))
  } catch {
    // 保存できなくても続ける
  }
}
export const dropsLeft = (d: { day: string; count: number }, today: string) => TICKET_DROPS_PER_DAY - (d.day === today ? d.count : 0)
