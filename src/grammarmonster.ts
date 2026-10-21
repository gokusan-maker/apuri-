// 文法モンスター：文法の単元ごとのボス。名前は単元のタイトルから、色は単元ごとに決まる
import type { BossLook } from './boss'
import type { GrammarUnit } from './grammar'

export const GRAMMAR_MONSTER_COINS = 10
export const RUSH_COUNT = 3 // 文法モンスターラッシュの連戦数
export const RUSH_GRAMMAR_COINS = 30 // ラッシュ全勝のごほうび
const COLORS = ['#7c3aed', '#db2777', '#0891b2', '#16a34a', '#ea580c', '#4f46e5', '#be123c', '#0d9488']

// 「be動詞（am / is / are）」→「be動詞モンスター」
export function monsterName(u: GrammarUnit): string {
  const head = u.title.split(/[（(]/)[0].trim()
  return `${head || u.title}モンスター`
}

export function monsterLook(u: GrammarUnit): BossLook {
  const n = [...u.id].reduce((a, c) => a + c.charCodeAt(0), 0)
  return { name: monsterName(u), color: COLORS[n % COLORS.length], line: '#1f2937', eye: '#fde047' }
}
