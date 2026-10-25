// ボスの城：15レベル（中1〜東大・TOEIC・TOEFL/IELTS・ネイティブ）のボスが下から順にいる。
// ボスごとに5階：1〜4階は単語・文法・読解・ミックスの問題（5問・4問正解で次へ）、5階でそのレベルのボスと戦う
import { teamBossQuestions, type TeamQ } from './boss'
import { levelUnits } from './grammarcastle'
import { passagesFor, type ReadLevel } from './readlevel'
import type { LongPassage } from './longreading'
import { COURSES, courseWords, type CourseId } from './wordcourse'
import type { Level } from './words'

export const BC_FLOORS = 5
export const BC_QS = 5
export const BC_PASS = 4
export const BC_KIND = ['単語', '文法', '読解', 'ミックス'] as const
export type BcFloor = { id: string; course: CourseId; floor: number } // floor：0〜3 が問題の階、4 がボス

// レベルごとのボスの見た目（いままでのボスたちを15レベルにわりあてる）
export const LEVEL_BOSS_LOOK: Record<CourseId, Level> = {
  中1: '中1',
  中2: '中2',
  中3: '中3',
  高1: '高校基礎',
  高2: '熟語',
  高3: '会話',
  私学: 'テーマ別',
  私学難関: '数',
  国公立: '色・形',
  旧帝大: '英検2級',
  京大: '英検準1級',
  東大: '英検1級',
  TOEIC: 'ビジネス',
  'TOEFL・IELTS': '曜日・月',
  ネイティブ: 'ネイティブ',
}

export function bossCastleFloors(courses: CourseId[] = COURSES.map((c) => c.id)): BcFloor[] {
  return courses.flatMap((course) => Array.from({ length: BC_FLOORS }, (_, f) => ({ id: `lb:${course}:${f + 1}`, course, floor: f })))
}

// そのレベルの読解の長文（中1 は短い読解しかないので、ボスは単語の例文の訳で読解の番をする）
export const bossPassages = (course: CourseId): LongPassage[] | undefined => (course === '中1' ? undefined : passagesFor(course as ReadLevel))

// 問題の階の5問（そのレベルの単語・文法・例文の訳から）
export function bossFloorQs(course: CourseId, floor: number, rnd: () => number = Math.random): TeamQ[] {
  const all = teamBossQuestions(courseWords(course), rnd, 24, undefined, levelUnits(course)) as TeamQ[]
  const by = (t: TeamQ['team']) => all.filter((q) => q.team === t)
  if (floor === 0) return by('word').slice(0, BC_QS)
  if (floor === 1) return by('grammar').slice(0, BC_QS)
  if (floor === 2) return by('reading').slice(0, BC_QS)
  return [...by('word').slice(5, 7), ...by('grammar').slice(5, 7), ...by('reading').slice(5, 6)]
}

const KEY = 'eitan:bcastle'
export function loadBcClears(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveBcClears(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* 保存できなくても動く */
  }
}

// たおしたレベルのボス（レベル → 日付）
const WIN_KEY = 'eitan:lboss'
export function loadLevelBoss(): Partial<Record<CourseId, string>> {
  try {
    const v = JSON.parse(localStorage.getItem(WIN_KEY) ?? '{}') as unknown
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as Partial<Record<CourseId, string>>) : {}
  } catch {
    return {}
  }
}
export function saveLevelBoss(r: Partial<Record<CourseId, string>>): void {
  try {
    localStorage.setItem(WIN_KEY, JSON.stringify(r))
  } catch {
    /* 保存できなくても動く */
  }
}

// えらんでいるボスのレベル（単語・文法と同じく、レベルごとに城とボスがある）
const LEVEL_KEY = 'eitan:boss-level'
export function loadBossLevel(fallback: CourseId): CourseId {
  try {
    const v = localStorage.getItem(LEVEL_KEY)
    if (v && COURSES.some((c) => c.id === v)) return v as CourseId
  } catch {
    /* 読めなくても動く */
  }
  return fallback
}
export function saveBossLevel(id: CourseId): void {
  try {
    localStorage.setItem(LEVEL_KEY, id)
  } catch {
    /* 保存できなくても動く */
  }
}
