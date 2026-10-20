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

// 正解1つ＋意味が重ならない誤答3つ
export function makeQuestion<T extends { id: string }>(
  word: T,
  all: T[],
  label: (w: T) => string,
  rng: Rng = Math.random,
): Question<T> {
  const correct = label(word)
  const seen = new Set([correct])
  const wrong: string[] = []
  for (const w of shuffle(all, rng)) {
    const l = label(w)
    if (w.id === word.id || seen.has(l)) continue
    seen.add(l)
    wrong.push(l)
    if (wrong.length === 3) break
  }
  const choices = shuffle([correct, ...wrong], rng)
  return { word, choices, answer: choices.indexOf(correct) }
}

export function makeQuiz<T extends { id: string }>(
  all: T[],
  label: (w: T) => string,
  count = 10,
  rng: Rng = Math.random,
): Question<T>[] {
  return shuffle(all, rng)
    .slice(0, count)
    .map((w) => makeQuestion(w, all, label, rng))
}
