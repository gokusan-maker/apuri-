// 学年に合わせたおすすめの単語帳
import type { GradeId } from './usergrade'
import type { Level } from './words'

export type Grade = { id: GradeId; label: string; levels: Level[] }

export const GRADES: Grade[] = [
  { id: 'j1', label: '中学1年', levels: ['中1', '曜日・月', 'テーマ別', '数', '色・形', '会話'] },
  { id: 'j2', label: '中学2年', levels: ['中1', '中2', '曜日・月', 'テーマ別', '会話'] },
  { id: 'j3', label: '中学3年', levels: ['中1', '中2', '中3', '熟語'] },
  { id: 'hs', label: '高校生', levels: ['中3', '高校基礎', '熟語'] },
  { id: 'adult', label: '社会人・大人', levels: ['中1', '中2', '中3', '高校基礎', '熟語', '会話', 'ビジネス'] },
]
