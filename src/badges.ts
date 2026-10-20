// バッジ：条件を満たすともらえる。もらった日を保存する。
export type BadgeStats = {
  answers: number // 累計の解答数
  correct: number // 累計の正解数
  streak: number // 連続学習日数
  learned: number // 定着語数（全単語）
  level: number // 相棒のレベル
  perfect: number // クイズ10問パーフェクトの回数
  bestTime: number // タイムアタック自己ベスト
  goals: number // 1日の目標を達成した日数
  bosses?: number // たおしたボスの数
  coins?: number // 今持っているコイン
  members?: number // なかまの数
  bestCombo?: number // コンボの自己ベスト
}

export type Badge = {
  id: string
  icon: string
  name: string
  desc: string
  check: (s: BadgeStats) => boolean
}

export const BADGES: Badge[] = [
  { id: 'first-correct', icon: '🌱', name: 'はじめの一歩', desc: '初めて正解する', check: (s) => s.correct >= 1 },
  { id: 'correct-10', icon: '⭐', name: '10問正解', desc: '累計10問正解する', check: (s) => s.correct >= 10 },
  { id: 'answers-100', icon: '💯', name: '100問チャレンジ', desc: '累計100問に答える', check: (s) => s.answers >= 100 },
  { id: 'answers-500', icon: '🏔️', name: '500問の山', desc: '累計500問に答える', check: (s) => s.answers >= 500 },
  { id: 'perfect', icon: '👑', name: 'パーフェクト', desc: 'クイズ10問を全問正解する', check: (s) => s.perfect >= 1 },
  { id: 'streak-3', icon: '🔥', name: '3日連続', desc: '3日続けて学習する', check: (s) => s.streak >= 3 },
  { id: 'streak-7', icon: '🔥', name: '7日連続', desc: '7日続けて学習する', check: (s) => s.streak >= 7 },
  { id: 'streak-30', icon: '🌋', name: '30日連続', desc: '30日続けて学習する', check: (s) => s.streak >= 30 },
  { id: 'learned-10', icon: '📗', name: '10語定着', desc: '10語を定着させる', check: (s) => s.learned >= 10 },
  { id: 'learned-50', icon: '📘', name: '50語定着', desc: '50語を定着させる', check: (s) => s.learned >= 50 },
  { id: 'learned-100', icon: '📚', name: '100語定着', desc: '100語を定着させる', check: (s) => s.learned >= 100 },
  { id: 'level-5', icon: '🐣', name: '進化の始まり', desc: '相棒をレベル5に育てる', check: (s) => s.level >= 5 },
  { id: 'level-15', icon: '🐉', name: 'たくましく', desc: '相棒をレベル15に育てる', check: (s) => s.level >= 15 },
  { id: 'time-15', icon: '⚡', name: 'スピードスター', desc: 'タイムアタックで15問正解', check: (s) => s.bestTime >= 15 },
  { id: 'goal-1', icon: '🎯', name: '目標達成', desc: '1日の目標を初めて達成する', check: (s) => s.goals >= 1 },
  { id: 'goal-10', icon: '🏅', name: 'コツコツ名人', desc: '1日の目標を10日達成する', check: (s) => s.goals >= 10 },
  { id: 'boss-1', icon: '⚔️', name: 'ボスたいじ', desc: 'ボスを初めてたおす', check: (s) => (s.bosses ?? 0) >= 1 },
  { id: 'boss-all', icon: '🏆', name: 'ボスマスター', desc: 'すべての単語帳のボスをたおす', check: (s) => (s.bosses ?? 0) >= 10 },
  { id: 'coins-100', icon: '💰', name: 'こつこつ貯金', desc: 'コインを100枚ためる', check: (s) => (s.coins ?? 0) >= 100 },
  { id: 'members-2', icon: '🤝', name: 'なかまが増えた', desc: '2匹目の相棒に出会う', check: (s) => (s.members ?? 1) >= 2 },
  { id: 'combo-10', icon: '🔥', name: '10コンボ', desc: 'クイズで10問つづけて正解', check: (s) => (s.bestCombo ?? 0) >= 10 },
  { id: 'combo-20', icon: '☄️', name: '20コンボ', desc: 'クイズで20問つづけて正解', check: (s) => (s.bestCombo ?? 0) >= 20 },
  { id: 'answers-1000', icon: '🌟', name: '1000問の星', desc: '累計1000問に答える', check: (s) => s.answers >= 1000 },
]

export type Earned = Record<string, string> // バッジid → もらった日

// まだ持っていないのに条件を満たしたバッジ
export function newlyEarned(stats: BadgeStats, earned: Earned): Badge[] {
  return BADGES.filter((b) => !earned[b.id] && b.check(stats))
}

const BADGES_KEY = 'eitan:badges'
const TOTALS_KEY = 'eitan:totals'

export type Totals = {
  answers: number
  correct: number
  perfect: number
  goals: number
  bestCombo?: number
  studyDays?: number // 学習した日数（累計）
}
const ZERO: Totals = { answers: 0, correct: 0, perfect: 0, goals: 0 }

function load<T>(key: string, fallback: T, ok: (v: unknown) => boolean): T {
  try {
    const raw = localStorage.getItem(key)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    return v !== null && ok(v) ? (v as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

const isObj = (v: unknown) => typeof v === 'object' && v !== null && !Array.isArray(v)

export const loadEarned = (): Earned => load(BADGES_KEY, {}, isObj)
export const saveEarned = (e: Earned) => save(BADGES_KEY, e)
export const loadTotals = (): Totals => ({ ...ZERO, ...load<Partial<Totals>>(TOTALS_KEY, {}, isObj) })
export const saveTotals = (t: Totals) => save(TOTALS_KEY, t)
