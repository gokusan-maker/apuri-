// 入試の文法を、問題の実際のレベルごとにまとめる（オーナーの依頼：レベルごとにきっちり分ける）
import { EXAM_ERROR, EXAM_FIX } from './examerror'
import { ERROR_LEVELS, errorLevelOf } from './examerrorlevel'
import { EXAM_GRAMMAR } from './examgrammar'
import { LEVEL_GRAMMAR } from './examgrammar2'
import type { GrammarUnit } from './grammar'

export const EXAM_LV_ALL = 'すべて'

// 試験ごとの単元（examgrammar・examgrammar2）は、その試験のレベル
export const EXAM_UNIT_LEVEL: Record<string, string> = {
  'exam-kyotsu': '私学',
  'exam-shiritsu': '私学難関',
  'exam-shiritsu-med': '私学難関',
  'exam-kokkoritsu': '国公立',
  'exam-kyutei': '旧帝大',
  'exam-kokuritsu-med': '旧帝大',
  'exam-kyodai': '京大',
  'exam-todai': '東大',
  'exam-toeic': 'TOEIC',
  'exam-toefl': 'TOEFL・IELTS',
  'exam-native': 'ネイティブ',
}

export type ExamSection = { level: string; units: GrammarUnit[] }
const SECTIONS: ExamSection[] = ERROR_LEVELS.map((level) => ({
  level,
  units: [
    ...[...EXAM_GRAMMAR, ...LEVEL_GRAMMAR].filter((u) => EXAM_UNIT_LEVEL[u.id] === level),
    ...EXAM_ERROR.filter((u) => errorLevelOf(u.id) === level),
    ...EXAM_FIX.filter((u) => errorLevelOf(u.id) === level),
  ],
})).filter((x) => x.units.length > 0)

// やさしいレベルから順に、単元のあるレベルだけ
export function examSections(): ExamSection[] {
  return SECTIONS
}
