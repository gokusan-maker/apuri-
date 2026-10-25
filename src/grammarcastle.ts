// 文法の城：単元を「大きな項目」（不定詞・動名詞など）にまとめ、1つの項目を 5問×3階 で登る。
// 1階目のはじめにその項目の解説。15問（5単元）ごとに次のまとまりへ
import { GRAMMAR, gradeOf, type GrammarQuestion, type GrammarUnit } from './grammar'
import { EXAM_GRAMMAR } from './examgrammar'
import { LEVEL_GRAMMAR } from './examgrammar2'
import type { GradeId } from './usergrade'

export const FLOOR_QS = 5
export const FLOORS_PER_PART = 3
export const GC_PASS = 4 // 5問中4問正解でその階をクリア

// 上から順に当てはめる（最初にあたったものの項目）
const TOPICS: [string, RegExp][] = [
  ['仮定法', /仮定法|as if|I wish|Without \/ But for|If only/],
  ['分詞構文', /分詞構文|付帯状況/],
  ['倒置・強調', /倒置|強調|部分否定|同格|形式目的語|not 〜 until|no sooner|cannot ～ too/],
  ['関係詞', /関係|what is called/],
  ['現在完了・完了形', /完了|first time|have been to/],
  ['受け身', /受け身|be born|It is said/],
  ['比較', /比較|最上級|as 〜 as|as ～ as|倍数|good \/ well|would rather|not so much|the last ～/],
  ['動名詞', /動名詞|-ing|ing 形|〜ing|～ing/],
  ['不定詞', /不定詞|to ～|to 〜|疑問詞＋to|too ～ to|It takes|It is … for|It is 〜 of|want|in order to|so 〜 as to|be about to|be ready to/],
  ['分詞', /分詞/],
  ['助動詞', /助動詞|can |must|should|may|might|have to|had better|would like|be able to|used to|Shall|would \(often\)|Can I/],
  ['動詞の使い方', /give |make A B|使役|call A B|help ＋|look for|get の|take|make と do|say \/ tell|find \/ leave|have 人|動詞 A of B|play the|look \/ sound/],
  ['時制', /be動詞|三人称|過去形|進行形|未来|時制|There will/],
  ['文の基本', /There is|There was|天気|冠詞|複数形|順番と日付|回数|What time|So do I|so \/ not で/],
  ['疑問文・命令文', /疑問|命令文|感嘆文|How |Whose|答え方/],
  ['否定の表現', /否定|neither|not A but|no matter|still \/ not|nobody/],
  ['接続詞', /接続詞|though|because|if|whether|so that|not only|both A|and \/ but|so と such|so ～ that|as long as|now that|as well as|like \/ such as/],
  ['前置詞', /前置詞|by と|between|手段|ago と before|during と for/],
  ['名詞・代名詞', /名詞|代名詞|a few|some と|each|another|the same|数の表現|most \/ most|a number of|else|this \/ that/],
  ['形容詞・副詞', /形容詞|副詞|too \/ also|too many|almost|even \/ only|be famous|be likely/],
]
export const topicOf = (u: GrammarUnit) => TOPICS.find(([, re]) => re.test(u.title))?.[0] ?? 'いろいろな文'

export type GcFloor = { id: string; label: string; sub: string; topic: string; floor: number; questions: GrammarQuestion[]; explain: GrammarUnit | null }

// 単元の並び（学年順）から城の階をつくる
export function grammarCastleFloors(units: GrammarUnit[], prefix = ''): GcFloor[] {
  const order: string[] = []
  const byTopic = new Map<string, GrammarUnit[]>()
  for (const u of units) {
    const t = topicOf(u)
    if (!byTopic.has(t)) {
      byTopic.set(t, [])
      order.push(t)
    }
    byTopic.get(t)!.push(u)
  }
  const out: GcFloor[] = []
  const perPart = FLOOR_QS * FLOORS_PER_PART
  for (const t of order) {
    const us = byTopic.get(t)!
    const qs = us.flatMap((u) => u.questions)
    const parts = Math.max(1, Math.floor(qs.length / perPart))
    for (let p = 0; p < parts; p++) {
      const start = p * perPart
      const end = p === parts - 1 ? qs.length : (p + 1) * perPart // さいごのまとまりは、あまりもふくめる
      const partQs = qs.slice(start, end)
      let at = 0
      const partUnits = us.filter((u) => {
        const s = at
        at += u.questions.length
        return s >= start && s < end
      })
      const name = parts > 1 ? `${t}${'①②③④⑤⑥⑦⑧⑨⑩'[p] ?? `${p + 1}`}` : t
      const floors = Math.min(FLOORS_PER_PART, Math.ceil(partQs.length / FLOOR_QS))
      for (let f = 0; f < floors; f++) {
        // さいごの階は、あまりの問題もまとめて出す（5問より少なくならないように）
        const qsF = f === floors - 1 ? partQs.slice(f * FLOOR_QS) : partQs.slice(f * FLOOR_QS, (f + 1) * FLOOR_QS)
        out.push({
          id: `gc:${prefix}${name}:${f + 1}`,
          label: `${name}　${f + 1}/${floors}`,
          sub: f === 0 ? '📖 解説から' : `${qsF.length}問`,
          topic: name,
          floor: f,
          questions: qsF,
          explain:
            f === 0
              ? { id: `gc:${prefix}${name}:${f + 1}`, title: `${name}（${partUnits.length}単元）`, points: partUnits.flatMap((u) => u.points).slice(0, 8), examples: partUnits.flatMap((u) => u.examples).slice(0, 4), questions: qsF }
              : null,
        })
      }
    }
  }
  return out
}

const KEY = 'eitan:gcastle'
export function loadGcClears(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveGcClears(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* 保存できなくても動く */
  }
}

// 文法のレベル（単語・読解と同じ15レベル）：中1〜中3・高1〜高3・私学〜東大・TOEIC・TOEFL/IELTS・ネイティブ
export type GcLevel = { id: string; label: string; sub: string; unit?: string } // unit：入試・試験の単元（ないときは学年の単元）
export const GC_LEVELS: GcLevel[] = [
  { id: '中1', label: '中1', sub: '中学1年' },
  { id: '中2', label: '中2', sub: '中学2年' },
  { id: '中3', label: '中3', sub: '中学3年' },
  { id: '高1', label: '高1', sub: '不定詞・動名詞・助動詞など' },
  { id: '高2', label: '高2', sub: '関係詞・比較・完了形など' },
  { id: '高3', label: '高3', sub: '仮定法・分詞構文・倒置など' },
  { id: '私学', label: '私学', sub: '共通テスト・中堅私大', unit: 'exam-kyotsu' },
  { id: '私学難関', label: '私学難関', sub: 'MARCH・早慶', unit: 'exam-shiritsu' },
  { id: '国公立', label: '国公立', sub: '国公立大', unit: 'exam-kokkoritsu' },
  { id: '旧帝大', label: '旧帝大', sub: '旧帝大', unit: 'exam-kyutei' },
  { id: '京大', label: '京大', sub: '京都大（精読）', unit: 'exam-kyodai' },
  { id: '東大', label: '東大', sub: '東京大（要約・英作文）', unit: 'exam-todai' },
  { id: 'TOEIC', label: 'TOEIC', sub: 'ビジネス', unit: 'exam-toeic' },
  { id: 'TOEFL・IELTS', label: 'TOEFL・IELTS', sub: '留学・アカデミック', unit: 'exam-toefl' },
  { id: 'ネイティブ', label: 'ネイティブ', sub: '会話の文法', unit: 'exam-native' },
]
export const ALL_EXAM_GRAMMAR: GrammarUnit[] = [...EXAM_GRAMMAR, ...LEVEL_GRAMMAR]

// 高校の単元を、項目で高1・高2・高3に分ける
const HS_PART: Record<string, '高1' | '高2' | '高3'> = { 関係詞: '高2', '現在完了・完了形': '高2', 比較: '高2', 分詞: '高2', 接続詞: '高2', 仮定法: '高3', 分詞構文: '高3', '倒置・強調': '高3', 否定の表現: '高3' }
export const hsPartOf = (u: GrammarUnit) => HS_PART[topicOf(u)] ?? '高1'
export function levelUnits(level: string): GrammarUnit[] {
  if (level === '中1' || level === '中2' || level === '中3') return GRAMMAR.filter((u) => gradeOf(u.id) === level)
  if (level === '高1' || level === '高2' || level === '高3') return GRAMMAR.filter((u) => gradeOf(u.id) === '高校' && hsPartOf(u) === level)
  const id = GC_LEVELS.find((l) => l.id === level)?.unit
  return ALL_EXAM_GRAMMAR.filter((u) => u.id === id)
}

// その城の階（学年の城は項目ごとに5問×3階、入試・試験の城は5問ずつ・1階目は解説から）
export function gcFloorsFor(level: string): GcFloor[] {
  const lv = GC_LEVELS.find((l) => l.id === level)
  const exam = lv?.unit ? ALL_EXAM_GRAMMAR.find((u) => u.id === lv.unit) : undefined
  if (!exam) return grammarCastleFloors(levelUnits(level), `${level}|`)
  const name = lv!.label
  const n = Math.ceil(exam.questions.length / FLOOR_QS)
  return Array.from({ length: n }, (_, f) => {
    const qs = exam.questions.slice(f * FLOOR_QS, (f + 1) * FLOOR_QS)
    const id = `gc:${exam.id}|${name}:${f + 1}`
    return { id, label: `${name}　${f + 1}/${n}`, sub: f === 0 ? '📖 解説から' : `${qs.length}問`, topic: name, floor: f, questions: qs, explain: f === 0 ? { ...exam, id, questions: qs } : null }
  })
}

const LEVEL_KEY = 'eitan:grammar-castle'
const LEVEL_FOR: Record<GradeId, string> = { j1: '中1', j2: '中2', j3: '中3', hs: '高1', adult: '高3' }
// まえのレベル（高校・入試の id）から新しいレベルへ
const OLD_LEVEL: Record<string, string> = { 高校: '高1', 'exam-kyotsu': '私学', 'exam-shiritsu': '私学難関', 'exam-shiritsu-med': '私学難関', 'exam-kokkoritsu': '国公立', 'exam-kyutei': '旧帝大', 'exam-kokuritsu-med': '旧帝大' }
export function loadGcLevel(grade: GradeId | ''): string {
  try {
    const v = localStorage.getItem(LEVEL_KEY)
    if (v && GC_LEVELS.some((l) => l.id === v)) return v
    if (v && OLD_LEVEL[v]) return OLD_LEVEL[v]
  } catch {
    /* 読めなくても動く */
  }
  return grade ? LEVEL_FOR[grade] : '中1'
}
export function saveGcLevel(id: string): void {
  try {
    localStorage.setItem(LEVEL_KEY, id)
  } catch {
    /* 保存できなくても動く */
  }
}
