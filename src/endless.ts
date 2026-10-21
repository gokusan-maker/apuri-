// エンドレスの塔：1階ずつボスと戦い、ハートを引き継いでどこまで登れるか。最高到達階を記録し、10階ごとにごほうび
import { BOSSES, type BossLook } from './boss'
import type { Level } from './words'

export const ENDLESS_REWARD_EVERY = 10
export const ENDLESS_REWARD_COINS = 50

export function endlessLevel(floor: number): Level {
  if (floor <= 5) return '中1'
  if (floor <= 10) return '中2'
  if (floor <= 15) return '中3'
  if (floor <= 20) return '高校基礎'
  return floor % 2 ? '熟語' : '高校基礎'
}

export const endlessHp = (floor: number) => 30 + floor * 6

export function endlessLook(floor: number): BossLook {
  const looks = Object.values(BOSSES)
  const base = looks[(floor - 1) % looks.length]
  return { ...base, name: `${floor}階の${base.name}` }
}

// 新しく到達した「10階ごと」の数（ごほうびの回数）
export function rewardsBetween(prevBest: number, best: number): number {
  return Math.max(0, Math.floor(best / ENDLESS_REWARD_EVERY) - Math.floor(prevBest / ENDLESS_REWARD_EVERY))
}

const KEY = 'eitan:endless'

export function loadEndlessBest(): number {
  try {
    const n = Number(localStorage.getItem(KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}

export function saveEndlessBest(n: number): void {
  try {
    localStorage.setItem(KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
