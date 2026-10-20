// 仲間（複数の相棒）。節目でタマゴがもらえ、相棒を切り替えられる。
import { cleanName, loadMonster, type MonsterState } from './monster'

export type Party = {
  active: number
  members: MonsterState[]
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
  if (p.members.length >= total) return p
  const members = [...p.members]
  while (members.length < total) members.push({ xp: 0 })
  return { ...p, members }
}

export function updateActive(p: Party, m: MonsterState): Party {
  return { ...p, members: p.members.map((x, i) => (i === p.active ? m : x)) }
}

export function loadParty(): Party {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as Partial<Party>) : null
    if (v && Array.isArray(v.members) && v.members.length > 0) {
      const members = v.members.map((m) => {
        const out: MonsterState = { ...m, xp: typeof m?.xp === 'number' && m.xp >= 0 ? m.xp : 0 }
        if (typeof m?.name === 'string') out.name = cleanName(m.name)
        if (!out.name) delete out.name
        return out
      })
      const active = typeof v.active === 'number' && v.active >= 0 && v.active < members.length ? v.active : 0
      return { active, members }
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
