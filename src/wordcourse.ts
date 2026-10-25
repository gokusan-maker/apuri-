// 単語コース（単語のレベル）：中1〜高3・大学入試（私学〜東大）・TOEIC・TOEFL/IELTS・ネイティブ。
// えらんだレベルの単語だけで地図（ステージ）とミニゲームを出す。どの語がどのレベルかは wordband.ts（CEFR-J・使用頻度・学年で作成）
import { BAND_IDS } from './wordband'
import { WORDS_UPPER } from './wordsupper'
import { loadGrade, type GradeId } from './usergrade'
import { WORDS, type Level, type Word } from './words'

export type CourseId = '中1' | '中2' | '中3' | '高1' | '高2' | '高3' | '私学' | '私学難関' | '国公立' | '旧帝大' | '京大' | '東大' | 'TOEIC' | 'TOEFL・IELTS' | 'ネイティブ'
// level：ボスの見た目など、いままでの単語帳のどれに近いか
export type Course = { id: CourseId; label: string; sub: string; level: Level }

export const COURSES: Course[] = [
  { id: '中1', label: '中1', sub: '中学1年・英検5級', level: '中1' },
  { id: '中2', label: '中2', sub: '中学2年・英検4級', level: '中2' },
  { id: '中3', label: '中3', sub: '中学3年・英検3級', level: '中3' },
  { id: '高1', label: '高1', sub: '高校1年・英検準2級', level: '高校基礎' },
  { id: '高2', label: '高2', sub: '高校2年', level: '高校基礎' },
  { id: '高3', label: '高3', sub: '共通テスト・英検2級', level: '英検2級' },
  { id: '私学', label: '私学', sub: '中堅私大', level: '英検2級' },
  { id: '私学難関', label: '私学難関', sub: 'MARCH・早慶', level: '英検2級' },
  { id: '国公立', label: '国公立', sub: '国公立大', level: '英検準1級' },
  { id: '旧帝大', label: '旧帝大', sub: '旧帝大', level: '英検準1級' },
  { id: '京大', label: '京大', sub: '京都大', level: '英検1級' },
  { id: '東大', label: '東大', sub: '東京大', level: '英検1級' },
  { id: 'TOEIC', label: 'TOEIC', sub: 'ビジネス', level: 'ビジネス' },
  { id: 'TOEFL・IELTS', label: 'TOEFL・IELTS', sub: '留学・アカデミック', level: '英検準1級' },
  { id: 'ネイティブ', label: 'ネイティブ', sub: '口語・句動詞', level: 'ネイティブ' },
]

const byId = new Map(WORDS.map((w) => [w.id, w]))
const cache = new Map<CourseId, Word[]>()
// そのレベルの単語（TOEIC はビジネスの単語と仕事・買い物・旅行の話題の語）
export function courseWords(id: CourseId): Word[] {
  if (!cache.has(id)) {
    const ids = id === 'TOEIC' ? BAND_IDS.TOEIC_ALL : (BAND_IDS[id] ?? [])
    // あとから増やした大学入試レベルの単語（wordsupper.ts）も、そのレベルに入れる
    const extra = WORDS_UPPER.filter((w) => w.band === id).map((w) => w.id)
    cache.set(id, [...ids, ...extra].map((x) => byId.get(x)).filter((w): w is Word => !!w))
  }
  return cache.get(id)!
}
export const courseReady = (c: Course) => courseWords(c.id).length >= 10
export const courseById = (id: CourseId) => COURSES.find((c) => c.id === id)!

// まえの単語コース（英検の級・2000語など）から、新しいレベルへ
const LEGACY: Record<string, { levels: Level[]; to: CourseId }> = {
  eiken5: { levels: ['中1', '数', '曜日・月', '色・形'], to: '中1' },
  eiken4: { levels: ['中2'], to: '中2' },
  eiken3: { levels: ['中3', '会話'], to: '中3' },
  eikenp2: { levels: ['高校基礎', '熟語'], to: '高1' },
  eiken2: { levels: ['英検2級'], to: '高3' },
  eikenp1: { levels: ['英検準1級'], to: '国公立' },
  eiken1: { levels: ['英検1級'], to: '東大' },
  v2000: { levels: ['中1', '中2', '中3'], to: '中3' },
  v3000: { levels: ['中1', '中2', '中3', '高校基礎', '熟語'], to: '高1' },
  native: { levels: ['ネイティブ'], to: 'ネイティブ' },
}
export function legacyCourse(levels: Level[]): CourseId | undefined {
  const key = [...levels].sort().join('|')
  return Object.values(LEGACY).find((c) => [...c.levels].sort().join('|') === key)?.to
}

const FROM_GRADE: Record<GradeId, CourseId> = { j1: '中1', j2: '中2', j3: '中3', hs: '高1', adult: '高3' }
const KEY = 'eitan:word-course'
export function loadCourse(levels?: Level[]): CourseId {
  try {
    const v = localStorage.getItem(KEY)
    if (v && COURSES.some((c) => c.id === v)) return v as CourseId
  } catch {
    /* 読めなくても動く */
  }
  const g = loadGrade()
  return (levels && legacyCourse(levels)) ?? (g ? FROM_GRADE[g] : '中1')
}
export function hasCourse(): boolean {
  try {
    return localStorage.getItem(KEY) !== null
  } catch {
    return false
  }
}
export function saveCourse(id: CourseId): void {
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* 保存できなくても動く */
  }
}
