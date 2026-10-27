// 闘技場（ボス部屋の城の下）：エンドレスで戦う。正解すると1つ上のレベル、まちがえると1つ下のレベルの問題になる。
// レベル（0〜14）は COURSES の順（中1〜ネイティブ）。いまのレベル＋1 を「階」として伝える
import { BOSSES, type BossLook } from './boss'
import { LEVEL_BOSS_LOOK } from './bosscastle'
import { randomQuestion, type Question } from './quiz'
import { COURSES, courseWords, type CourseId } from './wordcourse'
import type { Word } from './words'

export const ARENA_TOP = COURSES.length - 1
export const ARENA_BEST_COINS = 5 // いままでの最高より上の階に着くたびに
const clamp = (lv: number) => Math.max(0, Math.min(ARENA_TOP, lv))
// 正解なら上へ、まちがいなら下へ（いちばん上・下ではそのまま）
export const arenaNext = (lv: number, correct: boolean): number => clamp(lv + (correct ? 1 : -1))
export const arenaCourse = (lv: number) => COURSES[clamp(lv)]
export const arenaFloor = (lv: number): string => `${clamp(lv) + 1}階（${arenaCourse(lv).label}レベル）`
// そのレベルの相手：そのレベルのボスのキャラクター
export const arenaLook = (lv: number): BossLook => BOSSES[LEVEL_BOSS_LOOK[arenaCourse(lv).id]]
export const arenaStart = (course: CourseId): number => clamp(COURSES.findIndex((c) => c.id === course))
// そのレベルの単語から1問（直前と同じ単語は避ける）
export function arenaQuestion(lv: number, rnd: () => number = Math.random, avoid?: string): Question<Word> {
  const words = courseWords(arenaCourse(lv).id)
  let q = randomQuestion(words, (w) => w.ja, rnd)
  for (let k = 0; k < 3 && avoid && q.word.id === avoid; k++) q = randomQuestion(words, (w) => w.ja, rnd)
  return q
}

// いちばん高く上がった階（0から数えるレベル）
const BEST_KEY = 'eitan:arena-best'
export function loadArenaBest(): number | null {
  try {
    const v = Number(localStorage.getItem(BEST_KEY))
    return localStorage.getItem(BEST_KEY) !== null && Number.isInteger(v) && v >= 0 ? clamp(v) : null
  } catch {
    return null
  }
}
export function recordArenaBest(lv: number): boolean {
  const best = loadArenaBest()
  if (best !== null && best >= lv) return false
  try {
    localStorage.setItem(BEST_KEY, String(clamp(lv)))
  } catch {
    /* 保存できなくても動く */
  }
  return true
}
