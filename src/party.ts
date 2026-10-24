// 仲間（複数の相棒）。節目でタマゴがもらえ、相棒を切り替えられる。
import { feed, loadMonster, sanitizeMonster, type MonsterState } from './monster'

export type Party = {
  active: number
  members: MonsterState[]
  gacha?: number // ガチャで引いたタマゴの数（節目のタマゴとは別に数える）
  released?: number // なかま交換所でおわかれした節目のタマゴの数（もう一度もらえないように）
}

// タマゴがもらえる節目（バッジid）。1匹目ははじめから。
export const EGG_MILESTONES: { badge: string; label: string }[] = [
  { badge: 'learned-50', label: '50語定着' },
  { badge: 'streak-7', label: '7日連続' },
  { badge: 'learned-100', label: '100語定着' },
]

const STORAGE_KEY = 'eitan:party'

export function eggsEarned(earned: Record<string, string>): number {
  return 1 + EGG_MILESTONES.filter((m) => earned[m.badge]).length
}

// もらえる数に足りなければ新しいタマゴを足す
export function addEggs(p: Party, total: number): Party {
  const have = (n: number) => n - (p.gacha ?? 0) + (p.released ?? 0)
  if (have(p.members.length) >= total) return p
  const members = [...p.members]
  while (have(members.length) < total) members.push({ xp: 0 })
  return { ...p, members }
}

export function updateActive(p: Party, m: MonsterState): Party {
  return { ...p, members: p.members.map((x, i) => (i === p.active ? m : x)) }
}

// 相棒以外の仲間も、おるすばんで少しずつ育つ（もらったXPの1割、最低1）
export const HELPER_RATE = 0.1

export function helperXp(amount: number): number {
  return amount > 0 ? Math.max(1, Math.round(amount * HELPER_RATE)) : 0
}

export function feedHelpers(p: Party, amount: number, today: string): Party {
  const x = helperXp(amount)
  if (!x || p.members.length < 2) return p
  return { ...p, members: p.members.map((m, i) => (i === p.active ? m : feed(m, x, null, today))) }
}

export function loadParty(): Party {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as Partial<Party>) : null
    if (v && Array.isArray(v.members) && v.members.length > 0) {
      const members = v.members.map(sanitizeMonster)
      const active = typeof v.active === 'number' && v.active >= 0 && v.active < members.length ? v.active : 0
      const gacha = typeof v.gacha === 'number' && v.gacha > 0 ? Math.min(v.gacha, members.length - 1) : 0
      const released = typeof v.released === 'number' && v.released > 0 ? Math.floor(v.released) : 0
      return { active, members, ...(gacha ? { gacha } : {}), ...(released ? { released } : {}) }
    }
  } catch {
    // 壊れていたら旧形式から作り直す
  }
  // 旧形式（eitan:monster の1匹だけ）から移行
  return { active: 0, members: [loadMonster()] }
}

export function saveParty(p: Party): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// おきにいりを切りかえる（並び順そのものは変えないので、相棒の番号はそのまま）
export function toggleFav(p: Party, i: number): Party {
  return {
    ...p,
    members: p.members.map((m, j) => {
      if (j !== i) return m
      const c = { ...m }
      if (c.fav) delete c.fav
      else c.fav = true
      return c
    }),
  }
}

// なかま一覧の表示順：おきにいりが先、あとは元の順
export function displayOrder(p: Party): number[] {
  const idx = p.members.map((_, i) => i)
  return [...idx.filter((i) => p.members[i].fav), ...idx.filter((i) => !p.members[i].fav)]
}

// なかま交換所：相棒・おきにいり以外の子とおわかれして、コインにかえる（レベルが高いほど多い）
export const releaseCoins = (level: number) => Math.min(100, 10 + level * 2)

export function canRelease(p: Party, i: number): boolean {
  return p.members.length > 1 && i !== p.active && !p.members[i]?.fav
}

export function releaseMember(p: Party, i: number): Party | null {
  if (!canRelease(p, i)) return null
  const members = p.members.filter((_, j) => j !== i)
  const active = i < p.active ? p.active - 1 : p.active
  const gacha = p.gacha ?? 0
  // ガチャの子から先に数を減らす。ガチャの子がいなければ節目のタマゴとして記録（もう一度もらえないように）
  const next: Party = { active, members }
  if (gacha > 1) next.gacha = gacha - 1
  const released = (p.released ?? 0) + (gacha > 0 ? 0 : 1)
  if (released) next.released = released
  return next
}

// キャラクター交換：仲間（相棒・おきにいり★以外）10体で、ガチャチケット1まいと交換（オーナー要望）
export const MEMBERS_FOR_TICKET = 10
export const tradeableMembers = (p: Party): number[] => p.members.map((_, i) => i).filter((i) => canRelease(p, i))
export function tradeMembers(p: Party): Party | null {
  const eggs = tradeableMembers(p)
  if (eggs.length < MEMBERS_FOR_TICKET) return null
  // あとから来た子から順に（うしろから消すと番号がずれない）
  let next: Party | null = p
  for (const i of eggs.slice(-MEMBERS_FOR_TICKET).reverse()) {
    next = next && releaseMember(next, i)
  }
  return next
}

// タマゴあたため：まだ生まれていない仲間をあたためると XP+2（1日5回まで、全部の仲間で合わせて）
export const WARM_XP = 2
export const WARM_PER_DAY = 5
export type WarmLog = { day: string; count: number }
const WARM_KEY = 'eitan:warm'
export const warmLeft = (l: WarmLog, today: string) => WARM_PER_DAY - (l.day === today ? l.count : 0)
export const nextWarm = (l: WarmLog, today: string): WarmLog => ({ day: today, count: (l.day === today ? l.count : 0) + 1 })
export function loadWarm(): WarmLog {
  try {
    const v = JSON.parse(localStorage.getItem(WARM_KEY) ?? 'null') as WarmLog | null
    return v && typeof v.day === 'string' && typeof v.count === 'number' ? v : { day: '', count: 0 }
  } catch {
    return { day: '', count: 0 }
  }
}
export function saveWarm(l: WarmLog): void {
  try {
    localStorage.setItem(WARM_KEY, JSON.stringify(l))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
