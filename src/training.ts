// 相棒のトレーニング：1日1回、5問クイズを全問正解すると「ちから」+1（最大5）。ちから1につきボス戦の正解ダメージ+1
export const POWER_MAX = 5
export const TRAIN_COUNT = 5
export type Training = { power: number; day: string }
const KEY = 'eitan:training'

export function loadTraining(): Training {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<Training> | null
    const p = typeof v?.power === 'number' ? Math.max(0, Math.min(POWER_MAX, Math.floor(v.power))) : 0
    return { power: p, day: typeof v?.day === 'string' ? v.day : '' }
  } catch {
    return { power: 0, day: '' }
  }
}
export function saveTraining(t: Training): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(t))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
// トレーニングを終えた（全問正解なら ちから+1）
export const trainDone = (t: Training, day: string, perfect: boolean): Training => ({ power: perfect ? Math.min(POWER_MAX, t.power + 1) : t.power, day })
