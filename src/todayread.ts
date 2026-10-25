// 今日の読解：学年が中1（またはえらんでいない）ならかんたんな短い英文、中2より上はその学年のむずかしさの長文から日ごとに1本
import { dailyShort } from './dailyread'
import { LONG_PASSAGES, shownTitle, type LongPassage } from './longreading'
import type { Passage } from './reading'
import { dailyPick, passagesFor } from './readlevel'
import { loadGrade, READ_LEVEL_FOR } from './usergrade'

export type TodayReading = { kind: 'short'; p: Passage } | { kind: 'long'; p: LongPassage }

export function todayReading(day: string): TodayReading {
  const g = loadGrade()
  const long = g && g !== 'j1' ? dailyPick(passagesFor(READ_LEVEL_FOR[g]), day) : undefined
  return long ? { kind: 'long', p: long } : { kind: 'short', p: dailyShort(day) }
}

// ボタンに出す題名：タイトルを当てる問題がある長文は、答えがわからないように「タイトルを当てる読解 No.〇」
export function todayReadingTitle(day: string): string {
  const r = todayReading(day)
  return r.kind === 'long' ? shownTitle(r.p, LONG_PASSAGES.indexOf(r.p)) : r.p.title
}

// 今日の課題は2問まで（多すぎないように）：空所2つ（足りなければ○×）だけ。ほかの空所は答えを本文にうめておく
export const TODAY_READING_QS = 2
export function trimForToday(p: LongPassage, n = TODAY_READING_QS): LongPassage {
  const blanks = p.blanks.slice(0, n)
  const tf = p.tf.slice(0, Math.max(0, n - blanks.length))
  const fill = (t: string) =>
    t
      .replace(/\( ([A-Z]) \)/g, (m, id: string) => {
        if (blanks.some((b) => b.id === id)) return m
        const b = p.blanks.find((x) => x.id === id)
        return b ? b.choices[b.answer] : m
      })
      .replace(/\[ (\d+) \]/g, (m, id: string) => {
        const sb = p.sentences?.find((x) => x.id === id)
        return sb ? sb.choices[sb.answer] : m
      })
  return { id: p.id, title: p.title, level: p.level, paragraphs: p.paragraphs.map(fill), ja: p.ja, blanks, tf, table: p.table }
}
