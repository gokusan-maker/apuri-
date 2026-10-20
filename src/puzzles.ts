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

// 仲間はずれ：同じ仲間3つ＋ちがう仲間1つ
export const GROUPS: { name: string; ids: string[] }[] = [
  { name: '動物', ids: ['cat', 'dog', 'rabbit', 'horse', 'cow', 'pig', 'sheep', 'monkey', 'elephant', 'lion', 'tiger', 'bear', 'fox', 'mouse', 'frog', 'bird'] },
  { name: '食べ物', ids: ['rice', 'bread', 'egg', 'meat', 'banana', 'strawberry', 'potato', 'tomato', 'cheese', 'soup', 'sandwich', 'apple'] },
  { name: 'スポーツ', ids: ['soccer', 'baseball', 'basketball', 'tennis', 'volleyball', 'badminton', 'rugby', 'table-tennis'] },
  { name: '乗り物', ids: ['bus', 'train', 'bike', 'plane', 'ship', 'taxi', 'subway', 'truck', 'boat', 'helicopter', 'car'] },
  { name: '色', ids: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'pink', 'purple', 'brown', 'gray'] },
  { name: '体', ids: ['head', 'face', 'eye', 'ear', 'nose', 'mouth', 'hand', 'finger', 'arm', 'leg', 'foot'] },
  { name: '天気', ids: ['sunny', 'rainy', 'snowy', 'windy', 'cloudy', 'rain', 'snow', 'wind'] },
  { name: '家', ids: ['bed', 'sofa', 'bathroom', 'bedroom', 'kitchen', 'garden', 'stairs', 'wall', 'floor', 'roof', 'door', 'window'] },
  { name: '仕事', ids: ['doctor', 'nurse', 'farmer', 'pilot', 'police-officer', 'firefighter', 'scientist', 'artist', 'singer', 'writer', 'dentist', 'engineer', 'chef', 'astronaut', 'teacher'] },
]

const byId = (id: string) => WORDS.find((w) => w.id === id)!

export function oddQ(rng: Rng = Math.random): PuzzleQ {
  const [g, h] = shuffle(GROUPS, rng)
  const same = shuffle(g.ids, rng).slice(0, 3).map(byId)
  const odd = byId(h.ids[Math.floor(rng() * h.ids.length)])
  const choices = shuffle([...same, odd], rng).map((w) => w.en)
  return {
    prompt: '仲間はずれはどれ？',
    choices,
    answer: choices.indexOf(odd.en),
    why: `${odd.en}（${odd.ja}）は「${h.name}」。ほかは「${g.name}」`,
    wordId: odd.id,
  }
}
