// 読解のレベル：中1（短い英文）〜高3・私学〜東大・TOEIC・TOEFL/IELTS・ネイティブ
import { ADV_PASSAGES } from './advreading'
import { PASSAGES } from './reading'
import { LONG_PASSAGES, type LongPassage, type LongRecord } from './longreading'
import { tierOf, withTranslation } from './examtier'

// 単語・文法と同じ15レベル（中1 は短い読解、ほかは長文）
export type ReadLevel = '中1' | '中2' | '中3' | '高1' | '高2' | '高3' | '私学' | '私学難関' | '国公立' | '旧帝大' | '京大' | '東大' | 'TOEIC' | 'TOEFL・IELTS' | 'ネイティブ'
export const READ_LEVELS: { id: ReadLevel; label: string; sub: string }[] = [
  { id: '中1', label: '中1', sub: '短い英文' },
  { id: '中2', label: '中2', sub: '中学2年の長文' },
  { id: '中3', label: '中3', sub: '中学3年の長文' },
  { id: '高1', label: '高1', sub: '高校入試〜高1' },
  { id: '高2', label: '高2', sub: '高校2年' },
  { id: '高3', label: '高3', sub: '共通テスト' },
  { id: '私学', label: '私学', sub: '私立大' },
  { id: '私学難関', label: '私学難関', sub: '早慶・私立医学部' },
  { id: '国公立', label: '国公立', sub: '国公立大（和訳つき）' },
  { id: '旧帝大', label: '旧帝大', sub: '旧帝大（和訳つき）' },
  { id: '京大', label: '京大', sub: '京都大（和訳つき）' },
  { id: '東大', label: '東大', sub: '東京大' },
  { id: 'TOEIC', label: 'TOEIC', sub: 'メール・お知らせ' },
  { id: 'TOEFL・IELTS', label: 'TOEFL・IELTS', sub: '留学・アカデミック' },
  { id: 'ネイティブ', label: 'ネイティブ', sub: '評論・アカデミック' },
]

const head = (p: LongPassage) => p.level.split('（')[0]
const hsAdv = ADV_PASSAGES.filter((p) => head(p) === '高校入試')
const univ = ADV_PASSAGES.filter((p) => head(p) === '難関大')
const tier = (...ts: string[]) => univ.filter((p) => ts.includes(tierOf(p))).map((p) => withTranslation(p, univ))

// レベルごとの長文（中1 は短い読解なので空）
export function passagesFor(level: ReadLevel): LongPassage[] {
  switch (level) {
    case '中2':
      return LONG_PASSAGES.filter((p) => ['中2', '初級'].includes(head(p)))
    case '中3':
      return LONG_PASSAGES.filter((p) => ['中2〜中3', '中3'].includes(head(p)))
    case '高1':
      return [...LONG_PASSAGES.filter((p) => ['中3〜高校入試', '高校入試'].includes(head(p))), ...hsAdv.slice(0, Math.ceil(hsAdv.length / 2))]
    case '高2':
      return hsAdv.slice(Math.ceil(hsAdv.length / 2))
    case '高3':
      return tier('kyotsu')
    case '私学':
      return tier('shiritsu')
    case '私学難関':
      return tier('shiritsu-med')
    case '国公立':
      return tier('kokkoritsu')
    case '旧帝大':
      return tier('kyutei')
    case '京大':
      return tier('kokuritsu-med')
    case '東大':
      return tier('kyutei', 'kokuritsu-med')
    case 'TOEIC':
      return [...univ.filter((p) => /メール|お知らせ/.test(p.level)), ...LONG_PASSAGES.filter((p) => head(p).startsWith('中3') && /メール|お知らせ/.test(p.level))]
    case 'TOEFL・IELTS':
      return ADV_PASSAGES.filter((p) => head(p) === 'TOEFL・IELTS')
    case 'ネイティブ':
      return [...tier('kyutei', 'kokuritsu-med'), ...ADV_PASSAGES.filter((p) => head(p) === 'TOEFL・IELTS').slice(-20)]
    default:
      return []
  }
}

// まえのレベル（かんたん〜TOEFL・難関大の入試レベル）から新しいレベルへ
const OLD: Record<string, ReadLevel> = { easy: '中1', normal: '中2', exam: '中3', univ: '高3', toefl: 'TOEFL・IELTS' }
const OLD_TIER: Record<string, ReadLevel> = { kyotsu: '高3', shiritsu: '私学', 'shiritsu-med': '私学難関', kokkoritsu: '国公立', kyutei: '旧帝大', 'kokuritsu-med': '京大' }

const KEY = 'eitan:read-level'
export function loadReadLevel(): ReadLevel {
  try {
    const v = localStorage.getItem(KEY)
    if (READ_LEVELS.some((l) => l.id === v)) return v as ReadLevel
    if (v === 'univ') return OLD_TIER[localStorage.getItem('eitan:exam-tier') ?? ''] ?? '高3'
    return (v && OLD[v]) || '中1'
  } catch {
    return '中1'
  }
}
export function saveReadLevel(l: ReadLevel): void {
  try {
    localStorage.setItem(KEY, l)
  } catch {
    // 保存できなくても続ける
  }
}

// そのむずかしさで解いた本数と全部の本数（かんたん は短い読解の解いた話）
export function solvedOf(level: ReadLevel, record: LongRecord, shortDone: string[] = []): { done: number; total: number } | null {
  if (level === '中1') return { done: PASSAGES.filter((p) => shortDone.includes(p.id)).length, total: PASSAGES.length }
  const ps = passagesFor(level)
  return { done: ps.filter((p) => record[p.id] !== undefined).length, total: ps.length }
}

// むずかしさごとの「今日のおすすめ1本」（同じ日は同じ。日ごとにかわる）
export function dailyPick(list: LongPassage[], day: string): LongPassage | undefined {
  if (list.length === 0) return undefined
  let h = 5
  for (const c of day) h = (h * 37 + c.charCodeAt(0)) >>> 0
  return list[h % list.length]
}

// 1つ下のレベルを半分以上解いたら、そのレベルに「⭐ちょうせん」印（次のレベルにすすむきっかけ）
export function readyFor(level: ReadLevel, record: LongRecord, shortDone: string[] = []): boolean {
  const i = READ_LEVELS.findIndex((l) => l.id === level)
  if (i <= 0) return false
  const prev = solvedOf(READ_LEVELS[i - 1].id, record, shortDone)!
  const cur = solvedOf(level, record, shortDone)!
  return prev.total > 0 && prev.done * 2 >= prev.total && cur.done < cur.total
}
