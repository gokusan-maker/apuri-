// タマゴガチャ：コイン（勉強でたまる）で新しいタマゴを引く。色ちがいが出ることもある
import { kindOf, rollKind, rollSpecies, type Kind, type Species } from './monster'
import type { Party } from './party'
import type { Wallet } from './shop'

export const GACHA_PRICE = 50
export const PARTY_MAX = 12

export const TICKET_MAX = 9
export const PITY = 20 // スーパーレア以上が出ないまま20回目なら、きんいろが確定

export const pityLeft = (w: Wallet) => PITY - (w.pity ?? 0)

// ゴールデンタイム：毎日19時台はガチャが安い
export const GOLDEN_PRICE = 40
export const isGoldenHour = (hour: number) => hour === 19
export const gachaPrice = (hour: number) => (isGoldenHour(hour) ? GOLDEN_PRICE : GACHA_PRICE)

export function canDraw(w: Wallet, p: Party, ticket = false, price = GACHA_PRICE): boolean {
  return (ticket ? (w.tickets ?? 0) > 0 : w.coins >= price) && p.members.length < PARTY_MAX
}

// 7日連続で学習するとガチャチケットが1枚もらえる（最大9枚）
export function addTicket(w: Wallet): Wallet {
  return { ...w, tickets: Math.min((w.tickets ?? 0) + 1, TICKET_MAX) }
}

// 引けたら、コインを減らしてタマゴを仲間に加える
// ticket=true のときはコインのかわりにチケットを1枚使う
// r は色ちがい、r2 はキャラクターの種類を決める乱数
export function drawEgg(w: Wallet, p: Party, r: number, ticket = false, r2 = 0, dragonUp = false, pickup?: string, rareSure = false, price = GACHA_PRICE): { wallet: Wallet; party: Party; kind: Kind; species: Species } | null {
  if (!canDraw(w, p, ticket, price)) return null
  const first = rollKind(r)
  // レア以上確定のときは、ふつうが出たら3つのレア色のどれかにする
  const rolled = rareSure && first.rarity === 'N' ? KINDS_R[Math.min(2, Math.floor((r / 0.6) * 3))] : first
  const kind = rolled.rarity === 'N' || rolled.rarity === 'R' ? ((w.pity ?? 0) + 1 >= PITY ? kindOf('kin') : rolled) : rolled
  const pity = kind.rarity === 'SR' || kind.rarity === 'UR' ? 0 : (w.pity ?? 0) + 1
  const species = rollSpecies(r2, dragonUp, pickup)
  const egg = { xp: 0, ...(kind.id === 'normal' ? {} : { kind: kind.id }), ...(species.id === 'mochi' ? {} : { species: species.id }) }
  const paid = ticket ? { ...w, tickets: (w.tickets ?? 1) - 1 } : { ...w, coins: w.coins - price }
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

// ガチャを開ける前の「確定演出」のひとこと（レア度で光と文が変わる。ふつうは無し）
export function gachaOmen(rarity: Kind['rarity']): string | null {
  if (rarity === 'R') return 'キラッ！ 色ちがいの予感…'
  if (rarity === 'SR') return '金色の光…！？ スーパーレア確定！'
  if (rarity === 'UR') return '虹色の光！！ ウルトラレア確定！！'
  return null
}

// かぶりボーナス：同じキャラ・同じ色の子がもう仲間にいたら、コインが少しもどる
export const DUP_REFUND = 15

export function isDuplicate(members: Party['members'], species: string, kind: string): boolean {
  return members.some((m) => (m.species ?? 'mochi') === species && (m.kind ?? 'normal') === kind)
}

const KINDS_R = ['sakura', 'umi', 'yoru'].map(kindOf)
export const RARE_FULL_COINS = 50 // レアボスに勝ったが仲間がいっぱいのとき

// レアボスのごほうび：色ちがい確定のタマゴ（仲間がいっぱいなら null）
export function rareEgg(p: Party, r: number, r2: number): { party: Party; kind: Kind; species: Species } | null {
  if (p.members.length >= PARTY_MAX) return null
  const kind = r < 0.7 ? KINDS_R[Math.min(2, Math.floor((r / 0.7) * 3))] : r < 0.95 ? kindOf('kin') : kindOf('niji')
  const species = rollSpecies(r2)
  const egg = { xp: 0, kind: kind.id, ...(species.id === 'mochi' ? {} : { species: species.id }) }
  return { party: { ...p, members: [...p.members, egg] }, kind, species }
}

// ステップアップ：その日の3回目ごとのガチャはレア以上確定
export const STEP_EVERY = 3
export type GachaStep = { day: string; count: number }
const STEP_KEY = 'eitan:gacha-step'

export function loadStep(): GachaStep {
  try {
    const v = JSON.parse(localStorage.getItem(STEP_KEY) ?? 'null') as GachaStep | null
    return v && typeof v.day === 'string' && typeof v.count === 'number' ? v : { day: '', count: 0 }
  } catch {
    return { day: '', count: 0 }
  }
}

export function saveStep(s: GachaStep): void {
  try {
    localStorage.setItem(STEP_KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export const todaySteps = (s: GachaStep, today: string) => (s.day === today ? s.count : 0)
// 次の1回がレア以上確定か／あと何回で確定か（次が確定なら 0）
export const stepLeft = (s: GachaStep, today: string) => STEP_EVERY - 1 - (todaySteps(s, today) % STEP_EVERY)
export const nextStep = (s: GachaStep, today: string): GachaStep => ({ day: today, count: todaySteps(s, today) + 1 })

// おまけカプセル：5回に1回くらい、🪙10 か おやつ（XP+20）がおまけでつく
export const BONUS_RATE = 0.2
export type GachaBonus = { kind: 'coins' | 'xp'; amount: number; text: string }
export function bonusOf(r: number): GachaBonus | null {
  if (r >= BONUS_RATE) return null
  return r < BONUS_RATE / 2 ? { kind: 'coins', amount: 10, text: '🪙10' } : { kind: 'xp', amount: 20, text: '🍪 おやつ（XP+20）' }
}

// ガチャの記録：引いた回数とレア度ごとの数
export type GachaStats = { total: number; N: number; R: number; SR: number; UR: number }
const STATS_KEY = 'eitan:gacha-stats'
export const emptyStats = (): GachaStats => ({ total: 0, N: 0, R: 0, SR: 0, UR: 0 })

export function loadGachaStats(): GachaStats {
  try {
    const v = JSON.parse(localStorage.getItem(STATS_KEY) ?? 'null') as Partial<GachaStats> | null
    const n = (x: unknown) => (typeof x === 'number' && x > 0 ? Math.floor(x) : 0)
    return v ? { total: n(v.total), N: n(v.N), R: n(v.R), SR: n(v.SR), UR: n(v.UR) } : emptyStats()
  } catch {
    return emptyStats()
  }
}

export function saveGachaStats(s: GachaStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export const addStats = (s: GachaStats, rarities: Kind['rarity'][]): GachaStats =>
  rarities.reduce((a, r) => ({ ...a, total: a.total + 1, [r]: a[r] + 1 }), s)
