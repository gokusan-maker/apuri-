// 単語の城：単語ステージ（10語）を1つの単元にして、5問×3階で登る。
// 学習前の単語一覧はなし。いきなり問題から（1階目は4択）。2・3階目は単元ごとにちがうミニゲーム（リスニング・10秒・スペル・ならべかえなど）
import { canScramble } from './scramble'
import { stagesOf, type Stage } from './stages'
import type { Level, Word } from './words'
import { courseById, courseWords, type CourseId } from './wordcourse'

export const WC_QS = 5
export const WC_PASS = 4
export const WC_MINIBOSS_PASS = 8 // 単元のミニボス：10問中8問でたおす
export const WC_MINIBOSS_COINS = 10

export type WcGame = 'en-ja' | 'ja-en' | 'listen' | 'timed' | 'sentence-read' | 'order' | 'spell' | 'dictation'
export const WC_GAME_LABEL: Record<WcGame, string> = {
  'en-ja': '🔤 4択（英→日）',
  'ja-en': '🔤 4択（日→英）',
  listen: '🎧 リスニング',
  timed: '⏳ 10秒クイズ',
  'sentence-read': '📄 例文の訳',
  order: '🧩 例文ならべかえ',
  spell: '✍️ スペル',
  dictation: '👂 聞いて書く',
}
// 2階目・3階目のミニゲーム（単元ごとに順番に変わる）
const SECOND: WcGame[] = ['listen', 'timed', 'order', 'sentence-read']
const THIRD: WcGame[] = ['spell', 'ja-en', 'dictation', 'timed']

export type WcFloor = { id: string; label: string; sub: string; stage: Stage; floor: number; words: Word[]; direction: WcGame }

function floorsOf(stages: Stage[], title: (st: Stage) => string): WcFloor[] {
  return stages.flatMap((st) => {
    const name = title(st)
    const a = st.words.slice(0, WC_QS)
    const b = st.words.slice(WC_QS)
    const review = st.words.filter((_, i) => i % 2 === 0).slice(0, WC_QS)
    const w2 = b.length > 0 ? b : a
    const w3 = review.length > 0 ? review : a
    let g2 = SECOND[(st.no - 1) % SECOND.length]
    if (g2 === 'order' && w2.filter((w) => canScramble(w.example)).length < 3) g2 = 'listen' // 例文がならべかえに向かない単元
    const g3 = THIRD[(st.no - 1) % THIRD.length]
    const fl: [Word[], WcGame, string][] = [
      [a, 'en-ja', WC_GAME_LABEL['en-ja']],
      [w2, g2, WC_GAME_LABEL[g2]],
      [w3, g3, WC_GAME_LABEL[g3]],
    ]
    return fl.map(([words, direction, sub], f) => ({ id: `wc:${st.id}:${f + 1}`, label: `${name}　${f + 1}/3`, sub, stage: st, floor: f, words, direction }))
  })
}

export function wordCastleFloors(levels: Level[]): WcFloor[] {
  return floorsOf(levels.flatMap((lv) => stagesOf(lv)), (st) => `${st.level} 単元${st.no}`)
}

// 単語のレベル（コース）の地図：そのレベルの単語を10語ずつの単元に
export function wordCastleFloorsFor(course: CourseId): WcFloor[] {
  const c = courseById(course)
  const ws = courseWords(course)
  const stages: Stage[] = Array.from({ length: Math.ceil(ws.length / 10) }, (_, i) => ({ id: `${course}-${i + 1}`, level: c.level, no: i + 1, words: ws.slice(i * 10, i * 10 + 10) }))
  return floorsOf(stages, (st) => `${c.label} 単元${st.no}`)
}

const KEY = 'eitan:wcastle'
export function loadWcClears(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveWcClears(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    /* 保存できなくても動く */
  }
}

// そのゲームで出る問題の数（ならべかえは例文が向く語だけ）
export const wcCount = (f: WcFloor) => (f.direction === 'order' ? f.words.filter((w) => canScramble(w.example)).length : f.words.length)
