// モンスターのおさんぽ：1日1回。さんぽで単語を1つ拾ってきて🪙3
import type { Word } from './words'

export const WALK_COINS = 3
const KEY = 'eitan:walk'

export function loadWalkDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveWalkDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// r は 0〜1 の乱数
export const walkFind = (words: Word[], r: number): Word | undefined => (words.length ? words[Math.min(words.length - 1, Math.floor(r * words.length))] : undefined)

const PLACES = ['公園', '川原', '商店街', '図書館の前', '森の小道']
export const walkPlace = (r: number) => PLACES[Math.min(PLACES.length - 1, Math.floor(r * PLACES.length))]

// おさんぽ日記：おさんぽで拾った単語（新しい順・30こまで）
export type WalkEntry = { day: string; en: string; ja: string; place: string }
const DIARY_KEY = 'eitan:walk-diary'
export function loadWalkDiary(): WalkEntry[] {
  try {
    const v = JSON.parse(localStorage.getItem(DIARY_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is WalkEntry => !!x && typeof x === 'object' && typeof (x as WalkEntry).en === 'string' && typeof (x as WalkEntry).day === 'string') : []
  } catch {
    return []
  }
}
export function addWalkDiary(e: WalkEntry): WalkEntry[] {
  const list = [e, ...loadWalkDiary()].slice(0, 30)
  try {
    localStorage.setItem(DIARY_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return list
}

// おさんぽクイズ：日記の単語から（同じ単語は1回）最大 n 問。選択肢は日記と予備の意味から3つ
export function walkQuiz(diary: WalkEntry[], extraJa: string[], rnd: () => number, n = 3): { en: string; ja: string; choices: string[] }[] {
  const uniq = [...new Map(diary.map((e) => [e.en, e])).values()]
  const pool = [...uniq]
  const out: { en: string; ja: string; choices: string[] }[] = []
  while (out.length < n && pool.length > 0) {
    const e = pool.splice(Math.floor(rnd() * pool.length), 1)[0]
    const others = [...new Set([...uniq.map((x) => x.ja), ...extraJa])].filter((j) => j !== e.ja)
    const wrong: string[] = []
    for (let k = 0; wrong.length < 2 && k < others.length; k++) {
      const j = others[(Math.floor(rnd() * others.length) + k) % others.length]
      if (!wrong.includes(j)) wrong.push(j)
    }
    const at = Math.floor(rnd() * (wrong.length + 1))
    out.push({ en: e.en, ja: e.ja, choices: [...wrong.slice(0, at), e.ja, ...wrong.slice(at)] })
  }
  return out
}
