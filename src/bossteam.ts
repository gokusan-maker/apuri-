// ボス戦のチーム：単語・文法・読解のなかま（App が絵と名前をわたす）
import { createContext, type ReactNode } from 'react'
import type { TeamRole } from './boss'
import type { Source } from './monster'

type AnswerFn = (correct: boolean, xp: number, wordId: string, source: Source) => void
// answer：その番のなかまが答えた分の XP をそのなかまへ（単語→相棒・文法→ことばモンスター・読解→竜）
export type BossTeam = Record<TeamRole, { name: string; fig: ReactNode; answer?: AnswerFn }>
export const BossTeamContext = createContext<BossTeam | null>(null)
export const TEAM_LABEL: Record<TeamRole, string> = { word: '単語', grammar: '文法', reading: '読解' }
export const TEAM_ICON: Record<TeamRole, string> = { word: '🔤', grammar: '📐', reading: '📖' }
// 負けたときのチームのはげまし（1人1行）
export const TEAM_LOSE_LINES: Record<TeamRole, string> = {
  word: '単語をいっしょに覚えよう！',
  grammar: '文法を見直せば勝てるよ！',
  reading: '次は本文をゆっくり読もう！',
}
