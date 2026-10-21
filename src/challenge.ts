// 今日のチャレンジ：選んでいるキャラクターで問題の種類が、育ち具合で難しさが変わる。1日1回ごほうび
import type { Level } from './words'

export type ChallengeKind = { dir: 'en-ja' | 'gmix' | 'order' | 'sentence-read' | 'listen' | 'ja-en'; label: string; icon: string }

export const CHALLENGE_BY_SPECIES: Record<string, ChallengeKind> = {
  mochi: { dir: 'en-ja', label: '単語', icon: '🔤' },
  fox: { dir: 'gmix', label: '文法', icon: '📐' },
  penguin: { dir: 'order', label: '並べかえ', icon: '🔀' },
  dragon: { dir: 'sentence-read', label: '英文和訳', icon: '📜' },
  rabbit: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  cat: { dir: 'ja-en', label: '和文英訳（単語）', icon: '✍' },
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
const STREAK_KEY = 'eitan:challenge-streak'

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

// 連続クリア日数：前の日もクリアしていれば +1、そうでなければ 1 から
export const STREAK_TICKET_DAYS = 3

function prevDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10)
}

export function nextChallengeStreak(lastDay: string, streak: number, today: string): number {
  return lastDay === prevDay(today) ? streak + 1 : 1
}

export function loadChallengeStreak(): number {
  try {
    const n = Number(localStorage.getItem(STREAK_KEY))
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}

export function saveChallengeStreak(n: number): void {
  try {
    localStorage.setItem(STREAK_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// いま続いている連続クリア日数（最後のクリアが今日か昨日なら有効）
export function challengeStreakNow(lastDay: string, today: string): number {
  if (lastDay !== today && lastDay !== prevDay(today)) return 0
  return loadChallengeStreak()
}
