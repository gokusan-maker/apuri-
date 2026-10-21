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
  { name: '国', ids: ['japan', 'america', 'china', 'korea', 'france', 'australia', 'canada', 'india', 'brazil', 'italy', 'spain', 'germany', 'egypt', 'the-uk'] },
  { name: '行事', ids: ['christmas', 'new-year', 'halloween', 'party', 'fireworks', 'wedding', 'concert', 'sports-day', 'graduation', 'festival'] },
  { name: '仕事', ids: ['doctor', 'nurse', 'farmer', 'pilot', 'police-officer', 'firefighter', 'scientist', 'artist', 'singer', 'writer', 'dentist', 'engineer', 'chef', 'astronaut', 'teacher', 'baker', 'cashier', 'vet', 'carpenter', 'waiter'] },
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

// be動詞：主語に合うのはどれ？
const BE_SUBJECTS: [string, 'am' | 'is' | 'are'][] = [
  ['I', 'am'], ['You', 'are'], ['He', 'is'], ['She', 'is'], ['It', 'is'], ['We', 'are'], ['They', 'are'],
  ['My mother', 'is'], ['Tom and Ken', 'are'], ['This book', 'is'], ['These books', 'are'], ['My friends', 'are'], ['The cat', 'is'],
]
const BE_REST = ['happy today.', 'in the kitchen.', 'from Osaka.', 'very busy now.', 'at school.', 'tired.']

export function beQ(rng: Rng = Math.random): PuzzleQ {
  const [subj, be] = BE_SUBJECTS[Math.floor(rng() * BE_SUBJECTS.length)]
  const rest = BE_REST[Math.floor(rng() * BE_REST.length)]
  const choices = ['am', 'is', 'are']
  return { prompt: `${subj} ___ ${rest}`, choices, answer: choices.indexOf(be), why: `主語が「${subj}」なので ${be}`, wordId: '' }
}

// a と an：母音（ア・イ・ウ・エ・オの音）で始まる語には an
const ARTICLES: [string, 'a' | 'an'][] = [
  ['apple', 'an'], ['banana', 'a'], ['egg', 'an'], ['orange', 'an'], ['dog', 'a'], ['umbrella', 'an'], ['elephant', 'an'],
  ['book', 'a'], ['hour', 'an'], ['uniform', 'a'], ['island', 'an'], ['owl', 'an'], ['university', 'a'], ['idea', 'an'],
  ['eraser', 'an'], ['cat', 'a'], ['ant', 'an'], ['house', 'a'], ['old car', 'an'], ['big apple', 'a'],
]

export function articleQ(rng: Rng = Math.random): PuzzleQ {
  const [noun, art] = ARTICLES[Math.floor(rng() * ARTICLES.length)]
  const choices = ['a', 'an']
  const why =
    noun === 'hour'
      ? 'hour は h を読まず「アワー」と母音で始まるので an'
      : noun === 'uniform' || noun === 'university'
        ? `${noun} は「ユ」（子音の音）で始まるので a`
        : art === 'an'
          ? `${noun} は母音の音で始まるので an`
          : `${noun} は子音の音で始まるので a`
  return { prompt: `___ ${noun}`, choices, answer: choices.indexOf(art), why, wordId: idOf(noun) ?? '' }
}

// 時の前置詞：in（月・年・季節・朝/午後/夕方）、on（曜日・日付）、at（時刻・夜）
const TIME_PREPS: [string, 'in' | 'on' | 'at', string][] = [
  ['Monday', 'on', '曜日には on'], ['Sunday morning', 'on', '特定の日の朝も on'], ['July 4th', 'on', '日付には on'], ['my birthday', 'on', '特定の日には on'],
  ['seven o\'clock', 'at', '時刻には at'], ['noon', 'at', '正午（時刻）には at'], ['night', 'at', 'at night（夜に）は決まった言い方'],
  ['April', 'in', '月には in'], ['2026', 'in', '年には in'], ['summer', 'in', '季節には in'], ['the morning', 'in', 'in the morning（午前中に）'], ['the evening', 'in', 'in the evening（夕方に）'],
]

export function timePrepQ(rng: Rng = Math.random): PuzzleQ {
  const [t, p, why] = TIME_PREPS[Math.floor(rng() * TIME_PREPS.length)]
  const choices = ['in', 'on', 'at']
  return { prompt: `I go to the park ___ ${t}.`, choices, answer: choices.indexOf(p), why, wordId: '' }
}

// 疑問詞
const WH_QS: [string, string, string][] = [
  ['___ is your name? — My name is Aki.', 'What', '名前（何）をたずねるので What'],
  ['___ do you live? — I live in Kobe.', 'Where', '場所をたずねるので Where'],
  ['___ is your birthday? — It\'s May 5th.', 'When', '時（いつ）をたずねるので When'],
  ['___ is that boy? — He is my brother.', 'Who', '人（だれ）をたずねるので Who'],
  ['___ are you sad? — Because I lost my key.', 'Why', 'Because で答えているので理由をたずねる Why'],
  ['___ old are you? — I\'m thirteen.', 'How', '年れいは How old'],
  ['___ bag is this? — It\'s mine.', 'Whose', '持ち主（だれの）をたずねるので Whose'],
  ['___ do you like, tea or coffee? — Tea.', 'Which', '2つのうち「どちら」なので Which'],
  ['___ many cats do you have? — Two.', 'How', '数は How many'],
  ['___ time is it? — It\'s ten.', 'What', '時刻は What time'],
]

export function whQ(rng: Rng = Math.random): PuzzleQ {
  const [prompt, ans, why] = WH_QS[Math.floor(rng() * WH_QS.length)]
  const pool = ['What', 'Where', 'When', 'Who', 'Why', 'How', 'Whose', 'Which'].filter((x) => x !== ans)
  const choices = shuffle([ans, ...shuffle(pool, rng).slice(0, 3)], rng)
  return { prompt, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// 否定文：don't・doesn't・didn't
const NEG_QS: [string, "don't" | "doesn't" | "didn't", string][] = [
  ["I ___ like carrots.", "don't", 'I なので don\'t'],
  ["He ___ play tennis.", "doesn't", 'He（3人称単数）なので doesn\'t'],
  ["We ___ go to school yesterday.", "didn't", 'yesterday（過去）なので didn\'t'],
  ["My sister ___ eat meat.", "doesn't", 'My sister（3人称単数）なので doesn\'t'],
  ["They ___ have a car.", "don't", 'They なので don\'t'],
  ["She ___ come to the party last night.", "didn't", 'last night（過去）なので didn\'t'],
  ["You ___ need an umbrella today.", "don't", 'You なので don\'t'],
  ["The shop ___ open on Mondays.", "doesn't", 'The shop（3人称単数）なので doesn\'t'],
  ["I ___ see him last week.", "didn't", 'last week（過去）なので didn\'t'],
  ["Tom and Ken ___ live here.", "don't", 'Tom and Ken（複数）なので don\'t'],
]

export function negQ(rng: Rng = Math.random): PuzzleQ {
  const [prompt, ans, why] = NEG_QS[Math.floor(rng() * NEG_QS.length)]
  const choices = ["don't", "doesn't", "didn't"]
  return { prompt, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// 場所の前置詞：in（中に）、on（上に・接して）、under（下に）、by（そばに）
const PLACE_PREPS: [string, 'in' | 'on' | 'under' | 'by', string][] = [
  ['The cat is sleeping ___ the box.', 'in', '箱の「中」なので in'],
  ['There is a cup ___ the table.', 'on', 'テーブルの「上」（接している）なので on'],
  ['My shoes are ___ the bed.', 'under', 'ベッドの「下」なので under'],
  ['He is standing ___ the window.', 'by', '窓の「そば」なので by'],
  ['There are fish ___ the river.', 'in', '川の「中」なので in'],
  ['A picture is ___ the wall.', 'on', '壁に接しているので on'],
  ['The dog is lying ___ the tree.', 'under', '木の「下」なので under'],
  ['We had lunch ___ the lake.', 'by', '湖の「そば」なので by'],
  ['I live ___ Osaka.', 'in', '都市・国の「中」なので in'],
  ['Your pen is ___ the desk.', 'on', '机の「上」なので on'],
  ['Let\'s hide ___ the bridge.', 'under', '橋の「下」なので under'],
  ['My house is ___ the station.', 'by', '駅の「そば」なので by'],
]

export function placePrepQ(rng: Rng = Math.random): PuzzleQ {
  const [prompt, ans, why] = PLACE_PREPS[Math.floor(rng() * PLACE_PREPS.length)]
  const choices = ['in', 'on', 'under', 'by']
  return { prompt, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// 助動詞：can（できる）、must（〜しなければならない）、should（〜したほうがよい）
const MODALS: [string, string, string][] = [
  ['My brother ___ swim very fast.（泳ぐことができる）', 'can', '「できる」なので can'],
  ['You ___ stop at a red light.（止まらなければならない）', 'must', '「しなければならない」（ルール）なので must'],
  ['You ___ go to bed early tonight.（寝たほうがいい）', 'should', '「したほうがよい」（アドバイス）なので should'],
  ['___ you play the guitar?（ひけますか）', 'Can', '「できますか」とたずねるので Can'],
  ['Students ___ wear a uniform at this school.（着なければならない）', 'must', '学校の決まりで「しなければならない」なので must'],
  ['You look tired. You ___ take a rest.（休んだほうがいい）', 'should', '「したほうがよい」（アドバイス）なので should'],
  ['I ___ speak a little Chinese.（話せる）', 'can', '「できる」なので can'],
  ['We ___ be quiet in the library.（静かにしなければならない）', 'must', '図書館の決まりで「しなければならない」なので must'],
  ['You ___ eat more vegetables.（食べたほうがいい）', 'should', '「したほうがよい」（アドバイス）なので should'],
  ['Birds ___ fly, but penguins can\'t.（飛べる）', 'can', '「できる」なので can'],
]

export function modalQ(rng: Rng = Math.random): PuzzleQ {
  const [prompt, ans, why] = MODALS[Math.floor(rng() * MODALS.length)]
  const choices = prompt.startsWith('___') ? ['Can', 'Must', 'Should'] : ['can', 'must', 'should']
  return { prompt, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// 代名詞：主格（〜は）・所有格（〜の）・目的格（〜を・〜に）
const PRONOUNS: [string, string, string[], string][] = [
  ['Ken is my friend. ___ lives near my house.', 'He', ['He', 'His', 'Him'], '文の主語（〜は）なので He'],
  ['This is Yumi. I like ___ very much.', 'her', ['she', 'her', 'hers'], '動詞 like のあと（〜を）なので her'],
  ['Tom has a dog. ___ dog is very big.', 'His', ['He', 'His', 'Him'], '「彼の」犬なので His'],
  ['My parents are kind. I love ___.', 'them', ['they', 'their', 'them'], '動詞 love のあと（〜を）なので them'],
  ['We have a new teacher. ___ name is Mr. Sato.', 'Her', ['She', 'Her', 'Hers'], '「彼女の」名前なので Her'],
  ['Aki and I are in the same class. ___ are good friends.', 'We', ['We', 'Our', 'Us'], '文の主語（〜は）なので We'],
  ['Please help ___. This box is heavy.', 'me', ['I', 'my', 'me'], '動詞 help のあと（〜を）なので me'],
  ['The students opened ___ books.', 'their', ['they', 'their', 'them'], '「彼らの」本なので their'],
  ['Come and play with ___!', 'us', ['we', 'our', 'us'], '前置詞 with のあとなので us'],
  ['I have a cat. ___ name is Tama.', 'Its', ['It', 'Its', 'It\'s'], '「それの」名前なので Its（It\'s は it is の短縮形）'],
]

export function pronounQ(rng: Rng = Math.random): PuzzleQ {
  const [prompt, ans, choices, why] = PRONOUNS[Math.floor(rng() * PRONOUNS.length)]
  return { prompt, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// 文法ミックス：文法パズルから1問ずつランダム
const GRAMMAR_MAKERS = [pronounQ, modalQ, placePrepQ, negQ, beQ, articleQ, thirdQ, ingQ, pluralQ, pastQ, compareQ, timePrepQ, whQ]

export function grammarMixQ(rng: Rng = Math.random): PuzzleQ {
  return GRAMMAR_MAKERS[Math.floor(rng() * GRAMMAR_MAKERS.length)](rng)
}

// 同じ発音でつづりと意味がちがう単語（同音異義語）
export const HOMOPHONES: [string, string, string, string][] = [
  ['sea', '海', 'see', '見る'], ['son', '息子', 'sun', '太陽'], ['two', '2', 'too', '〜も'], ['eight', '8', 'ate', '食べた'],
  ['right', '右・正しい', 'write', '書く'], ['flower', '花', 'flour', '小麦粉'], ['meet', '会う', 'meat', '肉'],
  ['hear', '聞こえる', 'here', 'ここに'], ['know', '知っている', 'no', 'いいえ'], ['week', '週', 'weak', '弱い'],
  ['blue', '青', 'blew', '（風が）ふいた'], ['buy', '買う', 'bye', 'さようなら'], ['road', '道', 'rode', '乗った'],
  ['tail', 'しっぽ', 'tale', 'お話'], ['pair', '1組', 'pear', '洋なし'], ['hour', '1時間', 'our', '私たちの'],
  ['knight', '騎士', 'night', '夜'], ['mail', '郵便', 'male', '男性の'],
]

export function homophoneQ(rng: Rng = Math.random): PuzzleQ {
  const i = Math.floor(rng() * HOMOPHONES.length)
  const flip = rng() < 0.5
  const [a, aJa, b, bJa] = HOMOPHONES[i]
  const [ask, askJa, ans, ansJa] = flip ? [b, bJa, a, aJa] : [a, aJa, b, bJa]
  const others = shuffle(HOMOPHONES.filter((_, j) => j !== i), rng)
    .slice(0, 3)
    .map((h) => h[rng() < 0.5 ? 0 : 2])
  const choices = shuffle([ans, ...others], rng)
  return {
    prompt: `「${ask}（${askJa}）」と同じ発音の単語は？`,
    choices,
    answer: choices.indexOf(ans),
    why: `${ask}（${askJa}）と ${ans}（${ansJa}）は同じ発音`,
    wordId: idOf(ask) ?? idOf(ans) ?? '',
  }
}

// 英語なぞなぞ（昔から言われている短いなぞなぞ）
export const RIDDLES: { q: string; ja: string; a: string }[] = [
  { q: "I have keys, but I can't open locks. What am I?", ja: 'かぎ（キー）があるのに、錠は開けられない', a: 'piano' },
  { q: 'What has hands but cannot clap?', ja: '手（針）があるのに、手をたたけない', a: 'clock' },
  { q: 'What has a neck but no head?', ja: '首があるのに、頭がない', a: 'bottle' },
  { q: 'What gets wetter the more it dries?', ja: 'ふけばふくほど、ぬれていく', a: 'towel' },
  { q: 'What has an eye but cannot see?', ja: '目（穴）があるのに、見えない', a: 'needle' },
  { q: 'What goes up but never comes down?', ja: '上がるけれど、下がらない', a: 'age' },
  { q: 'What has many teeth but cannot bite?', ja: '歯がたくさんあるのに、かめない', a: 'comb' },
  { q: 'What has legs but cannot walk?', ja: '脚があるのに、歩けない', a: 'table' },
  { q: 'What can you catch but not throw?', ja: 'つかまえられる（ひける）のに、投げられない', a: 'cold' },
  { q: 'What has a face and two hands but no arms or legs?', ja: '顔と2本の手（針）があるのに、腕も脚もない', a: 'clock' },
]

export function riddleQ(rng: Rng = Math.random): PuzzleQ {
  const r = RIDDLES[Math.floor(rng() * RIDDLES.length)]
  const pool = [...new Set(RIDDLES.map((x) => x.a))].filter((x) => x !== r.a)
  const choices = shuffle([r.a, ...shuffle(pool, rng).slice(0, 3)], rng)
  return { prompt: r.q, choices, answer: choices.indexOf(r.a), why: `${r.ja} → ${r.a}`, wordId: idOf(r.a) ?? '' }
}
