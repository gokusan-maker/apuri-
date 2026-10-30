// ボス戦：単語帳の全ステージをクリアすると挑戦できる。
import { stagesOf, type StageRecord } from './stages'
import { levelOf, WORDS, type Level, type Word } from './words'
import { makeQuiz, shuffle } from './quiz'
import { GRAMMAR, gradeOf, type GrammarUnit } from './grammar'
import { EXAM_GRAMMAR } from './examgrammar'
import { maskAnswer } from './readhint'

export const BOSS_HP = 240 // オーナーの要望でボスの体力アップ（100→150→240）
export const HEARTS = 3
export const BOSS_QUESTIONS = 36 // 体力240：ボーナスなしだと36問中25問の正解が必要（負けそうで勝てる）
export const BOSS_XP = 100
export const HEAL_COST = 10 // ハート回復のコイン
export const CONTINUE_COST = 20 // 負けたときのコンティニュー（1戦1回）
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
  ビジネス: { name: 'シメキリモチ', desc: '締め切りをちらつかせて追いかけてくる、いそがしいモチ。', color: '#1d4ed8', line: '#1e3a8a', eye: '#fef3c7' },
  英検2級: { name: 'ゴウカクモチ', deco: 'mortarboard', desc: '英検2級の合格の門を守る、きびしい試験官のモチ。', color: '#b45309', line: '#451a03', eye: '#fef3c7' },
  英検準1級: { name: 'ハカセモチ', deco: 'scholar', desc: '難しい単語の本を何冊も読みあさる、物知りの博士モチ。', color: '#4338ca', line: '#1e1b4b', eye: '#fde68a' },
  英検1級: { name: 'ラスボスモチ', deco: 'lastboss', desc: '英検の頂上で待ちかまえる、最強の単語の王モチ。', color: '#7f1d1d', line: '#1c0505', eye: '#fde047' },
  ネイティブ: { name: 'ペラペラモチ', deco: 'speaker', desc: '早口のスラングで話しかけてくる、本場のおしゃべりモチ。', color: '#0f766e', line: '#042f2e', eye: '#fef08a' },
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
// ボスの単語帳のレベルに合わせた文法の単元（中1のボスに高校の文法を出さない）
export function grammarGradesForLevel(level: Level | undefined): ('中1' | '中2' | '中3' | '高校')[] {
  if (level === '中2') return ['中1', '中2']
  if (level === '中3') return ['中2', '中3']
  if (level === '英検2級' || level === '英検準1級' || level === '英検1級' || level === 'ネイティブ') return ['高校']
  if (level === '高校基礎' || level === '熟語' || level === 'ビジネス') return ['中3', '高校']
  return ['中1'] // 中1と、曜日・数・色などの基本の単語帳
}
export function grammarForLevel(level: Level | undefined): GrammarUnit[] {
  // 英検2級より上のボスは、入試の文法もまぜる（英検2級＝共通テスト・私立、準1級＝国公立・旧帝大、1級・ネイティブ＝旧帝大・医学部）
  const exam = level === '英検2級' ? ['exam-kyotsu', 'exam-shiritsu'] : level === '英検準1級' ? ['exam-kokkoritsu', 'exam-kyutei'] : level === '英検1級' || level === 'ネイティブ' ? ['exam-kyutei', 'exam-kokuritsu-med', 'exam-shiritsu-med'] : []
  if (level === '英検1級' || level === 'ネイティブ') return EXAM_GRAMMAR.filter((u) => exam.includes(u.id))
  const grades = grammarGradesForLevel(level)
  const list = [...GRAMMAR.filter((u) => grades.includes(gradeOf(u.id))), ...EXAM_GRAMMAR.filter((u) => exam.includes(u.id))]
  return list.length > 0 ? list : GRAMMAR
}

// 単語の問題：まちがいの選択肢も同じ単語帳から（4つそろわないときだけ全部から）
const wordQuiz = (words: Word[], n: number, rnd: () => number) => makeQuiz(words.length >= 8 ? words : WORDS, (w) => w.ja, n, rnd, words)

export function bossQuestions(words: Word[], grammar: boolean) {
  const qs = wordQuiz(words, BOSS_QUESTIONS, Math.random)
  if (!grammar) return qs
  const units = grammarForLevel(words[0] ? levelOf(words[0]) : undefined)
  return qs.map((q, i) => {
    if (i % 4 !== 3) return q
    const u = units[Math.floor(Math.random() * units.length)]
    const g = u.questions[Math.floor(Math.random() * u.questions.length)]
    return { word: { id: '', en: g.sentence, ja: g.choices[g.answer], example: '', exampleJa: '' } as Word, choices: g.choices, answer: g.answer, hint: maskAnswer(g.why, g.choices[g.answer]) }
  })
}

// チームバトル：単語・文法・読解のなかまが順番にボスを攻撃する（オーナーの要望：ボス戦なのに単語だけにしない）
// 単語＝単語の意味、文法＝___ 穴埋め（ボスの単語帳のレベルの単元から）、読解＝英文を読んで意味をえらぶ
export type TeamRole = 'word' | 'grammar' | 'reading'
export const TEAM_ORDER: TeamRole[] = ['word', 'grammar', 'reading']
export type TeamQ = { word: Word; choices: string[]; answer: number; team: TeamRole; hint?: string } // hint：💡ヒントの解説（答えはかくす）

// readingQs：読解ボスのときは、読解の番に本文の問題を順に出す
export function teamBossQuestions<R extends { word: Word; choices: string[]; answer: number }>(words: Word[], rnd: () => number = Math.random, n = BOSS_QUESTIONS, readingQs?: R[], grammarUnits?: GrammarUnit[]): (TeamQ | (R & { team: 'reading' }))[] {
  const wordQs = wordQuiz(words, n, rnd)
  const units = grammarUnits && grammarUnits.length > 0 ? grammarUnits : grammarForLevel(words[0] ? levelOf(words[0]) : undefined)
  const sentences = words.filter((w) => w.example && w.exampleJa)
  const pool = sentences.length >= 4 ? sentences : WORDS.filter((w) => w.example && w.exampleJa)
  const out: (TeamQ | (R & { team: 'reading' }))[] = []
  let ri = 0
  for (let i = 0; i < n; i++) {
    const role = TEAM_ORDER[i % TEAM_ORDER.length]
    if (role === 'grammar') {
      const u = units[Math.floor(rnd() * units.length)]
      const g = u.questions[Math.floor(rnd() * u.questions.length)]
      out.push({ word: { id: '', en: g.sentence, ja: g.choices[g.answer], example: '', exampleJa: '' } as Word, choices: g.choices, answer: g.answer, team: 'grammar', hint: maskAnswer(g.why, g.choices[g.answer]) })
    } else if (role === 'reading' && readingQs && readingQs.length > 0) {
      out.push({ ...readingQs[ri++ % readingQs.length], team: 'reading' })
    } else if (role === 'reading') {
      const w = pool[Math.floor(rnd() * pool.length)]
      const others = shuffle(pool.filter((x) => x.exampleJa !== w.exampleJa), rnd)
        .map((x) => x.exampleJa)
        .filter((t, k, a) => a.indexOf(t) === k)
        .slice(0, 3)
      const choices = shuffle([w.exampleJa, ...others], rnd)
      out.push({ word: { ...w, id: '', en: w.example, ja: w.exampleJa }, choices, answer: choices.indexOf(w.exampleJa), team: 'reading' })
    } else out.push({ ...wordQs[i % wordQs.length], team: 'word' })
  }
  return out
}

// 合体技：単語→文法→読解の3体が続けて正解すると、読解の番で3体の合体技（ダメージ+15）
export const TEAM_COMBO_DAMAGE = 15
export const isTeamCombo = (role: TeamRole | undefined, combo: number) => role === 'reading' && combo >= 3

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

// ためこうげき：5問に1問、ボスが力をためる。まちがえるとハート2つ、正解ならボスがひるんでダメージ+5
export const CHARGE_STUN = 5
export const isCharge = (enraged: boolean, index: number) => index % 5 === 4 && !isChance(enraged, index)

// ボスラッシュ：中1→中2→中3のボスと3連戦（ハートは引き継ぎ）。1日1回、全部たおすと大きなごほうび
export const RUSH_LEVELS: Level[] = ['中1', '中2', '中3']
export const RUSH_COINS = 100
// 週末限定ボスラッシュEX：むずかしいボスと3連戦。ごほうび2倍（🪙200＋🎟2）
export const RUSH_EX_LEVELS: Level[] = ['中3', '高校基礎', '熟語']
export const RUSH_EX_COINS = 200

const RUSH_KEY = 'eitan:rush'
const RUSH_EX_KEY = 'eitan:rush-ex'

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

// ボスの撃破セリフ：倒されたときのひとこと（ボスの名前で決まる）
export const DEFEAT_LINES: { en: string; ja: string }[] = [
  { en: 'No way... You know too many words!', ja: 'そんな…きみは単語を知りすぎている！' },
  { en: 'I will be back after I study more!', ja: 'もっと勉強してから、また来るぞ！' },
  { en: 'You are stronger than I thought.', ja: 'きみは思ったより強いな。' },
  { en: 'My words... are all gone!', ja: 'わたしの単語が…ぜんぶ消えた！' },
  { en: 'Well done. You may go on.', ja: 'みごとだ。先へ進むがいい。' },
  { en: 'Next time, I will not lose!', ja: '次は負けないからな！' },
  { en: 'Your partner is amazing, too.', ja: 'きみの相棒もすごいな。' },
  { en: 'I need a little rest now...', ja: 'ちょっと休ませてくれ…' },
]

// 登場セリフ（戦いの始めにひとこと）
export const INTRO_LINES: { en: string; ja: string }[] = [
  { en: 'Can you answer my questions?', ja: 'わたしの問題に答えられるかな？' },
  { en: "Let's see how many words you know!", ja: 'きみがどれだけ単語を知っているか見てやろう！' },
  { en: 'I have been waiting for you.', ja: 'きみを待っていたぞ。' },
  { en: 'You cannot beat me so easily!', ja: 'そうかんたんには負けないぞ！' },
  { en: 'Show me what you have learned.', ja: '学んだことを見せてみろ。' },
  { en: 'Are you ready? Here I come!', ja: '準備はいいか？ いくぞ！' },
]

export function introLineOf(name: string): { en: string; ja: string } {
  const n = [...name].reduce((a, c) => (a * 37 + c.charCodeAt(0)) % 9973, 0)
  return INTRO_LINES[n % INTRO_LINES.length]
}

export function defeatLineOf(name: string): { en: string; ja: string } {
  const n = [...name].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 0)
  return DEFEAT_LINES[n % DEFEAT_LINES.length]
}

export function loadRushExDay(): string {
  try {
    return localStorage.getItem(RUSH_EX_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveRushExDay(d: string): void {
  try {
    localStorage.setItem(RUSH_EX_KEY, d)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// ボス戦の連勝：負けると0にもどる。3連勝ごとにボーナス
export const STREAK_EVERY = 3
export const STREAK_COINS = 15
export const STREAK_DRAGON_XP = 30 // 3連勝ごとに読解の竜にあげる XP
const WIN_KEY = 'eitan:win-streak'
export function loadWinStreak(): number {
  try {
    const n = Number(localStorage.getItem(WIN_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function saveWinStreak(n: number): void {
  try {
    localStorage.setItem(WIN_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 1撃の最大ダメージ記録
const MAX_HIT_KEY = 'eitan:max-hit'
export function loadMaxHit(): number {
  try {
    const n = Number(localStorage.getItem(MAX_HIT_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
// 記録を更新したら true
export function recordHit(dmg: number): boolean {
  if (!(dmg > loadMaxHit())) return false
  try {
    localStorage.setItem(MAX_HIT_KEY, String(Math.floor(dmg)))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return true
}

// 金色ボス：日替わりで単語帳のボス1体が金色になる。たおすとおまけコイン
export const GOLDEN_COINS = 20
export function goldenLevelOf<T>(levels: T[], day: string): T | undefined {
  return dailyBossLevel(levels, `gold-${day}`)
}
export const goldenLook = (l: BossLook): BossLook => ({ ...l, name: `金色の${l.name}`, color: '#fbbf24', line: '#92400e', eye: '#7c2d12' })

// 色ちがいボス：ボス戦10回に1回あらわれる。たおすとボス図鑑に「✨色ちがいの〜」が記録される
export const SHINY_EVERY = 10
const BATTLES_KEY = 'eitan:boss-battles'
// ボス戦を1回数えて、色ちがいの回なら true
export function countBattle(): boolean {
  try {
    const n = (Number(localStorage.getItem(BATTLES_KEY) ?? 0) || 0) + 1
    localStorage.setItem(BATTLES_KEY, String(n))
    return n % SHINY_EVERY === 0
  } catch {
    return false
  }
}
export const shinyLook = (l: BossLook): BossLook => ({ ...l, name: `✨色ちがいの${l.name}`, color: '#c4b5fd', line: '#5b21b6', eye: '#be185d' })

// 今日のボスの強さ：★が1つふえるごとに HP+40、ごほうびは★の数の倍
export const dailyHp = (stars: number) => BOSS_HP + (stars - 1) * 60

// ボス戦の背景：単語帳のレベルごとに変える
export const BOSS_BGS = { field: '草原', forest: '森', mountain: '山', night: '夜空', castle: 'お城', sea: '海' } as const
export type BossBg = keyof typeof BOSS_BGS
const BG_OF: Partial<Record<string, BossBg>> = { 中1: 'field', 中2: 'forest', 中3: 'mountain', 高校基礎: 'night', 熟語: 'castle' }
export const bossBgOf = (level: string): BossBg => BG_OF[level] ?? 'sea'

// ボスごとの最短タイム（秒）。記録を更新したら true
const TIME_KEY = 'eitan:boss-times'
export function loadBossTimes(): Record<string, number> {
  try {
    const v = JSON.parse(localStorage.getItem(TIME_KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number' && n > 0)) as Record<string, number>
  } catch {
    return {}
  }
}
export function recordBossTime(name: string, sec: number): boolean {
  const all = loadBossTimes()
  if (all[name] !== undefined && all[name] <= sec) return false
  try {
    localStorage.setItem(TIME_KEY, JSON.stringify({ ...all, [name]: sec }))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return true
}
// デザイン93：まちがえずにたおしたボスの名前（ボス選びの画面に ✨ を出す）
const NOMISS_KEY = 'eitan:boss-nomiss'
export function loadNoMissBosses(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(NOMISS_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function recordNoMissBoss(name: string): void {
  const all = loadNoMissBosses()
  if (all.includes(name)) return
  try {
    localStorage.setItem(NOMISS_KEY, JSON.stringify([...all, name]))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const formatSec = (sec: number) => `${Math.floor(sec / 60)}分${String(sec % 60).padStart(2, '0')}秒`

// ボスの子分：HPが半分になるとあらわれ、次の正解でたおすと🪙2
export const MINION_COINS = 2

// Sランクのごほうびルーレット：コインかバトルアイテムが当たる
export const S_ROULETTE: ({ kind: 'coins'; amount: number } | { kind: 'item'; id: 'bomb' | 'charm' | 'clock' })[] = [
  { kind: 'coins', amount: 5 },
  { kind: 'item', id: 'charm' },
  { kind: 'coins', amount: 10 },
  { kind: 'item', id: 'clock' },
  { kind: 'coins', amount: 20 },
  { kind: 'item', id: 'bomb' },
]
export const sRouletteOf = (r: number) => S_ROULETTE[Math.min(S_ROULETTE.length - 1, Math.floor(r * S_ROULETTE.length))]

// ボスの口ぐせ：正解するたびにボスがひとこと（ボスごとに始まりがちがい、順番にかわる）
export const HURT_LINES: { en: string; ja: string }[] = [
  { en: 'Ouch! That hurts!', ja: 'いたっ！ きいたぞ！' },
  { en: 'Not bad!', ja: 'なかなかやるな！' },
  { en: 'How did you know that?', ja: 'なぜわかったんだ？' },
  { en: 'I will not give up!', ja: 'まだまだあきらめないぞ！' },
  { en: 'You are getting stronger!', ja: 'どんどん強くなっているな！' },
  { en: 'That was a good answer!', ja: 'いい答えだ……！' },
]
export function hurtLineOf(name: string, n: number): { en: string; ja: string } {
  const k = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  return HURT_LINES[(k + n) % HURT_LINES.length]
}

// ボスのねむり：7問ごとに2問、ボスがねむる（その間の正解はダメージ2倍）。ためこうげき・チャンス問題とは重ならない
export const isAsleep = (enraged: boolean, index: number) => index % 7 >= 5 && !isCharge(enraged, index) && !isChance(enraged, index)

// ボスのタイムアタック：30秒であたえたダメージのベスト
export const BOSS_TA_SECONDS = 30
const TA_KEY = 'eitan:boss-ta-best'
export function loadBossTaBest(): number {
  try {
    const n = Number(localStorage.getItem(TA_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function recordBossTaBest(n: number): boolean {
  if (n <= loadBossTaBest()) return false
  try {
    localStorage.setItem(TA_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return true
}

// 強化版ボス：たおしたボスの強いバージョン。HP1.5倍、勝つと🪙10
export const STRONG_HP = Math.round(BOSS_HP * 1.5)
export const STRONG_COINS = 10
// サドンデス：ハート1つでスタート。勝つと🪙20
export const SUDDEN_COINS = 20
// 5コンボ以上でコンボ表示を大きく（「すごいコンボ！」）
export const BIG_COMBO = 5
// 逆転チャンス：ハートがのこり1つになったら正解ダメージ2倍（はじめから1つのサドンデスはのぞく）
export const isComeback = (hearts: number, startHearts: number) => hearts === 1 && startHearts > 1

// おうえんスタンプ：正解するたびに相棒がスタンプでおうえん（5種類を順番に）
export const CHEER_STAMPS = ['👍 ナイス！', '💪 いいぞ！', '✨ すごい！', '🔥 その調子！', '🎯 ばっちり！']
export const cheerStampOf = (n: number) => CHEER_STAMPS[(((n - 1) % CHEER_STAMPS.length) + CHEER_STAMPS.length) % CHEER_STAMPS.length]

// 負けたときの相棒のはげまし（たおせなかった回数で順番に）
export const CHEER_ON_LOSE = ['だいじょうぶ！ つぎはきっと勝てるよ！', '本文をいっしょにもう一度読もう！', 'おしかった！ もう少しだったよ！', 'ぼくもいっしょにがんばるね！']
export const cheerOnLose = (n: number) => CHEER_ON_LOSE[((n % CHEER_ON_LOSE.length) + CHEER_ON_LOSE.length) % CHEER_ON_LOSE.length]

// ボス部屋のボスを全部たおしたごほうび（1回だけ）：称号「ボスハンター」と🎟
export const HUNTER_TICKETS = 3
const HUNTER_KEY = 'eitan:boss-hunter'
export const loadBossHunter = (): boolean => {
  try {
    return localStorage.getItem(HUNTER_KEY) === '1'
  } catch {
    return false
  }
}
export function saveBossHunter(): void {
  try {
    localStorage.setItem(HUNTER_KEY, '1')
  } catch {
    // 保存できなくても続ける
  }
}

// レベルに合わせた攻撃力：なかまのレベル2つごとに正解ダメージ+1（最大+10）
export const levelAttack = (level?: number) => Math.min(10, Math.floor(Math.max(1, level ?? 1) / 2))

// チームバトル：なかま1体ずつに体力がある。まちがえると番のなかまがボスのこうげきを受け、
// 4問ごとにボスの反撃（正解しても来る）。体力が0になったなかまはダウンしてハートが1つ減る
export const MEMBER_HP = 40
export const MEMBER_HIT = 20 // まちがえたときのこうげき
export const CHARGE_HIT = 35 // ためこうげきのとき
export const COUNTER_EVERY = 4
export const COUNTER_DMG = 10
export type TeamHp = Record<TeamRole, number>
export const fullTeamHp = (max = MEMBER_HP): TeamHp => ({ word: max, grammar: max, reading: max })
export const isCounterTurn = (index: number) => index % COUNTER_EVERY === COUNTER_EVERY - 1
// こうげきを受けるなかま：番のなかま（ダウンしていたら、のこっているなかま）。みんなダウンなら undefined
export function hitTarget(hp: TeamHp, prefer: TeamRole): TeamRole | undefined {
  return hp[prefer] > 0 ? prefer : TEAM_ORDER.find((r) => hp[r] > 0)
}
// 反撃は番の次のなかまへ（たおれていない子）
export function counterTarget(hp: TeamHp, turn: TeamRole): TeamRole | undefined {
  const i = TEAM_ORDER.indexOf(turn)
  return [1, 2, 3].map((k) => TEAM_ORDER[(i + k) % TEAM_ORDER.length]).find((r) => hp[r] > 0)
}
export function hitMember(hp: TeamHp, who: TeamRole, dmg: number): { hp: TeamHp; ko: boolean } {
  const next = Math.max(0, hp[who] - dmg)
  return { hp: { ...hp, [who]: next }, ko: hp[who] > 0 && next === 0 }
}
// ダウンしたなかまを体力半分で起こす（おまもり・回復）
export function reviveOne(hp: TeamHp): TeamHp {
  const down = TEAM_ORDER.find((r) => hp[r] <= 0)
  if (down) return { ...hp, [down]: Math.ceil(MEMBER_HP / 2) }
  const low = [...TEAM_ORDER].sort((a, b) => hp[a] - hp[b])[0]
  return { ...hp, [low]: Math.min(MEMBER_HP, hp[low] + Math.ceil(MEMBER_HP / 2)) }
}

// ボスのこうげきの属性：ボスの色で決まる（赤＝炎・青＝氷・黄＝いなずま・緑＝どく・それ以外＝やみ）
export type AttackElem = { id: 'fire' | 'ice' | 'thunder' | 'poison' | 'dark'; icon: string; name: string }
const ELEMS: Record<AttackElem['id'], AttackElem> = {
  fire: { id: 'fire', icon: '🔥', name: 'ほのお' },
  ice: { id: 'ice', icon: '❄', name: 'こおり' },
  thunder: { id: 'thunder', icon: '⚡', name: 'いなずま' },
  poison: { id: 'poison', icon: '🌿', name: 'どく' },
  dark: { id: 'dark', icon: '🌑', name: 'やみ' },
}
export function attackElemOf(color: string): AttackElem {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color)
  if (!m) return ELEMS.dark
  const [r, g, b] = [m[1], m[2], m[3]].map((x) => parseInt(x, 16) / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max - min < 0.15) return ELEMS.dark // 灰色・黒っぽいボス
  const d = max - min
  const h = max === r ? ((g - b) / d + 6) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  const deg = h * 60
  if (deg < 25 || deg >= 330) return ELEMS.fire
  if (deg < 70) return ELEMS.thunder
  if (deg < 165) return ELEMS.poison
  if (deg < 250) return ELEMS.ice
  return ELEMS.dark
}

// ボスのとくぎ：ボスごとに1つ（名前で決まる）。バトル中に発動してじゃまをする
export type BossTrait = 'regen' | 'armor' | 'drain' | 'quick'
export const BOSS_TRAITS: Record<BossTrait, { icon: string; name: string; desc: string; tip: string }> = {
  regen: { icon: '💚', name: 'さいせい', desc: 'HP半分で1回回復（会心なら止まる）', tip: 'HPが半分になる一撃を会心にする' },
  armor: { icon: '🛡', name: 'かたいウロコ', desc: 'ダメージ -2（会心は防げない）', tip: '全部の問題を会心の速さで答える' },
  drain: { icon: '🧛', name: 'きゅうしゅう', desc: 'まちがえるとボスのHPが回復', tip: '1問もまちがえない' },
  quick: { icon: '💨', name: 'すばやさ', desc: '会心の一撃の時間が短い', tip: 'とにかく速く答えて会心を出す' },
}
const TRAIT_ORDER: BossTrait[] = ['regen', 'armor', 'drain', 'quick']
export const REGEN_RATE = 0.15 // さいせい：最大HPの15%
export const ARMOR_BLOCK = 2
export const DRAIN_HEAL = 6
export const QUICK_RATE = 0.7 // すばやさ：会心の時間が7割に
export const SEAL_COINS = 5 // とくぎ封じ：とくぎを1回も発動させずに勝つ
export const SEAL_TICKET_EVERY = 10 // とくぎ封じ10回ごとにガチャチケット
const SEAL_KEY = 'eitan:seal-wins'
// とくぎ封じで勝った回数
export function loadSealWins(): number {
  try {
    const n = Number(localStorage.getItem(SEAL_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
// とくぎの種類ごとの、とくぎ封じで勝った回数
const SEAL_TRAIT_KEY = 'eitan:seal-traits'
export function loadSealTraits(): Partial<Record<BossTrait, number>> {
  try {
    const v = JSON.parse(localStorage.getItem(SEAL_TRAIT_KEY) ?? '{}') as unknown
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as Partial<Record<BossTrait, number>>) : {}
  } catch {
    return {}
  }
}
export function addSealTraits(traits: BossTrait[]): void {
  const v = loadSealTraits()
  for (const t of traits) v[t] = (v[t] ?? 0) + 1
  try {
    localStorage.setItem(SEAL_TRAIT_KEY, JSON.stringify(v))
  } catch {
    /* 保存できなくても動く */
  }
}
export function addSealWin(): number {
  const n = loadSealWins() + 1
  try {
    localStorage.setItem(SEAL_KEY, String(n))
  } catch {
    /* 保存できなくても動く */
  }
  return n
}
export function traitOf(name: string): BossTrait {
  // 名前の文字を混ぜて決める（「～モチ」のように似た名前でも、とくぎがばらける）
  const k = [...name].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 7)
  return TRAIT_ORDER[(k >>> 3) % TRAIT_ORDER.length]
}
// 城の最上階のボスは、とくぎを2つ持つ（名前で決まる1つ目と、ちがう2つ目）
export function bossTraits(name: string, strong = false): BossTrait[] {
  const t = traitOf(name)
  return strong ? [t, TRAIT_ORDER[(TRAIT_ORDER.indexOf(t) + 2) % TRAIT_ORDER.length]] : [t]
}
// 正解したあとのボスのHP（とくぎ込み）。armor：ダメージ-2（最低1）、regen：半分を切ったら1回だけ回復
// 会心の一撃（critical）なら、かたいウロコは防げず、さいせいも止められる（regenSealed）
export function traitAfterHit(trait: BossTrait | BossTrait[], hp: number, nextHp: number, maxHp: number, regenUsed: boolean, critical = false): { hp: number; blocked: number; healed: number; regenSealed: boolean } {
  const ts = Array.isArray(trait) ? trait : [trait]
  let n = nextHp
  let blocked = 0
  if (ts.includes('armor') && n > 0 && !critical) {
    const m = Math.min(hp - 1, n + ARMOR_BLOCK)
    blocked = Math.max(0, m - n)
    n = Math.max(n, m)
  }
  let healed = 0
  let regenSealed = false
  if (ts.includes('regen') && !regenUsed && n > 0 && n <= maxHp / 2) {
    if (critical) regenSealed = true
    else {
      healed = Math.min(maxHp - n, Math.round(maxHp * REGEN_RATE))
      n += healed
    }
  }
  return { hp: n, blocked, healed, regenSealed }
}

// ボス戦の舞台の季節：12〜2月は雪、3〜4月はさくらの花びらが舞う
export type ArenaSeason = 'snow' | 'sakura' | null
export const arenaSeasonOf = (month: number): ArenaSeason => (month === 11 || month <= 1 ? 'snow' : month === 2 || month === 3 ? 'sakura' : null)
