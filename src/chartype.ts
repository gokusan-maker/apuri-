// キャラクターのタイプ：相棒の特技からきまる（アタック・シールド・ねばり・サポート・スピード）
import { skillOf, type SkillId } from './partner'

export type CharType = { id: 'attack' | 'shield' | 'guts' | 'support' | 'speed'; icon: string; name: string; desc: string }

export const CHAR_TYPES: Record<CharType['id'], CharType> = {
  attack: { id: 'attack', icon: '⚔', name: 'アタック型', desc: 'ボスへのダメージをふやす' },
  shield: { id: 'shield', icon: '🛡', name: 'シールド型', desc: 'まちがえてもハートを守る' },
  guts: { id: 'guts', icon: '💪', name: 'ねばり型', desc: 'ハートが0でもふんばる' },
  support: { id: 'support', icon: '📣', name: 'サポート型', desc: '必殺技ゲージをためる' },
  speed: { id: 'speed', icon: '⚡', name: 'スピード型', desc: '会心の一撃が出やすい' },
}

const BY_SKILL: Record<SkillId, CharType['id']> = { fire: 'attack', foxfire: 'attack', guard: 'shield', revive: 'guts', cheer: 'support', claw: 'speed' }

export const typeOf = (species: string | undefined): CharType => CHAR_TYPES[BY_SKILL[skillOf(species).id]]

// ボス戦の応援なかま（相棒以外の上位3体）のタイプで、パッシブ効果
export type SupportEffects = { atk: number; shield: boolean; gauge: number; critMs: number; hp: number }
export const SUPPORT_MAX = 3
export function supportEffects(types: CharType['id'][]): SupportEffects {
  const n = (t: CharType['id']) => types.filter((x) => x === t).length
  return { atk: n('attack') * 2, shield: n('shield') > 0, gauge: n('support'), critMs: n('speed') * 1000, hp: n('guts') * 10 }
}
