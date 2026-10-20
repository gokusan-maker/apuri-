// ちょっとした4択パズル（ABC順・反対の意味・仲間はずれ）
import { shuffle, type Rng } from './quiz'
import { EMOJI } from './emoji'
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
  ['warm', 'cool'], ['dark', 'bright'], ['sweet', 'bitter'], ['come', 'go'], ['laugh', 'cry'], ['question', 'answer'], ['teach', 'learn'], ['accept', 'refuse'], ['always', 'never'],
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
  { name: '行事', ids: ['christmas', 'new-year', 'halloween', 'party', 'fireworks', 'wedding', 'concert', 'sports-day', 'graduation', 'festival'] },
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
    why: `${odd.en}${EMOJI[odd.id] ?? ''}（${odd.ja}）は「${h.name}」。ほかは「${g.name}」：${same.map((w) => `${w.en}${EMOJI[w.id] ?? ''}`).join('・')}`,
    wordId: odd.id,
  }
}

// いくつある？：絵文字を数えて英語で答える（2〜12）
const COUNT_EMOJI = ['🍎', '🐱', '⭐', '🚗', '🌸', '⚽', '🍌', '🐟']
const NUM_EN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']

export function countQ(rng: Rng = Math.random): PuzzleQ {
  const n = 2 + Math.floor(rng() * 11)
  const e = COUNT_EMOJI[Math.floor(rng() * COUNT_EMOJI.length)]
  const near = shuffle([n - 3, n - 2, n - 1, n + 1, n + 2, n + 3].filter((x) => x >= 1 && x <= 12), rng).slice(0, 3)
  const choices = shuffle([n, ...near], rng).map((x) => NUM_EN[x])
  return { prompt: `${e.repeat(n)}\nいくつある？`, choices, answer: choices.indexOf(NUM_EN[n]), why: `${n} は ${NUM_EN[n]}`, wordId: NUM_EN[n] }
}

// 時計を読もう：時計の絵文字（ちょうど・30分）を英語で
const CLOCKS = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛']
const HALF = ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
const timeEn = (h: number, half: boolean) => (half ? `${NUM_EN[h]} thirty` : `${NUM_EN[h]} o'clock`)

export function clockQ(rng: Rng = Math.random): PuzzleQ {
  const h = 1 + Math.floor(rng() * 12)
  const half = rng() < 0.5
  const ans = timeEn(h, half)
  const others = [timeEn(h, !half), timeEn((h % 12) + 1, half), timeEn(((h + 10) % 12) + 1, half), timeEn((h % 12) + 1, !half)]
  const choices = shuffle([ans, ...shuffle(others, rng).slice(0, 3)], rng)
  return {
    prompt: `${(half ? HALF : CLOCKS)[h - 1]}\n何時？`,
    choices,
    answer: choices.indexOf(ans),
    why: `${h}:${half ? '30' : '00'} は ${ans}`,
    wordId: NUM_EN[h],
  }
}

// 色の名前：色の四角を英語で
export const COLOR_SQUARES: [string, string][] = [
  ['🟥', 'red'], ['🟧', 'orange'], ['🟨', 'yellow'], ['🟩', 'green'], ['🟦', 'blue'], ['🟪', 'purple'], ['🟫', 'brown'], ['⬛', 'black'], ['⬜', 'white'],
]

export function colorQ(rng: Rng = Math.random): PuzzleQ {
  const [sq, ans] = COLOR_SQUARES[Math.floor(rng() * COLOR_SQUARES.length)]
  const wrong = shuffle(COLOR_SQUARES.map((c) => c[1]).filter((c) => c !== ans), rng).slice(0, 3)
  const choices = shuffle([ans, ...wrong], rng)
  return { prompt: `${sq}\nこの色は英語で？`, choices, answer: choices.indexOf(ans), why: `${sq} は ${ans}`, wordId: ans }
}

// アルファベット：大文字↔小文字、次の文字
const ABC = 'abcdefghijklmnopqrstuvwxyz'

export function alphabetQ(rng: Rng = Math.random): PuzzleQ {
  const i = Math.floor(rng() * 25) // z の次は出さない
  const kind = Math.floor(rng() * 3)
  const pick = (ok: string, pool: string[]) => {
    const choices = shuffle([ok, ...shuffle(pool.filter((c) => c !== ok), rng).slice(0, 3)], rng)
    return { choices, answer: choices.indexOf(ok) }
  }
  const letters = ABC.split('')
  if (kind === 0) {
    const r = pick(letters[i], letters)
    return { prompt: `「${letters[i].toUpperCase()}」の小文字は？`, ...r, why: `${letters[i].toUpperCase()} の小文字は ${letters[i]}`, wordId: '' }
  }
  if (kind === 1) {
    const up = letters.map((c) => c.toUpperCase())
    const r = pick(up[i], up)
    return { prompt: `「${letters[i]}」の大文字は？`, ...r, why: `${letters[i]} の大文字は ${up[i]}`, wordId: '' }
  }
  const r = pick(letters[i + 1], letters)
  return { prompt: `「${letters[i]}」の次の文字は？`, ...r, why: `${letters.slice(Math.max(0, i - 1), i + 3).join(' ')} …`, wordId: '' }
}

// 英語で計算：足し算・引き算（答えは 0〜20）
export function calcQ(rng: Rng = Math.random): PuzzleQ {
  const plus = rng() < 0.5
  const a = 1 + Math.floor(rng() * 10)
  const b = 1 + Math.floor(rng() * (plus ? 10 : a))
  const ans = plus ? a + b : a - b
  const en = (n: number) => toEnglishSmall(n)
  const near = shuffle([ans - 3, ans - 2, ans - 1, ans + 1, ans + 2, ans + 3].filter((x) => x >= 0 && x <= 20), rng).slice(0, 3)
  const choices = shuffle([ans, ...near], rng).map(en)
  return {
    prompt: `${en(a)} ${plus ? 'plus' : 'minus'} ${en(b)} is …?`,
    choices,
    answer: choices.indexOf(en(ans)),
    why: `${a} ${plus ? '+' : '−'} ${b} = ${ans}（${en(ans)}）`,
    wordId: ans >= 1 && ans <= 20 ? en(ans) : '',
  }
}

const SMALL = [...NUM_EN, 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty']
function toEnglishSmall(n: number): string {
  return SMALL[n]
}
