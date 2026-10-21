// 今日のチャレンジ：選んでいるキャラクターで問題の種類が、育ち具合で難しさが変わる。1日1回ごほうび
import type { Level } from './words'

export type ChallengeKind = { dir: 'en-ja' | 'gmix' | 'order' | 'sentence-read'; label: string; icon: string }

export const CHALLENGE_BY_SPECIES: Record<string, ChallengeKind> = {
  mochi: { dir: 'en-ja', label: '単語', icon: '🔤' },
  fox: { dir: 'gmix', label: '文法', icon: '📐' },
  penguin: { dir: 'order', label: '並べかえ', icon: '🔀' },
  dragon: { dir: 'sentence-read', label: '英文和訳', icon: '📜' },
}

export const challengeOf = (species: string | undefined): ChallengeKind => CHALLENGE_BY_SPECIES[species ?? 'mochi'] ?? CHALLENGE_BY_SPECIES.mochi

export type Difficulty = { id: 'easy' | 'normal' | 'hard'; label: string; count: number; levels: Level[]; coins: number; xp: number }

export const DIFFICULTIES: Difficulty[] = [
  { id: 'easy', label: 'やさしい', count: 5, levels: ['中1'], coins: 10, xp: 20 },
  { id: 'normal', label: 'ふつう', count: 8, levels: ['中2', '中3'], coins: 15, xp: 40 },
  { id: 'hard', label: 'むずかしい', count: 10, levels: ['高校基礎', '熟語'], coins: 20, xp: 60 },
]

// 育ち具合（進化の段階）で難しさが上がる：タマゴ〜モチまる=やさしい、Lv15〜30=ふつう、Lv50〜=むずかしい
export function difficultyOf(stage: number): Difficulty {
  return stage >= 5 ? DIFFICULTIES[2] : stage >= 3 ? DIFFICULTIES[1] : DIFFICULTIES[0]
}

export const CLEAR_RATE = 0.6 // 6割正解でクリア
export const cleared = (correct: number, total: number) => total > 0 && correct / total >= CLEAR_RATE

const KEY = 'eitan:challenge'

export function loadChallengeDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveChallengeDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
