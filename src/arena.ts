// 闘技場（ボス部屋の城の下）：エンドレスで戦う。正解すると1つ上の階、まちがえると1つ下の階へ。
// レベル（0〜14）は COURSES の順（中1〜ネイティブ）で、1レベル20階。いちばん上の上は無限にランダム
import { BOSSES, type BossLook } from './boss'
import { LEVEL_BOSS_LOOK } from './bosscastle'
import { levelUnits } from './grammarcastle'
import { randomQuestion, shuffle, type Question } from './quiz'
import { COURSES, courseWords, type CourseId } from './wordcourse'
import type { Word } from './words'

// 1つのレベルを20階に分ける（中1＝1〜20階、中2＝21〜40階…）。いちばん上のレベルの上は、いろいろなレベルの問題がランダムに出る無限の階（オーナーの要望）
export const ARENA_PER = 20
export const ARENA_ENDLESS = COURSES.length * ARENA_PER // ここ（0から数えた階）から上は無限の階
export const ARENA_BEST_COINS = 5 // 最高記録で新しいレベルに着いたとき
export const ARENA_QUICK_MS = 3000 // 3秒以内に正解すると「はやい！」
export const ARENA_ENDLESS_EVERY = 10 // 無限の階では10階ごとにお祝い
const LAST = COURSES.length - 1
const atLeast0 = (f: number) => Math.max(0, Math.floor(f))
// その階のレベル（0〜14）。無限の階は null
export const arenaLevel = (f: number): number | null => (atLeast0(f) >= ARENA_ENDLESS ? null : Math.floor(atLeast0(f) / ARENA_PER))
export const isArenaEndless = (f: number) => arenaLevel(f) === null
// 新しいレベル（または無限の階）に上がったか
export function isArenaLevelUp(from: number, to: number): boolean {
  if (to <= from) return false
  const a = arenaLevel(from)
  const b = arenaLevel(to)
  if (b === null) return a !== null || Math.floor(to / ARENA_ENDLESS_EVERY) > Math.floor(from / ARENA_ENDLESS_EVERY)
  return a !== null && b > a
}
export const isArenaLevelDown = (from: number, to: number) => to < from && (arenaLevel(to) ?? LAST + 1) < (arenaLevel(from) ?? LAST + 1)
// 正解なら上へ、まちがいなら下へ（1階より下へは行かない）。
// streak（この答えを入れた連続正解の数）が3の倍数になったら、2階ジャンプ
export const ARENA_JUMP_EVERY = 3
export const isArenaJump = (correct: boolean, streak = 0) => correct && streak > 0 && streak % ARENA_JUMP_EVERY === 0
export const arenaNext = (f: number, correct: boolean, streak = 0): number => atLeast0(f + (correct ? (isArenaJump(correct, streak) ? 2 : 1) : -1))
export const arenaCourse = (f: number) => COURSES[arenaLevel(f) ?? LAST]
export const arenaLvLabel = (f: number) => (isArenaEndless(f) ? '♾ ランダム' : arenaCourse(f).label)
export const arenaFloor = (f: number): string => `${atLeast0(f) + 1}階（${isArenaEndless(f) ? 'ランダム' : `${arenaCourse(f).label}レベル`}）`
// 階ごとの称号（結果で伝える）。レベルの区切りで上がる
const TITLES: [number, string][] = [
  [ARENA_ENDLESS, '👑 伝説の英語王'],
  [12 * ARENA_PER, '🦸 英雄'],
  [9 * ARENA_PER, '⚔ 勇者'],
  [6 * ARENA_PER, '🛡 騎士'],
  [3 * ARENA_PER, '🗡 戦士'],
  [ARENA_PER, '🔰 ルーキー'],
  [0, '🌱 見習い'],
]
export const arenaTitle = (f: number): string => TITLES.find(([min]) => atLeast0(f) >= min)![1]
// 塔の空の色：下のレベルは青空、上へ行くほど夕焼け→星空、無限の階は宇宙
export function arenaSky(f: number): [string, string] {
  const lv = arenaLevel(f)
  if (lv === null) return ['#4c1d95', '#020617']
  const t = lv / LAST
  if (t < 0.34) return ['#0ea5e9', '#1e3a8a']
  if (t < 0.67) return ['#f97316', '#7c2d12']
  return ['#4c1d95', '#020617']
}
// その階から始まる称号のアイコン（塔の階に小さく出す。1階の見習いは出さない）
export function arenaTitleIconAt(f: number): string | null {
  const t = TITLES.find(([min]) => min === f && min > 0)
  return t ? t[1].split(' ')[0] : null
}
// 次の称号まであと何階か（いちばん上の称号なら null）
export function arenaNextTitle(f: number): { title: string; floors: number } | null {
  const next = [...TITLES].reverse().find(([min]) => min > atLeast0(f))
  return next ? { title: next[1], floors: next[0] - atLeast0(f) } : null
}
// そのレベルの相手：そのレベルのボスのキャラクター
export const arenaLook = (f: number): BossLook => BOSSES[LEVEL_BOSS_LOOK[arenaCourse(f).id]]
// えらんだレベルのいちばん下の階から始める
export const arenaStart = (course: CourseId): number => Math.max(0, COURSES.findIndex((c) => c.id === course)) * ARENA_PER
export const isArenaGrammar = (q: Question<Word>) => q.word.id.startsWith('g:')
// そのレベルの文法の問題を1問（単語の問題と同じ形にする）
function arenaGrammarQ(lv: number, rnd: () => number): Question<Word> | null {
  const units = levelUnits(COURSES[lv].id).filter((u) => u.questions.length > 0)
  if (units.length === 0) return null
  const u = units[Math.floor(rnd() * units.length)]
  const k = Math.floor(rnd() * u.questions.length)
  const g = u.questions[k]
  return { word: { id: `g:${u.id}:${k}`, en: g.sentence, ja: g.choices[g.answer], example: '', exampleJa: '' } as Word, choices: g.choices, answer: g.answer }
}
// 読解：そのレベルの単語の例文を読んで、正しい意味をえらぶ（文の内容をつかむ問題）
export const isArenaReading = (q: Question<Word>) => q.word.id.startsWith('r:')
function arenaReadingQ(lv: number, rnd: () => number): Question<Word> | null {
  const pool = courseWords(COURSES[lv].id).filter((w) => w.example && w.exampleJa)
  if (pool.length < 4) return null
  const w = pool[Math.floor(rnd() * pool.length)]
  const others = shuffle(pool.filter((x) => x.exampleJa !== w.exampleJa), rnd)
    .map((x) => x.exampleJa)
    .filter((t, k, a) => a.indexOf(t) === k)
    .slice(0, 3)
  const choices = shuffle([w.exampleJa, ...others], rnd)
  return { word: { ...w, id: `r:${w.id}`, en: w.example, ja: w.exampleJa }, choices, answer: choices.indexOf(w.exampleJa) }
}
// n 問目（0から）の問題：単語 → 文法 → 読解 の順にくり返す（オーナーの要望：単語以外も）。直前と同じ問題は避ける
export type ArenaKind = 'word' | 'grammar' | 'reading'
export const arenaKindAt = (n: number): ArenaKind => (['word', 'grammar', 'reading'] as const)[n % 3]
// f は階。無限の階では、毎問ランダムなレベルから出す
export function arenaQuestionAt(f: number, n: number, rnd: () => number = Math.random, avoid?: string): Question<Word> {
  const lv = arenaLevel(f) ?? Math.floor(rnd() * COURSES.length)
  const kind = arenaKindAt(n)
  const make = kind === 'grammar' ? arenaGrammarQ : kind === 'reading' ? arenaReadingQ : null
  if (make) {
    let q = make(lv, rnd)
    for (let k = 0; k < 3 && q && avoid && q.word.id === avoid; k++) q = make(lv, rnd)
    if (q) return q
  }
  return arenaWordQ(lv, rnd, avoid)
}
// そのレベル（0〜14）の単語から1問（直前と同じ単語は避ける）
function arenaWordQ(lv: number, rnd: () => number, avoid?: string): Question<Word> {
  const words = courseWords(COURSES[lv].id)
  let q = randomQuestion(words, (w) => w.ja, rnd)
  for (let k = 0; k < 3 && avoid && q.word.id === avoid; k++) q = randomQuestion(words, (w) => w.ja, rnd)
  return q
}

// いちばん高く上がった階（0から数える）。前は「レベル」で保存していたので、読みこむときにそのレベルの1階目に直す
const BEST_KEY = 'eitan:arena-best-floor'
const OLD_BEST_KEY = 'eitan:arena-best'
const readInt = (k: string): number | null => {
  const raw = localStorage.getItem(k)
  const v = Number(raw)
  return raw !== null && Number.isInteger(v) && v >= 0 ? v : null
}
export function loadArenaBest(): number | null {
  try {
    const v = readInt(BEST_KEY)
    if (v !== null) return v
    const old = readInt(OLD_BEST_KEY)
    return old === null ? null : Math.min(old, LAST) * ARENA_PER
  } catch {
    return null
  }
}
export function recordArenaBest(f: number): boolean {
  const best = loadArenaBest()
  if (best !== null && best >= f) return false
  try {
    localStorage.setItem(BEST_KEY, String(atLeast0(f)))
  } catch {
    /* 保存できなくても動く */
  }
  return true
}
