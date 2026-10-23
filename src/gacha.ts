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
export function drawEgg(w: Wallet, p: Party, r: number, ticket = false, r2 = 0, dragonUp = false, pickup?: string, rareSure = false, price = GACHA_PRICE, seasonal?: string, boost?: string): { wallet: Wallet; party: Party; kind: Kind; species: Species } | null {
  if (!canDraw(w, p, ticket, price)) return null
  const first = rollKind(r)
  // レア以上確定のときは、ふつうが出たら3つのレア色のどれかにする
  const rolled = rareSure && first.rarity === 'N' ? KINDS_R[Math.min(2, Math.floor((r / 0.6) * 3))] : first
  // 季節ガチャ：その時期は、さくら色のかわりに季節限定の色が出る
  // 今日のおすすめ色：レアが出たとき半分くらいはその色になる
  const boosted = boost && rolled.rarity === 'R' && Math.floor(r * 1000) % 2 === 0 ? kindOf(boost) : rolled
  const seasonRolled = seasonal && boosted.id === 'sakura' ? kindOf(seasonal) : boosted
  const kind = seasonRolled.rarity === 'N' || seasonRolled.rarity === 'R' ? ((w.pity ?? 0) + 1 >= PITY ? kindOf('kin') : seasonRolled) : seasonRolled
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

// ラッキーナンバー：通算の回数が7の倍数のときおまけ
export const LUCKY_EVERY = 7
export const LUCKY_COINS = 7
export const isLuckyPull = (n: number) => n > 0 && n % LUCKY_EVERY === 0

// 5連ガチャ：5回目までにレア以上が出なければ、最後の1回はレア以上確定
export const MULTI5 = 5

// コンプリート率（％・切り捨て）
export const completionPct = (have: number, total: number) => (total > 0 ? Math.floor((Math.min(have, total) / total) * 100) : 0)

// スロット演出：ガチャを引くたびに3つの絵がまわる。そろう（4%）とおまけ🪙5
export const SLOT_SYMBOLS = ['🍒', '🔔', '⭐', '🍀', '💎'] as const
export const SLOT_RATE = 0.04
export const SLOT_COINS = 5
export function slotOf(r: number): { reels: string[]; win: boolean } {
  const n = SLOT_SYMBOLS.length
  if (r < SLOT_RATE) {
    const s = SLOT_SYMBOLS[Math.min(n - 1, Math.floor((r / SLOT_RATE) * n))]
    return { reels: [s, s, s], win: true }
  }
  // そろわないとき：1つ目と3つ目はかならずちがう絵にする
  const a = Math.floor(r * n) % n
  const b = Math.floor(r * n * n) % n
  const c = (a + 1 + (Math.floor(r * n * n * n) % (n - 1))) % n
  return { reels: [SLOT_SYMBOLS[a], SLOT_SYMBOLS[b], SLOT_SYMBOLS[c]], win: false }
}

// 季節ガチャ：10月はかぼちゃ色、12月はゆき色が出る（day は YYYY-MM-DD）
export function seasonalKindOf(day: string): string | undefined {
  const m = Number(day.slice(5, 7))
  return m === 10 ? 'pumpkin' : m === 12 ? 'snow' : undefined
}

// ガチャの結果をシェアするための文
export function gachaShareText(items: { kindName: string; normal: boolean; speciesName: string; rarity: string }[]): string {
  const names = items.map((k) => `${k.normal ? '' : `${k.kindName}の`}${k.speciesName}（${k.rarity}）`)
  return `イングリッシュモンスターのガチャで ${names.join('・')} が出た！`
}

// ガチャポイント交換所：ガチャ1回で1ポイント。20ポイントでスーパーレア以上確定のタマゴ
export const POINTS_FOR_SR = 20
const POINT_KEY = 'eitan:gacha-points'
export function loadGachaPoints(): number {
  try {
    const n = Number(localStorage.getItem(POINT_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function saveGachaPoints(n: number): void {
  try {
    localStorage.setItem(POINT_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
// きんいろ85%・にじいろ15%（仲間がいっぱいなら null）
export function srEgg(p: Party, r: number, r2: number): { party: Party; kind: Kind; species: Species } | null {
  if (p.members.length >= PARTY_MAX) return null
  const kind = r < 0.85 ? kindOf('kin') : kindOf('niji')
  const species = rollSpecies(r2)
  const egg = { xp: 0, kind: kind.id, ...(species.id === 'mochi' ? {} : { species: species.id }) }
  return { party: { ...p, members: [...p.members, egg] }, kind, species }
}

// リーチ：そろわなかったけれど、はじめの2つが同じ絵
export const isReach = (s: { reels: string[]; win: boolean }) => !s.win && s.reels[0] === s.reels[1]

// きせかえカプセル：ふつうのカプセルの色を選べる（レア以上はレアの色が優先）
export const CAPSULE_COLORS = [
  { id: 'red', name: 'あか', color: '#f87171' },
  { id: 'green', name: 'みどり', color: '#4ade80' },
  { id: 'yellow', name: 'きいろ', color: '#facc15' },
  { id: 'pink', name: 'ピンク', color: '#f472b6' },
  { id: 'purple', name: 'むらさき', color: '#a78bfa' },
] as const
const CAPSULE_KEY = 'eitan:capsule-color'
export function loadCapsule(): string {
  try {
    const v = localStorage.getItem(CAPSULE_KEY) ?? 'red'
    return CAPSULE_COLORS.some((c) => c.id === v) ? v : 'red'
  } catch {
    return 'red'
  }
}
export function saveCapsule(id: string): void {
  try {
    localStorage.setItem(CAPSULE_KEY, id)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const capsuleColorOf = (id: string) => (CAPSULE_COLORS.find((c) => c.id === id) ?? CAPSULE_COLORS[0]).color

// ガチャの演出スキップ（短くする）設定
const FAST_KEY = 'eitan:gacha-fast'
export function loadGachaFast(): boolean {
  try {
    return localStorage.getItem(FAST_KEY) === '1'
  } catch {
    return false
  }
}
export function saveGachaFast(on: boolean): void {
  try {
    localStorage.setItem(FAST_KEY, on ? '1' : '0')
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 月に1回の福袋：🪙200で3連ガチャ＋バトルアイテム3つ
export const LUCKY_BAG_PRICE = 200
const BAG_MONTH_KEY = 'eitan:lucky-bag'
export function loadLuckyBagMonth(): string {
  try {
    return localStorage.getItem(BAG_MONTH_KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveLuckyBagMonth(m: string): void {
  try {
    localStorage.setItem(BAG_MONTH_KEY, m)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// ミステリーカプセル：10回に1回くらい、色の見えない？カプセルが出る（おまけ🪙3）
export const MYSTERY_RATE = 0.1
export const MYSTERY_COINS = 3

// 今日のおすすめ色（日替わりで、レアの3色のうち1色が出やすい）
export function dailyColor(day: string): string {
  let h = 11
  for (const c of `color-${day}`) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return ['sakura', 'umi', 'yoru'][h % 3]
}

// 色コンプボーナス：1つのキャラクターでふつうの6色（季節限定はのぞく）をそろえると🎟2（キャラクターごとに1回）
export const COLOR_COMPLETE_TICKETS = 2
const BASE_KINDS = ['normal', 'sakura', 'umi', 'yoru', 'kin', 'niji']
export function completedSpecies(members: { species?: string; kind?: string }[]): string[] {
  const got = new Map<string, Set<string>>()
  for (const m of members) {
    const sp = m.species ?? 'mochi'
    if (!got.has(sp)) got.set(sp, new Set())
    got.get(sp)!.add(m.kind ?? 'normal')
  }
  return [...got.entries()].filter(([, k]) => BASE_KINDS.every((b) => k.has(b))).map(([sp]) => sp)
}
const CC_KEY = 'eitan:color-complete'
export function loadColorComplete(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(CC_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveColorComplete(ids: string[]): void {
  try {
    localStorage.setItem(CC_KEY, JSON.stringify(ids))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// トリオボーナス：同じキャラ（種類）を3体以上そろえると🪙30（キャラごとに1回）
export const TRIO_COINS = 30
export function trioSpecies(members: { species?: string }[]): string[] {
  const n = new Map<string, number>()
  for (const m of members) n.set(m.species ?? 'mochi', (n.get(m.species ?? 'mochi') ?? 0) + 1)
  return [...n.entries()].filter(([, c]) => c >= 3).map(([sp]) => sp)
}
const TRIO_KEY = 'eitan:gacha-trio'
export function loadTrio(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(TRIO_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveTrio(ids: string[]): void {
  try {
    localStorage.setItem(TRIO_KEY, JSON.stringify(ids))
  } catch {
    // 保存できなくても続ける
  }
}

// レア以上が出たときの相棒のひとこと
export const rareCheer = (rarity: string) => (rarity === 'UR' ? 'うそ！ ウルトラレアだ！' : rarity === 'SR' ? 'すごい！ スーパーレアだ！' : 'やったね！ レアだ！')

// ガチャで出た子のあいさつ（種類ごとに決まる。自作の英語）
export const HELLO_LINES = [
  { en: 'Nice to meet you!', ja: 'はじめまして！' },
  { en: "Hi! Let's be friends!", ja: 'やあ！ なかよくしようね！' },
  { en: "I'm so happy to be here!", ja: 'ここに来られてうれしいな！' },
  { en: "Let's learn English together!", ja: 'いっしょに英語を学ぼう！' },
]
export function helloLine(speciesId: string): { en: string; ja: string } {
  const n = [...speciesId].reduce((a, c) => a + c.charCodeAt(0), 0)
  return HELLO_LINES[n % HELLO_LINES.length]
}
