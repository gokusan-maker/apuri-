// ボス戦のチーム：単語・文法・読解のなかま（App が絵と名前をわたす）
import { createContext, type ReactNode } from 'react'
import type { TeamRole } from './boss'

export type BossTeam = Record<TeamRole, { name: string; fig: ReactNode }>
export const BossTeamContext = createContext<BossTeam | null>(null)
export const TEAM_LABEL: Record<TeamRole, string> = { word: '単語', grammar: '文法', reading: '読解' }
export const TEAM_ICON: Record<TeamRole, string> = { word: '🔤', grammar: '📐', reading: '📖' }
