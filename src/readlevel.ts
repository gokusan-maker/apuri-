// 読解ステージのむずかしさ：かんたんな短い英文から、難関大（京大レベル）・TOEFL/IELTS まで選べる
import { ADV_PASSAGES } from './advreading'
import { PASSAGES } from './reading'
import { LONG_PASSAGES, type LongPassage, type LongRecord } from './longreading'

export type ReadLevel = 'easy' | 'normal' | 'exam' | 'univ' | 'toefl'
export const READ_LEVELS: { id: ReadLevel; label: string; sub: string }[] = [
  { id: 'easy', label: 'かんたん', sub: '短い英文' },
  { id: 'normal', label: 'ふつう', sub: '中2〜中3' },
  { id: 'exam', label: '高校入試', sub: '中3〜入試' },
  { id: 'univ', label: '難関大', sub: '京大レベル' },
  { id: 'toefl', label: 'TOEFL・IELTS', sub: '留学レベル' },
]

// むずかしさごとの長文（かんたん は短い読解なので空）
export function passagesFor(level: ReadLevel): LongPassage[] {
  if (level === 'normal') return LONG_PASSAGES.filter((p) => p.level.startsWith('中2') || p.level.startsWith('初級'))
  if (level === 'exam') return LONG_PASSAGES.filter((p) => p.level.startsWith('中3') || p.level.startsWith('高校入試'))
  if (level === 'univ') return ADV_PASSAGES.filter((p) => p.level.startsWith('難関大'))
  if (level === 'toefl') return ADV_PASSAGES.filter((p) => p.level.startsWith('TOEFL'))
  return []
}

const KEY = 'eitan:read-level'
export function loadReadLevel(): ReadLevel {
  try {
    const v = localStorage.getItem(KEY)
    return READ_LEVELS.some((l) => l.id === v) ? (v as ReadLevel) : 'easy'
  } catch {
    return 'easy'
  }
}
export function saveReadLevel(l: ReadLevel): void {
  try {
    localStorage.setItem(KEY, l)
  } catch {
    // 保存できなくても続ける
  }
}

// そのむずかしさで解いた本数と全部の本数（かんたん は短い読解の解いた話）
export function solvedOf(level: ReadLevel, record: LongRecord, shortDone: string[] = []): { done: number; total: number } | null {
  if (level === 'easy') return { done: PASSAGES.filter((p) => shortDone.includes(p.id)).length, total: PASSAGES.length }
  const ps = passagesFor(level)
  return { done: ps.filter((p) => record[p.id] !== undefined).length, total: ps.length }
}

// むずかしさごとの「今日のおすすめ1本」（同じ日は同じ。日ごとにかわる）
export function dailyPick(list: LongPassage[], day: string): LongPassage | undefined {
  if (list.length === 0) return undefined
  let h = 5
  for (const c of day) h = (h * 37 + c.charCodeAt(0)) >>> 0
  return list[h % list.length]
}
