// 読解ボス：ステージのボスは、その学年の長文2本から問題を出す（空所補充・内容一致○×・英問英答）
import { BOSS_QUESTIONS } from './boss'
import { LONG_PASSAGES, splitSentences, type LongPassage } from './longreading'
import type { Level, Word } from './words'

export type BossHint = { note?: string; quote?: string } // note：答えの語をかくした解説、quote：根拠になる本文の1文
export type ReadingQ = { word: Word; choices: string[]; answer: number; passage: LongPassage; blank?: string; hint?: BossHint } // blank：空所の問題ならその記号（A など）

// ヒント用：解説の中の答えの語を ＿＿ にかくす
export function maskAnswer(why: string, answer: string): string {
  const esc = answer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return why.replace(new RegExp(`(?<![A-Za-z])${esc}(?![A-Za-z])`, 'gi'), '＿＿')
}

const STOP = new Set('a an the is are was were be been am to of and or in on at for it its he she they we i you that this with did does do not what why how who when where which his her their my our by from as have has had will would can could there them him me us so but very about into after before than then'.split(' '))
const stems = (t: string) => new Set((t.toLowerCase().match(/[a-z]+/g) ?? []).filter((x) => x.length > 2 && !STOP.has(x)).map((x) => x.slice(0, 5)))

// ヒント用：問題文（と答え）といちばん多く語が重なる本文の1文（根拠）。重なりが2語未満なら出さない
export function evidenceSentence(p: LongPassage, text: string): string | undefined {
  const want = stems(text)
  let best: string | undefined
  let score = 1
  for (const sent of p.paragraphs.flatMap((t) => splitSentences(t))) {
    const n = [...stems(sent)].filter((x) => want.has(x)).length
    if (n > score) {
      score = n
      best = sent
    }
  }
  return best
}

// 単語帳のレベル → 長文のレベル（中1・中2は中2の長文、中3は中3、そのほかは高校入試。なければ全部から）
export function readingPoolFor(level: Level, list: LongPassage[] = LONG_PASSAGES): LongPassage[] {
  const tag = level === '中1' || level === '中2' ? '中2' : level === '中3' ? '中3' : '高校入試'
  const pool = list.filter((p) => p.level.startsWith(tag) && !p.titleQ && !p.paraSeq)
  return pool.length >= 2 ? pool : list.filter((p) => !p.titleQ && !p.paraSeq)
}

const w = (en: string, ja: string): Word => ({ id: '', en, ja, example: '', exampleJa: '', level: '中2' }) as Word

// 長文1本ぶんの問題（本文の順：空所 → ○× → 英問英答）
export function passageQs(p: LongPassage): ReadingQ[] {
  // 段落ごとに文に分ける（Mr. / Mrs. / Dr. などの略語のピリオドでは切らない：longreading の splitSentences）
  const sentences = p.paragraphs.flatMap((t) => splitSentences(t))
  const out: ReadingQ[] = []
  for (const b of p.blanks) {
    const sent = sentences.find((s) => s.includes(`( ${b.id} )`)) ?? `( ${b.id} )`
    out.push({ word: w(`（${b.id}）に入る語は？ ${sent}`, b.choices[b.answer]), choices: b.choices, answer: b.answer, passage: p, blank: b.id, hint: { note: maskAnswer(b.why, b.choices[b.answer]) } })
  }
  for (const t of p.tf) out.push({ word: w(`本文と合っている？ ${t.statement}`, t.answer ? '○' : '×'), choices: ['○ 合っている', '× 合っていない'], answer: t.answer ? 0 : 1, passage: p, hint: { quote: evidenceSentence(p, t.statement) } })
  for (const q of p.qa ?? []) out.push({ word: w(q.q, q.choices[q.answer]), choices: q.choices, answer: q.answer, passage: p, hint: { quote: evidenceSentence(p, `${q.q} ${q.choices[q.answer]}`) } })
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

// 本文の1段落を、答えがわかった空所は語を入れた形にして返す（文字列と、うめた空所のならび）
export type PassagePart = string | { id: string; word: string }
export function filledParts(text: string, p: LongPassage, solved: string[]): PassagePart[] {
  const parts: PassagePart[] = []
  let rest = text
  for (;;) {
    const m = rest.match(/\( ([A-Z]) \)/)
    if (!m || m.index === undefined) break
    const b = p.blanks.find((x) => x.id === m[1])
    if (b && solved.includes(b.id)) {
      if (m.index > 0) parts.push(rest.slice(0, m.index))
      parts.push({ id: b.id, word: b.choices[b.answer] })
    } else parts.push(rest.slice(0, m.index + m[0].length))
    rest = rest.slice(m.index + m[0].length)
  }
  if (rest) parts.push(rest)
  // となりあう文字列はまとめる
  return parts.reduce<PassagePart[]>((a, x) => (typeof x === 'string' && typeof a[a.length - 1] === 'string' ? [...a.slice(0, -1), (a[a.length - 1] as string) + x] : [...a, x]), [])
}

// 読解ボスに勝ったときの、読解の竜の英語のひとこと（自作・和訳つき）
export const WIN_LINES: { en: string; ja: string }[] = [
  { en: 'We did it! Reading is our superpower.', ja: 'やったね！ 読むことはぼくたちの超能力だ。' },
  { en: 'Every word you read makes my wings stronger.', ja: 'きみが読む一語一語が、ぼくのつばさを強くするよ。' },
  { en: 'That boss never saw it coming!', ja: 'あのボス、まさかやられるとは思っていなかったね！' },
  { en: "Let's find an even harder story next time.", ja: '次はもっと難しいお話をさがそう。' },
  { en: 'You read like a true dragon rider.', ja: 'きみは本物の竜使いみたいに読むね。' },
]
