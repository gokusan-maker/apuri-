// ホームの今日の課題：今日の読解（かんたんな短い英文）と、その英文に出てくる今日の単語
import { makeLookup } from './glossary'
import { PASSAGES, type Passage } from './reading'
import { WORDS, type Word } from './words'

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
export const todayWords = (day: string): Word[] => wordsInText(dailyShort(day).text)

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
