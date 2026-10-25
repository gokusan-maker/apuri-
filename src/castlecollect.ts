// 城の制覇コレクション：てっぺんまで登った城の数で称号とごほうび（🎟）
import { BOSS_GROUPS } from './bossfilter'
import { loadBoss } from './boss'
import { GC_LEVELS, gcFloorsFor, loadGcClears } from './grammarcastle'
import { loadShortDone, PASSAGES } from './reading'
import { COURSES, courseReady } from './wordcourse'
import { loadWcClears, wordCastleFloors } from './wordcastle'
import { LEVELS } from './words'

export type CastleInfo = { id: string; kind: '単語' | '文法' | '読解' | 'ボス'; name: string; floors: number; cleared: number }

export function allCastles(): CastleInfo[] {
  const wc = loadWcClears()
  const gc = loadGcClears()
  const short = loadShortDone()
  const boss = loadBoss()
  return [
    ...COURSES.filter(courseReady).map((c) => {
      const fl = wordCastleFloors(c.levels)
      return { id: `w:${c.id}`, kind: '単語' as const, name: `${c.label}の城`, floors: fl.length, cleared: fl.filter((f) => wc.includes(f.id)).length }
    }),
    ...GC_LEVELS.map((l) => {
      const fl = gcFloorsFor(l.id)
      return { id: `g:${l.id}`, kind: '文法' as const, name: `${l.label}の文法の城`, floors: fl.length, cleared: fl.filter((f) => gc.includes(f.id)).length }
    }),
    { id: 'r:mini', kind: '読解' as const, name: '読解ミニの城', floors: PASSAGES.length, cleared: PASSAGES.filter((p) => short.includes(p.id)).length },
    ...BOSS_GROUPS.map((g) => {
      const lvs = LEVELS.filter((lv) => g.levels.includes(lv))
      return { id: `b:${g.id}`, kind: 'ボス' as const, name: `${g.label.replace(/^\S+ /, '')}のボスの城`, floors: lvs.length, cleared: lvs.filter((lv) => boss[lv]).length }
    }),
  ]
}

export const conquered = (list: CastleInfo[]) => list.filter((c) => c.floors > 0 && c.cleared >= c.floors).length

// 節目の数と称号
export const COLLECT_STEPS: { n: number; title: string }[] = [
  { n: 1, title: '城の見習い' },
  { n: 3, title: '城めぐりの旅人' },
  { n: 5, title: '城の主' },
  { n: 10, title: '城の王' },
  { n: 20, title: '伝説の城主' },
]
export const titleOf = (n: number) => [...COLLECT_STEPS].reverse().find((s) => n >= s.n)?.title ?? null

const KEY = 'eitan:castle-collect' // ごほうびを受け取った節目の数
export function loadCollectClaimed(): number {
  try {
    const n = Number(localStorage.getItem(KEY))
    return Number.isInteger(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}
export function saveCollectClaimed(n: number): void {
  try {
    localStorage.setItem(KEY, String(n))
  } catch {
    /* 保存できなくても動く */
  }
}
// まだ受け取っていない節目（いくつ受け取れるか）
export const claimableSteps = (done: number, claimed: number) => COLLECT_STEPS.filter((s) => done >= s.n).length - claimed
