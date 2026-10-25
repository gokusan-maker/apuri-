// 単語コース：英検の級・語数レベルでえらぶ。えらぶと、そのコースの単語帳を使う
import type { Level } from './words'

export type CourseId = 'eiken5' | 'eiken4' | 'eiken3' | 'eikenp2' | 'eiken2' | 'eikenp1' | 'eiken1' | 'v2000' | 'v3000' | 'native'
export type Course = { id: CourseId; label: string; sub: string; levels: Level[] }

export const COURSES: Course[] = [
  { id: 'eiken5', label: '英検5級', sub: '中1・数・曜日・色', levels: ['中1', '数', '曜日・月', '色・形'] },
  { id: 'eiken4', label: '英検4級', sub: '中2', levels: ['中2'] },
  { id: 'eiken3', label: '英検3級', sub: '中3・会話', levels: ['中3', '会話'] },
  { id: 'eikenp2', label: '英検準2級', sub: '高校基礎・熟語', levels: ['高校基礎', '熟語'] },
  { id: 'eiken2', label: '英検2級', sub: '高校・大学入試', levels: [] },
  { id: 'eikenp1', label: '英検準1級', sub: '大学・社会人', levels: [] },
  { id: 'eiken1', label: '英検1級', sub: '最上級', levels: [] },
  { id: 'v2000', label: '2000語', sub: '中学の全単語', levels: ['中1', '中2', '中3'] },
  { id: 'v3000', label: '3000語', sub: '＋高校基礎・熟語', levels: ['中1', '中2', '中3', '高校基礎', '熟語'] },
  { id: 'native', label: 'ネイティブ', sub: '口語・句動詞', levels: [] },
]

export const courseReady = (c: Course) => c.levels.length > 0

// いまの単語帳とぴったり同じコース（なければ undefined）
export function courseOf(levels: Level[]): Course | undefined {
  const key = [...levels].sort().join('|')
  return COURSES.find((c) => courseReady(c) && [...c.levels].sort().join('|') === key)
}
