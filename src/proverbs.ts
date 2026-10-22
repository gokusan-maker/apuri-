// ボスのことわざ：ボスをたおすと英語のことわざを1つ教えてくれる。ことわざ帳に集まる
export const PROVERBS: { en: string; ja: string }[] = [
  { en: 'Practice makes perfect.', ja: '練習は完ぺきをつくる（習うより慣れよ）。' },
  { en: 'Time is money.', ja: '時は金なり。' },
  { en: 'Slow and steady wins the race.', ja: 'ゆっくり着実に進む者が勝つ（急がば回れ）。' },
  { en: 'Where there is a will, there is a way.', ja: '意志があれば道は開ける。' },
  { en: 'Seeing is believing.', ja: '百聞は一見にしかず。' },
  { en: 'Better late than never.', ja: 'おそくてもしないよりはまし。' },
  { en: 'A friend in need is a friend indeed.', ja: 'まさかのときの友こそ真の友。' },
  { en: 'Every cloud has a silver lining.', ja: 'どんな雲にも銀のふちどりがある（悪いことにもよい面がある）。' },
  { en: 'Actions speak louder than words.', ja: '行動は言葉よりも雄弁だ。' },
  { en: 'Two heads are better than one.', ja: '三人寄れば文殊の知恵。' },
  { en: 'Rome was not built in a day.', ja: 'ローマは一日にして成らず。' },
  { en: 'The early bird catches the worm.', ja: '早起きは三文の徳。' },
]

const KEY = 'eitan:proverbs'
export function loadProverbs(): number[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? [...new Set(v.filter((x): x is number => typeof x === 'number' && x >= 0 && x < PROVERBS.length))] : []
  } catch {
    return []
  }
}
// まだ持っていないことわざを優先して1つ（r は 0〜1 の乱数）。保存して番号を返す
export function learnProverb(r: number): number {
  const got = loadProverbs()
  const fresh = PROVERBS.map((_, i) => i).filter((i) => !got.includes(i))
  const pool = fresh.length > 0 ? fresh : PROVERBS.map((_, i) => i)
  const i = pool[Math.min(pool.length - 1, Math.floor(r * pool.length))]
  try {
    localStorage.setItem(KEY, JSON.stringify([...new Set([...got, i])]))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return i
}
