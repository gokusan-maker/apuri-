// ボス戦：単語帳の全ステージをクリアすると挑戦できる。
import { stagesOf, type StageRecord } from './stages'
import { WORDS, type Level, type Word } from './words'
import { makeQuiz } from './quiz'
import { grammarMixQ } from './puzzles'

export const BOSS_HP = 100
export const HEARTS = 3
export const BOSS_QUESTIONS = 20
export const BOSS_XP = 100
export const HEAL_COST = 10 // ハート回復のコイン
export const BOSS_REMATCH_XP = 20 // 2回目以降の撃破ボーナス

// 正解のダメージ。連続正解で少しずつ強くなる（最大10）
export function damage(combo: number): number {
  return 6 + Math.min(Math.max(combo - 1, 0), 4)
}

// 会心の一撃：問題が出てから3秒以内に正解するとダメージ1.5倍
export const CRIT_MS = 3000
export const isCritical = (ms: number, limit = CRIT_MS) => ms >= 0 && ms <= limit
export const critDamage = (base: number) => Math.ceil(base * 1.5)

// 必殺技ゲージ：正解で1、会心なら2たまる。満タンで必殺技（大ダメージ）
export const GAUGE_MAX = 5
export const SPECIAL_DAMAGE = 25
export const gaugeAfter = (g: number, critical: boolean) => Math.min(GAUGE_MAX, g + (critical ? 2 : 1))

export function bossUnlocked(level: Level, rec: StageRecord): boolean {
  const list = stagesOf(level)
  return list.length > 0 && list.every((s) => (rec[s.id] ?? 0) >= 1)
}

export type BossRecord = Partial<Record<Level, string>> // 倒した日

const STORAGE_KEY = 'eitan:boss'

export function loadBoss(): BossRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as BossRecord) : {}
  } catch {
    return {}
  }
}

export function saveBoss(r: BossRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 単語帳ごとのボス（すべてオリジナル）
export type BossLook = { name: string; color: string; line: string; eye: string; desc?: string; deco?: string; taunt?: { en: string; ja: string } }

export const BOSSES: Record<Level, BossLook> = {
  中1: { name: 'ヤミモチ', desc: '中1の単語をこっそり食べてしまう、やみのモチ。', color: '#6d28d9', line: '#3b0764', eye: '#fde047' },
  中2: { name: 'ホノオモチ', desc: 'まちがえるほど燃えあがる、熱いモチ。', color: '#dc2626', line: '#7f1d1d', eye: '#fef08a' },
  中3: { name: 'コオリモチ', desc: 'むずかしい単語でみんなをこおらせるモチ。', color: '#0ea5e9', line: '#0c4a6e', eye: '#f0f9ff' },
  高校基礎: { name: 'カゲノオオモチ', desc: '高校の単語の影にひそむ、大きなモチ。', color: '#334155', line: '#020617', eye: '#f87171' },
  熟語: { name: 'ナゾナゾモチ', desc: '熟語のなぞなぞで道をふさぐモチ。', color: '#0d9488', line: '#134e4a', eye: '#fde68a' },
  '曜日・月': { name: 'トケイモチ', desc: '曜日と月を入れかえてしまう、いたずらなモチ。', color: '#ca8a04', line: '#713f12', eye: '#fff7ed' },
  テーマ別: { name: 'ゴチャマゼモチ', desc: 'いろんなテーマをごちゃまぜにするモチ。', color: '#db2777', line: '#831843', eye: '#fdf2f8' },
  数: { name: 'カゾエモチ', desc: '数を数えるのが大すきだが、よくまちがえるモチ。', color: '#4f46e5', line: '#1e1b4b', eye: '#fef9c3' },
  '色・形': { name: 'ニジイロモチ', desc: '色と形をぬすんで虹にしてしまうモチ。', color: '#f43f5e', line: '#881337', eye: '#ecfeff' },
  会話: { name: 'オシャベリモチ', desc: 'あいさつを聞くまで通してくれない、おしゃべりなモチ。', color: '#0891b2', line: '#164e63', eye: '#fefce8' },
}

// 今日のボス：選んでいる単語帳から日付で1つ
export const DAILY_BOSS_COINS = 15
export function dailyBossLevel<T>(levels: T[], day: string): T | undefined {
  if (levels.length === 0) return undefined
  let h = 3
  for (const c of day) h = (h * 41 + c.charCodeAt(0)) >>> 0
  return levels[h % levels.length]
}

// ボスの問題：単語の4択。grammar のときは4問に1問を文法問題にする（単語にひもづかないので id は空）
export function bossQuestions(words: Word[], grammar: boolean) {
  const qs = makeQuiz(WORDS, (w) => w.ja, BOSS_QUESTIONS, Math.random, words)
  if (!grammar) return qs
  return qs.map((q, i) => {
    if (i % 4 !== 3) return q
    const g = grammarMixQ()
    return { word: { id: '', en: g.prompt, ja: g.choices[g.answer], example: '', exampleJa: '', level: '高校基礎' } as Word, choices: g.choices, answer: g.answer }
  })
}

// バトル結果のランク：ハートが減らず会心3回以上で S、ハートが2つ以上で A、それ以外は B
export type Rank = 'S' | 'A' | 'B'
export const RANK_S_COINS = 10

export function battleRank(hearts: number, crits: number): Rank {
  if (hearts >= HEARTS && crits >= 3) return 'S'
  if (hearts >= 2) return 'A'
  return 'B'
}

// いかりモード：HPが半分以下になると、3問に1問が「チャンス問題」（正解でダメージ2倍）
export const isEnraged = (hp: number, maxHp: number) => hp > 0 && hp <= maxHp / 2
export const isChance = (enraged: boolean, index: number) => enraged && index % 3 === 2

// ボスラッシュ：中1→中2→中3のボスと3連戦（ハートは引き継ぎ）。1日1回、全部たおすと大きなごほうび
export const RUSH_LEVELS: Level[] = ['中1', '中2', '中3']
export const RUSH_COINS = 100

const RUSH_KEY = 'eitan:rush'

export function loadRushDay(): string {
  try {
    return localStorage.getItem(RUSH_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveRushDay(d: string): void {
  try {
    localStorage.setItem(RUSH_KEY, d)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
