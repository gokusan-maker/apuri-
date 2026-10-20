// レベル診断：中1〜高校基礎から4問ずつ出して、おすすめの単語帳を決める
import { makeQuiz, type Question, type Rng } from './quiz'
import { wordsOf, type Level, type Word } from './words'

export const PLACEMENT_LEVELS: Level[] = ['中1', '中2', '中3', '高校基礎']
export const PER_LEVEL = 4

export function makePlacement(rng: Rng = Math.random): { level: Level; q: Question<Word> }[] {
  return PLACEMENT_LEVELS.flatMap((level) => makeQuiz(wordsOf([level]), (w) => w.ja, PER_LEVEL, rng).map((q) => ({ level, q })))
}

// 各レベルの正解数から、おすすめ（3問以上できた一番上のレベルの次。全部できたら高校基礎）
export function recommend(correct: Partial<Record<Level, number>>): Level {
  let top = -1
  PLACEMENT_LEVELS.forEach((l, i) => {
    if ((correct[l] ?? 0) >= PER_LEVEL - 1) top = i
  })
  return PLACEMENT_LEVELS[Math.min(top + 1, PLACEMENT_LEVELS.length - 1)]
}
