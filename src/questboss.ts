// 特別クエスト：ボス部屋の「とくべつイベント」でときどき出る、攻略のむずかしい強いボス（1日1回ごほうび）
import { dailyBossLevel, type BossLook } from './boss'
import type { Level } from './words'

export const QUEST_HP = 360
export const QUEST_COINS = 60
const QUEST_LEVELS: Level[] = ['中3', '高校基礎', '熟語']

// 日がわりの強いボス（3体）
const QUEST_LOOKS: BossLook[] = [
  { name: 'マオウモチ', deco: 'crown', color: '#111827', line: '#000000', eye: '#ef4444', desc: 'モチたちの王。ふつうのボスの2倍以上の体力をもつ。', taunt: { en: 'You dare to challenge the king?', ja: '王にいどむとは、いい度胸だ。' } },
  { name: 'ヨロイモチ', deco: 'helmet', color: '#64748b', line: '#1e293b', eye: '#fbbf24', desc: '鉄のよろいを着たモチ。少しずつしかダメージが入らない。', taunt: { en: 'My armor is too strong for you!', ja: 'このよろいは、きみにはやぶれない！' } },
  { name: 'ライジンモチ', deco: 'thunder', color: '#ca8a04', line: '#422006', eye: '#e0f2fe', desc: 'かみなりをあやつる、空のモチ。', taunt: { en: 'Can you keep up with lightning?', ja: 'いなずまの速さについてこられるか？' } },
]

export function questBossOf(day: string): { level: Level; look: BossLook } {
  const level = dailyBossLevel(QUEST_LEVELS, `quest-${day}`) ?? '中3'
  const i = QUEST_LOOKS.findIndex((x) => x === dailyBossLevel(QUEST_LOOKS, `quest-look-${day}`))
  return { level, look: QUEST_LOOKS[Math.max(0, i)] }
}

const KEY = 'eitan:quest-day'
export function loadQuestDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveQuestDay(day: string) {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // 保存できなくても続ける
  }
}
