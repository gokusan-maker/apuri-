// 設定でえらんだ学年・レベル（中1〜社会人）。今日の課題やボス戦の文法・単語・読解のむずかしさをこれに合わせる
// 保存していない人（前からの人）は空 → これまでどおり全部から出す
export type GradeId = 'j1' | 'j2' | 'j3' | 'hs' | 'adult'
const GRADE_IDS: GradeId[] = ['j1', 'j2', 'j3', 'hs', 'adult']
const KEY = 'eitan:grade'

export function loadGrade(): GradeId | '' {
  try {
    const v = localStorage.getItem(KEY)
    return GRADE_IDS.includes(v as GradeId) ? (v as GradeId) : ''
  } catch {
    return ''
  }
}
export function saveGrade(g: GradeId): void {
  try {
    localStorage.setItem(KEY, g)
  } catch {
    // 保存できなくても続ける
  }
}

// 学年ごとの文法の学年（grammar.ts の gradeOf）
export const GRAMMAR_GRADES_FOR: Record<GradeId, ('中1' | '中2' | '中3' | '高校')[]> = {
  j1: ['中1'],
  j2: ['中1', '中2'],
  j3: ['中2', '中3'],
  hs: ['中3', '高校'],
  adult: ['中3', '高校'],
}
// 学年ごとの今日の単語の単語帳
export const WORD_LEVELS_FOR: Record<GradeId, string[]> = {
  j1: ['中1'],
  j2: ['中2'],
  j3: ['中3'],
  hs: ['高校基礎'],
  adult: ['高校基礎', '熟語'],
}
// 学年ごとの読解のむずかしさ（readlevel.ts の ReadLevel）
export const READ_LEVEL_FOR: Record<GradeId, 'easy' | 'normal' | 'exam' | 'univ' | 'toefl'> = {
  j1: 'easy',
  j2: 'normal',
  j3: 'exam',
  hs: 'univ',
  adult: 'univ',
}
