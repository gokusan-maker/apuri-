// ホームの「今日の文法1問」：日付で決まる文法問題。1日1回、正解でXP+10
import { GRAMMAR, type GrammarQuestion } from './grammar'

export const DAILY_Q_XP = 10
export function dailyQuestion(day: string): { q: GrammarQuestion; unitTitle: string } {
  const all = GRAMMAR.flatMap((u) => u.questions.map((q) => ({ q, unitTitle: u.title })))
  let h = 9
  for (const c of `gq-${day}`) h = (h * 37 + c.charCodeAt(0)) >>> 0
  return all[h % all.length]
}

const KEY = 'eitan:grammar-q-day'
export function loadQDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveQDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
