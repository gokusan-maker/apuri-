// ホームの今日の課題：今日の読解（かんたんな短い英文）と、その英文に出てくる今日の単語
import { makeLookup } from './glossary'
import { PASSAGES, type Passage } from './reading'
import { loadGrade, WORD_LEVELS_FOR } from './usergrade'
import { levelOf, WORDS, type Word } from './words'

// あたりまえすぎて課題にしない語
const SKIP = new Set(['a', 'an', 'the', 'i', 'is', 'am', 'are', 'was', 'were', 'be', 'to', 'of', 'in', 'on', 'at', 'and', 'but', 'or', 'it', 'he', 'she', 'we', 'you', 'they', 'my', 'your', 'his', 'her', 'our', 'their', 'me', 'him', 'us', 'them', 'this', 'that', 'do', 'does', 'did', 'have', 'has', 'not', 'no', 'yes', 'so', 'for', 'with', 'by', 'very'])

function dayHash(day: string): number {
  let h = 11
  for (const c of day) h = (h * 33 + c.charCodeAt(0)) >>> 0
  return h
}

// 今日の読解：短い読解から日ごとに1本（同じ日は同じ）
export const dailyShort = (day: string, list: Passage[] = PASSAGES): Passage => list[dayHash(day) % list.length]

// 英文に出てくる単語帳の単語（出てきた順・重複なし・最大 max 語）
export function wordsInText(text: string, max = 5, words: Word[] = WORDS): Word[] {
  const lookup = makeLookup(words)
  const out: Word[] = []
  for (const tok of text.split(/\s+/)) {
    const w = lookup(tok)
    if (w && !SKIP.has(w.en.toLowerCase()) && !out.includes(w)) out.push(w)
    if (out.length >= max) break
  }
  return out
}

// 今日の単語：今日の読解に出てくる単語（4択で練習してから英文を読む）
// 学年をえらんでいて中1より上なら、その学年の単語帳から日ごとに5語（同じ日は同じ）
export function todayWords(day: string): Word[] {
  const g = loadGrade()
  if (!g || g === 'j1') return wordsInText(dailyShort(day).text)
  const pool = WORDS.filter((w) => WORD_LEVELS_FOR[g].includes(levelOf(w)))
  if (pool.length < 5) return wordsInText(dailyShort(day).text)
  const h = dayHash(day)
  const out: Word[] = []
  for (let i = 0; out.length < 5 && i < pool.length; i++) {
    const w = pool[(h + i * 7919) % pool.length]
    if (!out.includes(w)) out.push(w)
  }
  return out
}

function load(key: string): string {
  try {
    return localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}
function save(key: string, day: string): void {
  try {
    localStorage.setItem(key, day)
  } catch {
    // 保存できなくても続ける
  }
}
const WORDS_KEY = 'eitan:today-words'
const SHORT_KEY = 'eitan:daily-short'
export const loadTodayWordsDay = () => load(WORDS_KEY)
export const saveTodayWordsDay = (day: string) => save(WORDS_KEY, day)
export const loadDailyShortDay = () => load(SHORT_KEY)
export const saveDailyShortDay = (day: string) => save(SHORT_KEY, day)

// 今日の課題を3つ全部クリアしたときのトリオボーナス（1日1回）：3体のなかまにそれぞれ XP
export const TRIO_XP = 30
const TRIO_KEY = 'eitan:trio-day'
export const loadTrioDay = () => load(TRIO_KEY)
export const saveTrioDay = (day: string) => save(TRIO_KEY, day)

// トリオボーナスの連続日数（3日続くごとに🎟ガチャチケット）
export const TRIO_TICKET_DAYS = 3
export const TRIO_WEEK_DAYS = 7 // 7日連続で特別に🎟2枚
const TRIO_STREAK_KEY = 'eitan:trio-streak'
type TrioStreak = { last: string; count: number }
function prevDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number)
  const t = new Date(y, m - 1, d - 1)
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}
export function loadTrioStreak(): TrioStreak {
  try {
    const v = JSON.parse(localStorage.getItem(TRIO_STREAK_KEY) ?? 'null') as Partial<TrioStreak> | null
    return v && typeof v.last === 'string' && typeof v.count === 'number' ? { last: v.last, count: v.count } : { last: '', count: 0 }
  } catch {
    return { last: '', count: 0 }
  }
}
// 今日トリオボーナスを受け取ったときの連続日数。ticket は3日ごとのチケット
export function claimTrioStreak(day: string): { count: number; ticket: boolean; week: boolean } {
  const s = loadTrioStreak()
  if (s.last === day) return { count: s.count, ticket: false, week: false }
  const count = s.last === prevDay(day) ? s.count + 1 : 1
  try {
    localStorage.setItem(TRIO_STREAK_KEY, JSON.stringify({ last: day, count }))
  } catch {
    // 保存できなくても続ける
  }
  return { count, ticket: count % TRIO_TICKET_DAYS === 0, week: count % TRIO_WEEK_DAYS === 0 }
}

// 今日の課題を1つクリアするごとに、その課題のなかま（単語・文法・読解）にあげる XP
export const TASK_XP = 10

// いまのトリオボーナスの連続日数（今日かきのうに受け取っていれば続いている。とぎれていれば0）
export function trioStreakNow(day: string): number {
  const s = loadTrioStreak()
  return s.last === day || s.last === prevDay(day) ? s.count : 0
}
