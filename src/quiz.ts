// 4択クイズの出題を作る。乱数は差し替えられるようにしてテストしやすくする。
export type Rng = () => number

export type Question<T> = {
  word: T
  choices: string[]
  answer: number
}

export function shuffle<T>(items: T[], rng: Rng = Math.random): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 正解1つ＋意味が重ならない誤答3つ（ランダムな候補 CAND_N 個のうち、訳の長さが正解に近い3つ）
export const CAND_N = 8
export function makeQuestion<T extends { id: string }>(
  word: T,
  all: T[],
  label: (w: T) => string,
  rng: Rng = Math.random,
): Question<T> {
  const correct = label(word)
  const seen = new Set([correct])
  const cands: string[] = []
  for (const w of shuffle(all, rng)) {
    const l = label(w)
    if (w.id === word.id || !l || seen.has(l)) continue
    seen.add(l)
    cands.push(l)
    if (cands.length === CAND_N) break
  }
  // 単語のレベルの点検③：訳の長さが正解に近い誤答を選ぶ（長さのちがいで答えがすぐわからないように）
  const wrong = cands
    .map((l, i) => ({ l, i, d: Math.abs(l.length - correct.length) }))
    .sort((x, y) => x.d - y.d || x.i - y.i)
    .slice(0, 3)
    .map((x) => x.l)
  const choices = shuffle([correct, ...wrong], rng)
  return { word, choices, answer: choices.indexOf(correct) }
}

// 誤答をえらぶ単語の集まり：出題レベルの単語が十分あればそのレベルから（上のレベルで中1の訳がまじって簡単にならないように）、少なければ全体から
export const DISTRACTOR_MIN = 8
export function distractorPool<T>(level: T[], all: T[]): T[] {
  return level.length >= DISTRACTOR_MIN ? level : all
}

// targets から出題し、誤答は all から選ぶ（苦手だけ復習のときに使う）
export function makeQuiz<T extends { id: string }>(
  all: T[],
  label: (w: T) => string,
  count = 10,
  rng: Rng = Math.random,
  targets: T[] = all,
): Question<T>[] {
  return shuffle(targets, rng)
    .slice(0, count)
    .map((w) => makeQuestion(w, all, label, rng))
}

// ランダムな1問（タイムアタック用）
export function randomQuestion<T extends { id: string }>(
  all: T[],
  label: (w: T) => string,
  rng: Rng = Math.random,
): Question<T> {
  return makeQuestion(all[Math.floor(rng() * all.length)], all, label, rng)
}

// かんたんモード：まちがいの選択肢を減らして n 個にする
export function trimChoices<T extends { id: string }>(q: Question<T>, n: number, rng: Rng = Math.random): Question<T> {
  if (q.choices.length <= n) return q
  const correct = q.choices[q.answer]
  const wrong = shuffle(q.choices.filter((_, i) => i !== q.answer), rng).slice(0, n - 1)
  const keep = new Set([correct, ...wrong])
  const choices = q.choices.filter((c) => keep.has(c))
  return { ...q, choices, answer: choices.indexOf(correct) }
}

// かんたんモードなら選択肢を3つに（設定は呼ぶ側で読む）
export function easyIf<T extends { id: string }>(easy: boolean, q: Question<T>): Question<T> {
  return easy ? trimChoices(q, 3) : q
}
