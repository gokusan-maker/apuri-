// 読解ボス：ステージのボスは、その学年の長文2本から問題を出す（空所補充・内容一致○×・英問英答）
import { BOSS_QUESTIONS } from './boss'
import { LONG_PASSAGES, type LongPassage } from './longreading'
import type { Level, Word } from './words'

export type ReadingQ = { word: Word; choices: string[]; answer: number; passage: LongPassage }

// 単語帳のレベル → 長文のレベル（中1・中2は中2の長文、中3は中3、そのほかは高校入試。なければ全部から）
export function readingPoolFor(level: Level, list: LongPassage[] = LONG_PASSAGES): LongPassage[] {
  const tag = level === '中1' || level === '中2' ? '中2' : level === '中3' ? '中3' : '高校入試'
  const pool = list.filter((p) => p.level.startsWith(tag) && !p.titleQ && !p.paraSeq)
  return pool.length >= 2 ? pool : list.filter((p) => !p.titleQ && !p.paraSeq)
}

const w = (en: string, ja: string): Word => ({ id: '', en, ja, example: '', exampleJa: '', level: '中2' }) as Word

// 長文1本ぶんの問題（本文の順：空所 → ○× → 英問英答）
export function passageQs(p: LongPassage): ReadingQ[] {
  const text = p.paragraphs.join(' ')
  const out: ReadingQ[] = []
  for (const b of p.blanks) {
    const sent = text.split(/(?<=[.!?"])\s+/).find((s) => s.includes(`( ${b.id} )`)) ?? `( ${b.id} )`
    out.push({ word: w(`（${b.id}）に入る語は？ ${sent}`, b.choices[b.answer]), choices: b.choices, answer: b.answer, passage: p })
  }
  for (const t of p.tf) out.push({ word: w(`本文と合っている？ ${t.statement}`, t.answer ? '○' : '×'), choices: ['○ 合っている', '× 合っていない'], answer: t.answer ? 0 : 1, passage: p })
  for (const q of p.qa ?? []) out.push({ word: w(q.q, q.choices[q.answer]), choices: q.choices, answer: q.answer, passage: p })
  return out
}

// ボス1戦ぶん：長文を2本えらんで（r は 0〜1 の乱数）、最大20問
export function readingBossQs(level: Level, r: () => number, n = BOSS_QUESTIONS): ReadingQ[] {
  const pool = readingPoolFor(level)
  const a = Math.floor(r() * pool.length)
  let b = Math.floor(r() * pool.length)
  if (b === a) b = (a + 1) % pool.length
  return [...passageQs(pool[a]), ...passageQs(pool[b])].slice(0, n)
}
