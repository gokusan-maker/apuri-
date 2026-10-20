// ステージ制：単語帳（レベル）ごとに10語ずつのステージ。クリアすると次が開く。
import { LEVELS, wordsOf, type Level, type Word } from './words'

export const STAGE_SIZE = 10

export type Stage = { id: string; level: Level; no: number; words: Word[] }

export function stagesOf(level: Level): Stage[] {
  const ws = wordsOf([level])
  const out: Stage[] = []
  for (let i = 0; i < ws.length; i += STAGE_SIZE) {
    const no = i / STAGE_SIZE + 1
    out.push({ id: `${level}-${no}`, level, no, words: ws.slice(i, i + STAGE_SIZE) })
  }
  return out
}

export const ALL_STAGES = LEVELS.flatMap(stagesOf)

// 正答率で星0〜3。星1以上でクリア。
export function starsFor(score: number, total: number): number {
  const r = total === 0 ? 0 : score / total
  if (r >= 1) return 3
  if (r >= 0.8) return 2
  if (r >= 0.6) return 1
  return 0
}

export type StageRecord = Record<string, number> // ステージid → 最高の星

export function isUnlocked(stage: Stage, rec: StageRecord): boolean {
  if (stage.no === 1) return true
  return (rec[`${stage.level}-${stage.no - 1}`] ?? 0) >= 1
}

export function recordStars(rec: StageRecord, id: string, stars: number): StageRecord {
  return stars > (rec[id] ?? 0) ? { ...rec, [id]: stars } : rec
}

const STORAGE_KEY = 'eitan:stages'

// 単語帳の全ステージで星3（トロフィー）
export function allThreeStars(level: Level, rec: StageRecord): boolean {
  return stagesOf(level).every((s) => (rec[s.id] ?? 0) >= 3)
}

export function loadStages(): StageRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(
      Object.entries(v).filter(([, n]) => typeof n === 'number' && n >= 0 && n <= 3),
    ) as StageRecord
  } catch {
    return {}
  }
}

export function saveStages(rec: StageRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rec))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
