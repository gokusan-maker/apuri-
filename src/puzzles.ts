// ちょっとした4択パズル（ABC順・反対の意味・仲間はずれ）
import { shuffle, type Rng } from './quiz'
import { WORDS, type Word } from './words'

export type PuzzleQ = { prompt: string; choices: string[]; answer: number; why: string; wordId: string }

// 1語（スペースなし）で、最初の文字がちがう単語
const SINGLE = WORDS.filter((w) => /^[a-z]+$/.test(w.en))

// ABC順：辞書でいちばん最初に出てくる単語は？
export function abcQ(rng: Rng = Math.random): PuzzleQ {
  const picked: Word[] = []
  for (const w of shuffle(SINGLE, rng)) {
    if (picked.every((p) => p.en[0] !== w.en[0])) picked.push(w)
    if (picked.length === 4) break
  }
  const first = [...picked].sort((a, b) => a.en.localeCompare(b.en))[0]
  const choices = picked.map((w) => w.en)
  return {
    prompt: '辞書（ABC順）でいちばん最初に出てくるのは？',
    choices,
    answer: choices.indexOf(first.en),
    why: `ABC順に並べると ${[...choices].sort().join(' → ')}`,
    wordId: first.id,
  }
}

// 反対の意味のペア（どちらかは単語帳にある語）
export const OPPOSITES: [string, string][] = [
  ['big', 'small'], ['hot', 'cold'], ['long', 'short'], ['new', 'old'], ['fast', 'slow'], ['happy', 'sad'],
  ['easy', 'difficult'], ['early', 'late'], ['open', 'close'], ['buy', 'sell'], ['win', 'lose'], ['remember', 'forget'],
  ['heavy', 'light'], ['rich', 'poor'], ['strong', 'weak'], ['empty', 'full'], ['quiet', 'noisy'],
  ['arrive', 'leave'], ['start', 'finish'], ['before', 'after'], ['clean', 'dirty'], ['cheap', 'expensive'], ['safe', 'dangerous'],
  ['increase', 'decrease'], ['borrow', 'lend'], ['true', 'false'],
]

const idOf = (en: string) => WORDS.find((w) => w.en === en)?.id

export function oppositeQ(rng: Rng = Math.random): PuzzleQ {
  const [a, b] = OPPOSITES[Math.floor(rng() * OPPOSITES.length)]
  const [ask, ans] = rng() < 0.5 ? [a, b] : [b, a]
  const used = new Set([a, b])
  const wrong = shuffle(OPPOSITES.flat().filter((w) => !used.has(w)), rng).slice(0, 3)
  const choices = shuffle([ans, ...wrong], rng)
  return {
    prompt: `「${ask}」の反対の意味の単語は？`,
    choices,
    answer: choices.indexOf(ans),
    why: `${ask} ↔ ${ans}`,
    wordId: idOf(ask) ?? idOf(ans) ?? '',
  }
}
