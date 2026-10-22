// 項目ごとに育てるなかま：単語は相棒（モチなど）、文法はペットモンスター（ペットにちなんだ名前のモンスター）、長文は竜（ドラゴン）
// 単語の相棒はこれまでどおり party / monster。文法と長文のなかまはここで別に育てる
import { levelInfo } from './monster'

export type Track = 'grammar' | 'reading'
export type Buddy = { xp: number; name?: string }
export type Buddies = Record<Track, Buddy>

export type BuddyForm = { minLv: number; icon: string; name: string }
// レベルで姿がかわる（Lv.1 はタマゴ。XP がたまってLv.2になるとかえる）
export const BUDDY_FORMS: Record<Track, BuddyForm[]> = {
  grammar: [
    { minLv: 1, icon: '🥚', name: 'モンスターのタマゴ' },
    { minLv: 2, icon: '🐹', name: 'ハムモン' },
    { minLv: 5, icon: '🐰', name: 'ピョンモン' },
    { minLv: 10, icon: '🐶', name: 'ワンモン' },
    { minLv: 20, icon: '🐱', name: 'ニャンモン' },
    { minLv: 35, icon: '🦜', name: 'インコモンはかせ' },
  ],
  reading: [
    { minLv: 1, icon: '🥚', name: 'りゅうのタマゴ' },
    { minLv: 2, icon: '🦎', name: 'ちびドラ' },
    { minLv: 5, icon: '🐲', name: 'ベビードラゴン' },
    { minLv: 10, icon: '🐉', name: 'ドラゴン' },
    { minLv: 20, icon: '🐉', name: 'せいりゅう（聖竜）' },
    { minLv: 35, icon: '🐉', name: 'つきのしんりゅう（月の神竜）' },
  ],
}
export const TRACK_LABEL: Record<Track, string> = { grammar: '文法', reading: '長文' }

export const buddyLevel = (b: Buddy) => levelInfo(b.xp)
export function buddyForm(track: Track, b: Buddy): BuddyForm {
  const lv = buddyLevel(b).level
  return [...BUDDY_FORMS[track]].reverse().find((f) => lv >= f.minLv)!
}

const KEY = 'eitan:buddies'
const clean = (v: unknown): Buddy => {
  const o = (v && typeof v === 'object' ? v : {}) as Partial<Buddy>
  return { xp: typeof o.xp === 'number' && o.xp >= 0 ? Math.floor(o.xp) : 0, ...(typeof o.name === 'string' && o.name ? { name: o.name } : {}) }
}

export function loadBuddies(): Buddies {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, unknown>
    return { grammar: clean(v?.grammar), reading: clean(v?.reading) }
  } catch {
    return { grammar: { xp: 0 }, reading: { xp: 0 } }
  }
}

export function saveBuddies(b: Buddies): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(b))
  } catch {
    // 保存できなくても続ける
  }
}

// XP をあげる。レベルアップ・進化したかも返す
export function feedBuddy(b: Buddies, track: Track, amount: number): { buddies: Buddies; levelUp: boolean; evolved: BuddyForm | null } {
  const before = b[track]
  const after = { ...before, xp: before.xp + Math.max(0, Math.round(amount)) }
  const f0 = buddyForm(track, before)
  const f1 = buddyForm(track, after)
  return { buddies: { ...b, [track]: after }, levelUp: buddyLevel(after).level > buddyLevel(before).level, evolved: f1 !== f0 ? f1 : null }
}

// なかまに名前をつける（空なら名前を消す）
export const renameBuddy = (b: Buddies, track: Track, name: string): Buddies => ({ ...b, [track]: name ? { ...b[track], name } : { xp: b[track].xp } })
