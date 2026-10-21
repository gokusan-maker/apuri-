// 仲間（複数の相棒）。節目でタマゴがもらえ、相棒を切り替えられる。
import { feed, loadMonster, sanitizeMonster, type MonsterState } from './monster'

export type Party = {
  active: number
  members: MonsterState[]
  gacha?: number // ガチャで引いたタマゴの数（節目のタマゴとは別に数える）
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
  if (p.members.length - (p.gacha ?? 0) >= total) return p
  const members = [...p.members]
  while (members.length - (p.gacha ?? 0) < total) members.push({ xp: 0 })
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
      return gacha ? { active, members, gacha } : { active, members }
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
