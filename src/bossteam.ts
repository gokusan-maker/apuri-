import type { CharType } from './chartype'
// ボス戦のチーム：単語・文法・読解のなかま（App が絵と名前をわたす）
import { createContext, type ReactNode } from 'react'
import type { TeamRole } from './boss'
import type { Source } from './monster'

type AnswerFn = (correct: boolean, xp: number, wordId: string, source: Source) => void
// answer：その番のなかまが答えた分の XP をそのなかまへ（単語→相棒・文法→ことばモンスター・読解→竜）
export type BossTeam = Record<TeamRole, { name: string; fig: ReactNode; answer?: AnswerFn; level?: number }>
export const BossTeamContext = createContext<BossTeam | null>(null)
// 応援なかま（相棒以外）のタイプ。ボス戦でパッシブ効果になる
export const BossSupportContext = createContext<CharType['id'][]>([])
export const TEAM_LABEL: Record<TeamRole, string> = { word: '単語', grammar: '文法', reading: '読解' }
export const TEAM_ICON: Record<TeamRole, string> = { word: '🔤', grammar: '📐', reading: '📖' }
// 負けたときのチームのはげまし（1人1行）
export const TEAM_LOSE_LINES: Record<TeamRole, string> = {
  word: '単語をいっしょに覚えよう！',
  grammar: '文法を見直せば勝てるよ！',
  reading: '次は本文をゆっくり読もう！',
}
// 勝ったときのチームのひとこと（いちばん活やくしたなかまが1行で）
export const TEAM_WIN_LINES: Record<TeamRole, { en: string; ja: string }> = {
  word: { en: 'Words are our sword!', ja: '単語はぼくらの剣だ！' },
  grammar: { en: 'Grammar made us strong!', ja: '文法でチームが強くなった！' },
  reading: { en: 'We read the boss well!', ja: 'ボスをしっかり読みきった！' },
}
// いちばん正解したなかま（同じなら単語→文法→読解の順）
export function teamMvp(hits: Record<TeamRole, number>): TeamRole {
  return (['word', 'grammar', 'reading'] as TeamRole[]).reduce((a, b) => (hits[b] > hits[a] ? b : a))
}
