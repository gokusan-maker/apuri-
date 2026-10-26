import { shuffle } from './quiz'
// 数の聞き取り：数を英語の読み方にする（0〜9999）
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

export function toEnglish(n: number): string {
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '')
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred` + (n % 100 ? ` ${toEnglish(n % 100)}` : '')
  return `${toEnglish(Math.floor(n / 1000))} thousand` + (n % 1000 ? ` ${toEnglish(n % 1000)}` : '')
}

// 学習記録に使う単語id（数の単語帳にある語）
export function wordIdOf(n: number): string {
  if (n >= 1000) return 'thousand'
  if (n >= 100) return 'hundred'
  if (n < 20) return ONES[n]
  return TENS[Math.floor(n / 10)]
}

// 出題：半分は聞きまちがえやすい 13〜19 と 30〜90（thirteen / thirty など）
export function pickNumber(r: () => number = Math.random): number {
  if (r() < 0.5) {
    const teen = 13 + Math.floor(r() * 7)
    return r() < 0.5 ? teen : (teen - 10) * 10
  }
  return 21 + Math.floor(r() * 979)
}

// 入力（全角数字・カンマ・空白も許す）を数にする
export function parseAnswer(text: string): number | null {
  const t = text.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[,\s]/g, '')
  return /^\d+$/.test(t) ? Number(t) : null
}

// 問題：読み上げる英語・正解（入力の形）・記録用の単語id
export type NumQ = { kind: 'number' | 'time' | 'date' | 'price'; say: string; answer: string; id: string }

export function numberQ(r: () => number = Math.random): NumQ {
  const n = pickNumber(r)
  return { kind: 'number', say: toEnglish(n), answer: String(n), id: wordIdOf(n) }
}

// 時刻：seven thirty → 7:30（5分きざみ。ちょうどは o'clock、1〜9分は oh five のように読む）
export function timeQ(r: () => number = Math.random): NumQ {
  const h = 1 + Math.floor(r() * 12)
  const m = Math.floor(r() * 12) * 5
  const say = m === 0 ? `${toEnglish(h)} o'clock` : `${toEnglish(h)} ${m < 10 ? `oh ${toEnglish(m)}` : toEnglish(m)}`
  return { kind: 'time', say, answer: `${h}:${String(m).padStart(2, '0')}`, id: wordIdOf(h) }
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_IN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const ORD: Record<string, string> = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' }

// 序数（1st〜31st）：first, second, twenty-third, thirtieth など
export function ordinal(n: number): string {
  const words = toEnglish(n).split('-')
  const last = words[words.length - 1]
  words[words.length - 1] = ORD[last] ?? (last.endsWith('y') ? `${last.slice(0, -1)}ieth` : `${last}th`)
  return words.join('-')
}

// 日付：May third → 5/3
export function dateQ(r: () => number = Math.random): NumQ {
  const m = Math.floor(r() * 12)
  const d = 1 + Math.floor(r() * DAYS_IN[m])
  return { kind: 'date', say: `${MONTHS[m]} ${ordinal(d)}`, answer: `${m + 1}/${d}`, id: MONTHS[m].toLowerCase() }
}

// 値段：three dollars and fifty cents → 3.50（セントは5きざみ）
export function priceQ(r: () => number = Math.random): NumQ {
  const d = 1 + Math.floor(r() * 20)
  const c = Math.floor(r() * 20) * 5
  const dollars = `${toEnglish(d)} ${d === 1 ? 'dollar' : 'dollars'}`
  const say = c === 0 ? dollars : `${dollars} and ${toEnglish(c)} cents`
  return { kind: 'price', say, answer: `${d}.${String(c).padStart(2, '0')}`, id: wordIdOf(d) }
}

export function pickQ(r: () => number = Math.random): NumQ {
  const k = r()
  return k < 0.2 ? timeQ(r) : k < 0.4 ? dateQ(r) : k < 0.55 ? priceQ(r) : numberQ(r)
}

function half(text: string): string {
  return text.replace(/[０-９：／]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
}

// 入力が正解か（全角・空白・カンマ・時刻の先頭0は気にしない）
export function isRight(q: NumQ, text: string): boolean {
  const t = half(text).replace(/[,\s＄]/g, (c) => (c === '＄' ? '$' : ''))
  if (q.kind === 'time') {
    const m = /^0?(\d{1,2}):(\d{2})$/.exec(t)
    return !!m && `${Number(m[1])}:${m[2]}` === q.answer
  }
  if (q.kind === 'price') {
    const m = /^\$?(\d+)(?:\.(\d{1,2}))?$/.exec(t)
    return !!m && `${Number(m[1])}.${(m[2] ?? '0').padEnd(2, '0')}` === q.answer
  }
  if (q.kind === 'date') {
    const m = /^0?(\d{1,2})(?:\/|月)0?(\d{1,2})日?$/.exec(t)
    return !!m && `${m[1]}/${m[2]}` === q.answer
  }
  return parseAnswer(t) === Number(q.answer)
}

const pad2 = (n: number) => String(n).padStart(2, '0')

// 4択の選択肢：正解と、聞きまちがえやすい答え3つ（thirteen と thirty、15分ずれ など）。キーボードで打たずにボタンでえらぶ
export function numChoices(q: NumQ): string[] {
  const near: string[] = []
  if (q.kind === 'number') {
    const n = Number(q.answer)
    const partner = n >= 13 && n <= 19 ? (n - 10) * 10 : n >= 30 && n <= 90 && n % 10 === 0 ? n / 10 + 10 : null
    for (const x of [partner, n + 10, n - 10, n + 1, n + 100, n - 1]) if (x !== null && x > 0) near.push(String(x))
  } else if (q.kind === 'time') {
    const [h, m] = q.answer.split(':').map(Number)
    near.push(`${h}:${pad2((m + 15) % 60)}`, `${(h % 12) + 1}:${pad2(m)}`, `${((h + 10) % 12) + 1}:${pad2(m)}`, `${h}:${pad2((m + 30) % 60)}`)
  } else if (q.kind === 'date') {
    const [mo, d] = q.answer.split('/').map(Number)
    near.push(`${mo}/${(d % 28) + 1}`, `${(mo % 12) + 1}/${Math.min(d, 28)}`, `${((mo + 10) % 12) + 1}/${Math.min(d, 28)}`)
  } else {
    const [d, c] = q.answer.split('.').map(Number)
    near.push(`${d}.${pad2((c + 50) % 100)}`, `${d + 1}.${pad2(c)}`, `${d === 1 ? 3 : d - 1}.${pad2(c)}`)
  }
  const others = [...new Set(near)].filter((x) => x !== q.answer).slice(0, 3)
  return shuffle([q.answer, ...others])
}

// 数の聞き取りの自己ベスト（10問中の正解数）
const BEST_KEY = 'eitan:numbers-best'
export function loadNumbersBest(): number {
  try {
    const v = Number(localStorage.getItem(BEST_KEY) ?? '0')
    return Number.isFinite(v) ? v : 0
  } catch {
    return 0
  }
}
export function saveNumbersBest(n: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(n))
  } catch {
    /* 保存できなくても動く */
  }
}
