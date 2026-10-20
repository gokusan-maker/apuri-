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
  ['near', 'far'], ['inside', 'outside'], ['over', 'under'], ['high', 'low'], ['wet', 'dry'], ['thick', 'thin'], ['same', 'different'], ['hard', 'soft'],
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
  { name: '動物', ids: ['cat', 'dog', 'rabbit', 'horse', 'cow', 'pig', 'sheep', 'monkey', 'elephant', 'lion', 'tiger', 'bear', 'fox', 'mouse', 'frog', 'bird', 'dolphin', 'giraffe', 'koala', 'panda', 'penguin', 'turtle', 'whale', 'zebra'] },
  { name: '食べ物', ids: ['rice', 'bread', 'egg', 'meat', 'banana', 'strawberry', 'potato', 'tomato', 'cheese', 'soup', 'sandwich', 'apple'] },
  { name: 'スポーツ', ids: ['soccer', 'baseball', 'basketball', 'tennis', 'volleyball', 'badminton', 'rugby', 'table-tennis'] },
  { name: '乗り物', ids: ['bus', 'train', 'bike', 'plane', 'ship', 'taxi', 'subway', 'truck', 'boat', 'helicopter', 'car'] },
  { name: '色', ids: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'pink', 'purple', 'brown', 'gray'] },
  { name: '体', ids: ['head', 'face', 'eye', 'ear', 'nose', 'mouth', 'hand', 'finger', 'arm', 'leg', 'foot', 'elbow', 'knee', 'shoulder', 'lip', 'tongue'] },
  { name: '天気', ids: ['sunny', 'rainy', 'snowy', 'windy', 'cloudy', 'rain', 'snow', 'wind'] },
  { name: '家', ids: ['bed', 'sofa', 'bathroom', 'bedroom', 'kitchen', 'garden', 'stairs', 'wall', 'floor', 'roof', 'door', 'window'] },
  { name: '家族', ids: ['father', 'mother', 'sister', 'brother', 'grandfather', 'grandmother', 'uncle', 'aunt', 'son', 'daughter', 'cousin', 'parent'] },
  { name: '楽器', ids: ['piano', 'guitar', 'violin', 'drum', 'flute'] },
  { name: '服', ids: ['hat', 'cap', 'shirt', 'skirt', 'shoes', 'sock', 'coat', 'dress', 'jacket', 'clothes'] },
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

// 複数形：まちがえやすいものを中心に
export const PLURALS: [string, string][] = [
  ['book', 'books'], ['box', 'boxes'], ['bus', 'buses'], ['watch', 'watches'], ['dish', 'dishes'], ['glass', 'glasses'],
  ['potato', 'potatoes'], ['tomato', 'tomatoes'], ['city', 'cities'], ['baby', 'babies'], ['story', 'stories'], ['country', 'countries'],
  ['library', 'libraries'], ['knife', 'knives'], ['leaf', 'leaves'], ['child', 'children'], ['man', 'men'], ['woman', 'women'],
  ['foot', 'feet'], ['tooth', 'teeth'], ['mouse', 'mice'], ['person', 'people'], ['sheep', 'sheep'], ['boy', 'boys'],
  ['day', 'days'], ['toy', 'toys'], ['key', 'keys'],
]

function wrongPlurals(w: string): string[] {
  const out = [w + 's', w + 'es', w + 'en', w + w.slice(-1) + 'es']
  if (w.endsWith('y')) out.push(w.slice(0, -1) + 'ies')
  if (w.endsWith('f')) out.push(w.slice(0, -1) + 'ves')
  if (w.endsWith('fe')) out.push(w.slice(0, -2) + 'ves', w + 'es')
  if (w.endsWith('o')) out.push(w + 'ss')
  return out
}

export function pluralQ(rng: Rng = Math.random): PuzzleQ {
  const [one, many] = PLURALS[Math.floor(rng() * PLURALS.length)]
  const wrong = shuffle([...new Set(wrongPlurals(one))].filter((x) => x !== many), rng).slice(0, 3)
  const choices = shuffle([many, ...wrong], rng)
  return { prompt: `「${one}」の複数形は？`, choices, answer: choices.indexOf(many), why: `${one} → ${many}`, wordId: idOf(one) ?? '' }
}

// 過去形のつづり（規則動詞）：ed のつけ方
export const PASTS: [string, string][] = [
  ['play', 'played'], ['study', 'studied'], ['stop', 'stopped'], ['live', 'lived'], ['try', 'tried'], ['plan', 'planned'],
  ['enjoy', 'enjoyed'], ['carry', 'carried'], ['use', 'used'], ['walk', 'walked'], ['cry', 'cried'], ['drop', 'dropped'],
  ['like', 'liked'], ['visit', 'visited'], ['stay', 'stayed'], ['worry', 'worried'], ['clean', 'cleaned'], ['move', 'moved'],
]

function wrongPasts(w: string): string[] {
  const out = [w + 'ed', w + 'd', w + w.slice(-1) + 'ed', w.slice(0, -1) + 'ied', w.slice(0, -1) + 'ed']
  return out.filter((x) => x.length > w.length - 1)
}

export function pastQ(rng: Rng = Math.random): PuzzleQ {
  const [base, past] = PASTS[Math.floor(rng() * PASTS.length)]
  const wrong = shuffle([...new Set(wrongPasts(base))].filter((x) => x !== past), rng).slice(0, 3)
  const choices = shuffle([past, ...wrong], rng)
  return { prompt: `「${base}」の過去形は？`, choices, answer: choices.indexOf(past), why: `${base} → ${past}`, wordId: idOf(base) ?? '' }
}

// 比較級・最上級
export const COMPARES: [string, string, string][] = [
  ['big', 'bigger', 'biggest'], ['tall', 'taller', 'tallest'], ['happy', 'happier', 'happiest'], ['hot', 'hotter', 'hottest'],
  ['easy', 'easier', 'easiest'], ['large', 'larger', 'largest'], ['fast', 'faster', 'fastest'], ['good', 'better', 'best'],
  ['bad', 'worse', 'worst'], ['many', 'more', 'most'], ['beautiful', 'more beautiful', 'most beautiful'],
  ['interesting', 'more interesting', 'most interesting'], ['popular', 'more popular', 'most popular'], ['young', 'younger', 'youngest'],
  ['busy', 'busier', 'busiest'], ['nice', 'nicer', 'nicest'],
]

function wrongCompares(w: string, sup: boolean): string[] {
  const e = sup ? 'est' : 'er'
  const more = sup ? 'most' : 'more'
  return [w + e, w + w.slice(-1) + e, w.slice(0, -1) + 'i' + e, `${more} ${w}`, w + 'r', `${more} ${w}${e}`]
}

export function compareQ(rng: Rng = Math.random): PuzzleQ {
  const [base, er, est] = COMPARES[Math.floor(rng() * COMPARES.length)]
  const sup = rng() < 0.5
  const ans = sup ? est : er
  const wrong = shuffle([...new Set(wrongCompares(base, sup))].filter((x) => x !== ans), rng).slice(0, 3)
  const choices = shuffle([ans, ...wrong], rng)
  return {
    prompt: `「${base}」の${sup ? '最上級' : '比較級'}は？`,
    choices,
    answer: choices.indexOf(ans),
    why: `${base} → ${er} → ${est}`,
    wordId: idOf(base) ?? '',
  }
}

// 3単現の s
export const THIRDS: [string, string][] = [
  ['play', 'plays'], ['go', 'goes'], ['study', 'studies'], ['have', 'has'], ['watch', 'watches'], ['wash', 'washes'],
  ['do', 'does'], ['try', 'tries'], ['fix', 'fixes'], ['teach', 'teaches'], ['enjoy', 'enjoys'], ['fly', 'flies'],
  ['like', 'likes'], ['carry', 'carries'], ['catch', 'catches'], ['stay', 'stays'],
]

function wrongThirds(w: string): string[] {
  return [w + 's', w + 'es', w.slice(0, -1) + 'ies', w.slice(0, -1) + 's', w + 'ss', w.slice(0, -1) + 'es']
}

export function thirdQ(rng: Rng = Math.random): PuzzleQ {
  const [base, ans] = THIRDS[Math.floor(rng() * THIRDS.length)]
  const wrong = shuffle([...new Set(wrongThirds(base))].filter((x) => x !== ans && x !== base), rng).slice(0, 3)
  const choices = shuffle([ans, ...wrong], rng)
  return { prompt: `He ___ … 「${base}」の3単現の形は？`, choices, answer: choices.indexOf(ans), why: `${base} → ${ans}`, wordId: idOf(base) ?? '' }
}

// ing形のつづり
export const INGS: [string, string][] = [
  ['run', 'running'], ['make', 'making'], ['swim', 'swimming'], ['write', 'writing'], ['sit', 'sitting'], ['play', 'playing'],
  ['come', 'coming'], ['stop', 'stopping'], ['study', 'studying'], ['use', 'using'], ['get', 'getting'], ['dance', 'dancing'],
  ['cut', 'cutting'], ['lie', 'lying'], ['die', 'dying'], ['read', 'reading'],
]

function wrongIngs(w: string): string[] {
  return [w + 'ing', w + w.slice(-1) + 'ing', w.slice(0, -1) + 'ing', w + 'eing', w.slice(0, -2) + 'ying', w + 'ning']
}

export function ingQ(rng: Rng = Math.random): PuzzleQ {
  const [base, ans] = INGS[Math.floor(rng() * INGS.length)]
  const wrong = shuffle([...new Set(wrongIngs(base))].filter((x) => x !== ans && x.length > 3), rng).slice(0, 3)
  const choices = shuffle([ans, ...wrong], rng)
  return { prompt: `「${base}」の ing形は？`, choices, answer: choices.indexOf(ans), why: `${base} → ${ans}`, wordId: idOf(base) ?? '' }
}
