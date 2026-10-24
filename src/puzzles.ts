// ちょっとした4択パズル（ABC順・反対の意味・仲間はずれ）
import { ordinal } from './numbers'
import { shuffle, type Rng } from './quiz'
import { EMOJI } from './emoji'
import { WORDS, type Word } from './words'

export type PuzzleQ = { prompt: string; choices: string[]; answer: number; why: string; wordId: string; explain?: string[]; say?: string; hint?: string } // hint：答える前に1回見られるヒント / explain：くわしい解説（行ごと） / say：答えあわせで🔊で聞ける英語

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
// ペアにはないが、反対語として正しくなってしまう組み合わせ
const OPPOSITE_CLASH: Record<string, string[]> = { dark: ['light'], light: ['dark'], hard: ['easy'], easy: ['hard'], warm: ['cold'], cold: ['warm'], cool: ['hot'], hot: ['cool'], far: ['close'], bright: ['dark'], difficult: ['easy'] }

export function oppositeQ(rng: Rng = Math.random): PuzzleQ {
  const [a, b] = OPPOSITES[Math.floor(rng() * OPPOSITES.length)]
  const [ask, ans] = rng() < 0.5 ? [a, b] : [b, a]
  // ask の反対語になりうる語（ほかのペアの相手・似た意味の語）は誤答に出さない（dark に light、hard に easy など）
  const used = new Set([a, b, ...OPPOSITES.filter((p) => p.includes(ask)).flat(), ...(OPPOSITE_CLASH[ask] ?? [])])
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
  // busses・persons は辞書にもある別の形なので、誤答に出さない
  const cands = [...new Set([...wrongPlurals(one), `${one}en`, `${one.slice(0, -1)}ies`])].filter((x) => x !== many && x !== one && x !== 'busses' && x !== 'persons')
  const wrong = shuffle(cands, rng).slice(0, 3)
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
  ['The cat is sleeping ___ the box.（箱の中で）', 'in', '箱の「中」なので in'],
  ['There is a cup ___ the table.（テーブルの上に）', 'on', 'テーブルの「上」（接している）なので on'],
  ['My shoes are ___ the bed.（ベッドの下に）', 'under', 'ベッドの「下」なので under'],
  ['He is standing ___ the window.（窓のそばに）', 'by', '窓の「そば」なので by'],
  ['There are fish ___ the river.（川の中に）', 'in', '川の「中」なので in'],
  ['A picture is ___ the wall.（壁にかかって）', 'on', '壁に接しているので on'],
  ['The dog is lying ___ the tree.（木の下に）', 'under', '木の「下」なので under'],
  ['We had lunch ___ the lake.（湖のそばで）', 'by', '湖の「そば」なので by'],
  ['I live ___ Osaka.（大阪に）', 'in', '都市・国の「中」なので in'],
  ['Your pen is ___ the desk.（机の上に）', 'on', '机の「上」なので on'],
  ['Let\'s hide ___ the bridge.（橋の下に）', 'under', '橋の「下」なので under'],
  ['My house is ___ the station.（駅のそばに）', 'by', '駅の「そば」なので by'],
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
  ['We have a new teacher. ___ name is Ms. Sato.', 'Her', ['She', 'Her', 'Hers'], '「彼女の」名前なので Her'],
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

// much と many：数えられる名詞の複数形には many、数えられない名詞には much
const MUCH_MANY: [string, 'much' | 'many', string][] = [
  ['How ___ apples do you want?', 'many', 'apples は数えられる名詞（複数形）なので many'],
  ['How ___ water do you drink every day?', 'much', 'water は数えられない名詞なので much'],
  ['I don\'t have ___ time today.', 'much', 'time（時間）は数えられない名詞なので much'],
  ['There are ___ books in the library.', 'many', 'books は数えられる名詞（複数形）なので many'],
  ['How ___ money do you have?', 'much', 'money は数えられない名詞なので much'],
  ['She has ___ friends in Canada.', 'many', 'friends は数えられる名詞（複数形）なので many'],
  ['We didn\'t get ___ snow this winter.', 'much', 'snow は数えられない名詞なので much'],
  ['How ___ students are in your class?', 'many', 'students は数えられる名詞（複数形）なので many'],
  ['Don\'t put too ___ sugar in my tea.', 'much', 'sugar は数えられない名詞なので much'],
  ['I saw ___ birds by the river.', 'many', 'birds は数えられる名詞（複数形）なので many'],
]

export function muchManyQ(rng: Rng = Math.random): PuzzleQ {
  const [prompt, ans, why] = MUCH_MANY[Math.floor(rng() * MUCH_MANY.length)]
  const choices = ['much', 'many']
  return { prompt, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// 序数（〜番目）：1〜31から出題。「12番目」→ twelfth
export function ordinalQ(rng: Rng = Math.random): PuzzleQ {
  const n = 1 + Math.floor(rng() * 31)
  const others = new Set<number>()
  while (others.size < 3) {
    const m = 1 + Math.floor(rng() * 31)
    if (m !== n) others.add(m)
  }
  const ans = ordinal(n)
  const choices = shuffle([ans, ...[...others].map(ordinal)], rng)
  const why = n === 1 || n === 2 || n === 3 ? `${n}番目は特別な形で ${ans}` : `${n}番目は ${ans}（日付にも使う：the ${ans}）`
  return { prompt: `「${n}番目」は英語で？`, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// was と were：主語が I・he・she・it・1人/1つなら was、you・複数なら were
const WAS_WERE: [string, 'was' | 'were', string][] = [
  ['I ___ at home yesterday.', 'was', '主語が I なので was'],
  ['They ___ very happy last night.', 'were', '主語が They（複数）なので were'],
  ['My mother ___ busy this morning.', 'was', '主語が My mother（1人）なので was'],
  ['You ___ late for school yesterday.', 'were', '主語が You なので were'],
  ['The movie ___ very exciting.', 'was', '主語が The movie（1つ）なので was'],
  ['Ken and Aki ___ in the library.', 'were', '主語が Ken and Aki（2人）なので were'],
  ['It ___ cold last week.', 'was', '主語が It なので was'],
  ['We ___ tired after the game.', 'were', '主語が We（複数）なので were'],
  ['There ___ many people at the park.', 'were', 'many people（複数）なので were'],
  ['There ___ a cat on the roof.', 'was', 'a cat（1匹）なので was'],
]

export function wasWereQ(rng: Rng = Math.random): PuzzleQ {
  const [prompt, ans, why] = WAS_WERE[Math.floor(rng() * WAS_WERE.length)]
  const choices = ['was', 'were']
  return { prompt, choices, answer: choices.indexOf(ans), why, wordId: '' }
}

// 文法ミックス：文法パズルから1問ずつランダム
const GRAMMAR_MAKERS = [wasWereQ, muchManyQ, pronounQ, modalQ, placePrepQ, negQ, beQ, articleQ, thirdQ, ingQ, pluralQ, pastQ, compareQ, timePrepQ, whQ]

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

// 英語なぞなぞ（英語圏で昔から言われている有名ななぞなぞ）
// ja：問題の訳 / aja：答えの意味 / trick：英語のしかけ（1つの語が2つの意味をもつ など）
export const RIDDLES: { q: string; ja: string; a: string; aja: string; trick: string }[] = [
  { q: "I have keys, but I can't open locks. What am I?", ja: 'わたしにはキー（かぎ）があるけれど、錠は開けられない。わたしはなに？', a: 'piano', aja: 'ピアノ', trick: 'key には「かぎ」と「（ピアノの）鍵盤」の2つの意味がある。lock は「錠（じょう）」。' },
  { q: 'What has hands but cannot clap?', ja: '手があるのに、手をたたけないものはなに？', a: 'clock', aja: '時計', trick: 'hand には「手」と「（時計の）針」の2つの意味がある。clap は「手をたたく」。' },
  { q: 'What has a neck but no head?', ja: '首があるのに、頭がないものはなに？', a: 'bottle', aja: 'びん', trick: 'neck は「首」。びんの細くなった口のところも英語で neck という。' },
  { q: 'What gets wetter the more it dries?', ja: 'かわかせばかわかすほど、ぬれていくものはなに？', a: 'towel', aja: 'タオル', trick: 'dry には「かわく」と「（ふいて）かわかす」の意味がある。タオルは体をふいてかわかすほど、自分はぬれていく。the 比較級, the 比較級 の形にも注目。' },
  { q: 'What has an eye but cannot see?', ja: '目があるのに、見えないものはなに？', a: 'needle', aja: '針（ぬい針）', trick: 'eye には「目」と「針の穴（めど）」の意味がある。' },
  { q: 'What goes up but never comes down?', ja: '上がるけれど、けっして下がらないものはなに？', a: 'age', aja: '年れい', trick: '年れい（age）は go up（上がる）だけで、come down（下がる）ことはない。never は「けっして〜ない」。' },
  { q: 'What has many teeth but cannot bite?', ja: '歯がたくさんあるのに、かめないものはなに？', a: 'comb', aja: 'くし', trick: 'teeth は tooth（歯）の複数形。くしのギザギザも英語で teeth という。bite は「かむ」。' },
  { q: 'What has legs but cannot walk?', ja: '脚があるのに、歩けないものはなに？', a: 'table', aja: 'テーブル', trick: 'leg は人の「脚」にも、テーブルやいすの「脚」にも使う。' },
  { q: 'What can you catch but not throw?', ja: 'キャッチ（つかまえる）できるのに、投げられないものはなに？', a: 'cold', aja: 'かぜ', trick: 'catch a cold で「かぜをひく」。catch はボールを「とる」のほかに、病気に「かかる」の意味もある。' },
  { q: 'What has a face and two hands but no arms or legs?', ja: '顔と2本の手があるのに、腕も脚もないものはなに？', a: 'clock', aja: '時計', trick: 'face は時計の「文字ばん」、hands は時計の「針」のこと。' },
  { q: 'What has to be broken before you can use it?', ja: '使う前にこわさ（わら）なければならないものはなに？', a: 'egg', aja: 'たまご', trick: 'break は「こわす」と「（たまごを）わる」の両方。has to be broken は受け身「わられなければならない」。' },
  { q: 'What is full of holes but still holds water?', ja: 'あなだらけなのに、水をためておけるものはなに？', a: 'sponge', aja: 'スポンジ', trick: 'be full of 〜 で「〜でいっぱい」。hold は「持つ・（水を）ためておく」。' },
  { q: 'What can travel around the world while staying in a corner?', ja: 'すみっこにいたまま、世界中を旅できるものはなに？', a: 'stamp', aja: '切手', trick: '切手は封筒のすみ（corner）にはられたまま、手紙といっしょに世界中へ行く。while 〜ing で「〜しながら」。' },
  { q: 'What has a head and a tail but no body?', ja: '頭としっぽがあるのに、体がないものはなに？', a: 'coin', aja: 'コイン（硬貨）', trick: 'コインの「表」を head、「裏」を tail という（Heads or tails?「表か裏か？」）。' },
  { q: 'What has a mouth but never eats, and a bed but never sleeps?', ja: '口があるのに食べず、ベッドがあるのにねむらないものはなに？', a: 'river', aja: '川', trick: 'mouth は「河口」、bed は「川床（川の底）」の意味もある。' },
  { q: 'What has words but never speaks?', ja: 'ことばがあるのに、けっして話さないものはなに？', a: 'book', aja: '本', trick: '本にはたくさんの words（ことば）が書いてあるけれど、本そのものは speak（話す）しない。' },
  { q: 'What gets bigger the more you take away from it?', ja: 'とればとるほど、大きくなるものはなに？', a: 'hole', aja: 'あな', trick: 'あなは土を take away（取りのぞく）ほど大きくなる。the 比較級, the 比較級 の形（the more 〜）。' },
  { q: 'What belongs to you, but other people use it more than you do?', ja: 'あなたのものなのに、あなたよりほかの人のほうがよく使うものはなに？', a: 'name', aja: '名前', trick: '自分の名前は、自分よりもまわりの人がよびかけるときに使う。belong to 〜 で「〜のものである」。' },
  { q: 'What has a thumb and four fingers but is not alive?', ja: '親指と4本の指があるのに、生きていないものはなに？', a: 'glove', aja: '手ぶくろ', trick: 'thumb は「親指」。英語では親指を finger と分けて言うことが多い。alive は「生きている」。' },
  { q: 'What can fill a room but takes up no space?', ja: '部屋をいっぱいにできるのに、場所をとらないものはなに？', a: 'light', aja: '光', trick: 'fill は「満たす」、take up space は「場所をとる」。光は部屋中を明るくするけれど、場所はとらない。' },
  { q: 'What kind of room has no doors or windows?', ja: 'ドアもまども、ない部屋（ルーム）はなに？', a: 'mushroom', aja: 'きのこ', trick: 'mushroom（きのこ）の最後が room（部屋）になっている、ことば遊び。' },
  { q: 'What starts with T, ends with T, and has T in it?', ja: 'T で始まり、T で終わり、中に T が入っているものはなに？', a: 'teapot', aja: 'ティーポット', trick: 'teapot は t で始まり t で終わる。そして中に tea（お茶＝ T と同じ発音）が入っている。' },
  { q: 'What has one head, one foot, and four legs?', ja: '頭が1つ、足が1つ、脚が4本あるものはなに？', a: 'bed', aja: 'ベッド', trick: 'ベッドのまくら側を head、足もと側を foot という。4本の legs はベッドの脚。' },
  { q: 'What can you hold without ever touching it?', ja: '一度もさわらずに、ホールド（持つ）できるものはなに？', a: 'breath', aja: '息', trick: 'hold one\'s breath で「息を止める」。hold は「持つ」のほかに「止めておく」の意味もある。' },
  { q: 'What has a ring but no finger?', ja: 'リング（指輪）があるのに、指がないものはなに？', a: 'phone', aja: '電話', trick: 'ring は名詞で「指輪」、動詞で「（電話・ベルが）鳴る」。The phone is ringing.（電話が鳴っている）' },
  { q: 'What runs around the whole yard without moving?', ja: '動かないのに、庭じゅうを走りまわっているものはなに？', a: 'fence', aja: 'へい・さく', trick: 'run には「走る」のほかに「（道やへいが）続いている・のびている」の意味がある。' },
  { q: 'What goes through towns and over hills but never moves?', ja: '町を通りぬけ、丘をこえていくのに、けっして動かないものはなに？', a: 'road', aja: '道', trick: 'go through 〜（〜を通りぬける）は道が「のびている」ことにも使える。道そのものは動かない。' },
  { q: 'What is black when you buy it, red when you use it, and gray when you throw it away?', ja: '買うときは黒、使うときは赤、すてるときは灰色のものはなに？', a: 'charcoal', aja: '炭', trick: '炭は黒く、燃やすと赤くなり、燃えつきると灰色の灰になる。when ＋文 を3回くり返す形。' },
  { q: 'What has many rings but no fingers?', ja: 'リング（輪）がたくさんあるのに、指がないものはなに？', a: 'tree', aja: '木', trick: '木の切り口の「年輪」も英語で rings（輪）という。ring には「指輪」の意味もある。' },
  { q: 'What can you break without touching it?', ja: 'さわらなくても、こわす（やぶる）ことができるものはなに？', a: 'promise', aja: '約束', trick: 'break a promise で「約束をやぶる」。keep a promise は「約束を守る」。' },
  { q: 'Which building has the most stories?', ja: 'いちばんたくさんの「ストーリー」がある建物はどれ？', a: 'library', aja: '図書館', trick: 'story には「物語」と「（建物の）階」の2つの意味がある。図書館には物語がいちばん多い。' },
  { q: 'What has four wheels and flies?', ja: '車輪が4つあって、フライ（とぶ）ものはなに？', a: 'garbage truck', aja: 'ごみ収集車', trick: 'flies は動詞なら「飛ぶ」、名詞なら「ハエ（fly の複数形）」。ごみ収集車にはハエがいる、というしゃれ。' },
  { q: 'What has needles but cannot sew?', ja: '針（ニードル）があるのに、ぬいものができないものはなに？', a: 'pine tree', aja: '松の木', trick: 'needle は「ぬい針」のほかに、松などの「とがった葉」の意味もある。sew は「ぬう」。' },
  { q: 'What can you keep after giving it to someone?', ja: 'だれかにあげたあとでも、持っていられるものはなに？', a: 'word', aja: '約束（ことば）', trick: 'give one\'s word で「約束する」、keep one\'s word で「約束を守る」。word には「ことば」のほかに「約束」の意味がある。' },
  { q: 'What has a tongue but cannot talk?', ja: '舌（タン）があるのに、話せないものはなに？', a: 'shoe', aja: 'くつ', trick: 'tongue は「舌」。くつのひもの下にある「ベロ」の部分も英語で tongue という。' },
  { q: 'What has a spine but no bones?', ja: '背骨があるのに、骨がないものはなに？', a: 'book', aja: '本', trick: 'spine は「背骨」。本の「背（タイトルが書いてある細いところ）」も spine という。' },
  { q: 'What has many eyes but cannot see?', ja: '目がたくさんあるのに、見えないものはなに？', a: 'potato', aja: 'じゃがいも', trick: 'eye は「目」。じゃがいもの「芽」が出るくぼみも eye という。' },
  { q: 'What is always in front of you but can never be seen?', ja: 'いつも目の前にあるのに、けっして見えないものはなに？', a: 'future', aja: '未来', trick: 'in front of 〜 は「〜の前に」。未来は時間の上で「前」にあるけれど、目には見えない。can never be seen は受け身「けっして見られない」。' },
  { q: 'What gets sharper the more you use it?', ja: '使えば使うほど、シャープ（するどく）になるものはなに？', a: 'brain', aja: '脳（頭）', trick: 'sharp は「（刃物が）するどい」と「頭がきれる」の両方。ナイフは使うとにぶくなるが、頭は使うほどさえる。' },
  { q: 'What do you throw out when you want to use it, and take in when you don\'t?', ja: '使いたいときは外へ投げ、使わないときは中へ取りこむものはなに？', a: 'anchor', aja: '（船の）いかり', trick: '船を止めたいときはいかりを海へ投げ入れ、出発するときは引き上げる。throw out（投げ出す）と take in（取りこむ）が反対。' },
  { q: 'What can you hear but cannot touch or see?', ja: '聞こえるのに、さわることも見ることもできないものはなに？', a: 'voice', aja: '声', trick: 'hear（聞こえる）・touch（さわる）・see（見る）の3つの動詞をくらべている。声は聞こえるだけ。' },
  { q: 'What has a bottom at the top?', ja: '上のほうに「ボトム（下・おしり）」があるものはなに？', a: 'leg', aja: '脚', trick: 'bottom には「いちばん下」と「おしり」の2つの意味がある。脚のいちばん上にはおしり（bottom）がある、というしゃれ。' },
  { q: 'What has cities but no houses, forests but no trees, and water but no fish?', ja: '都市はあるのに家がなく、森はあるのに木がなく、水はあるのに魚がいないものはなに？', a: 'map', aja: '地図', trick: '地図には都市・森・海がかいてあるけれど、本物の家や木や魚はない。A but no B（A はあるが B はない）を3回くり返す形。' },
  { q: 'What goes up and down but does not move?', ja: '上がったり下がったりするのに、動かないものはなに？', a: 'stairs', aja: '階段', trick: '人は階段を go up（上がる）・go down（下りる）するけれど、階段そのものは動かない。' },
  { q: 'What has one eye but cannot see?', ja: '目が1つあるのに、見えないものはなに？', a: 'storm', aja: '台風・あらし', trick: 'the eye of a storm で「台風の目」。eye は「目」のほかに「（台風の）中心」の意味もある。' },
  { q: 'What kind of tree can you carry in your hand?', ja: '手の中に持ち運べる木はなに？', a: 'palm', aja: 'てのひら（ヤシ）', trick: 'palm には「ヤシ（の木）」と「てのひら」の2つの意味がある。' },
  { q: 'What is so fragile that saying its name breaks it?', ja: 'とてもこわれやすくて、名前を言うだけでこわれてしまうものはなに？', a: 'silence', aja: 'ちんもく（しずけさ）', trick: 'silence（しーんとした静けさ）は、声に出して言ったとたんに静かでなくなる。break the silence で「沈黙をやぶる」。' },
  { q: 'What runs but never walks?', ja: 'ランする（走る）のに、けっして歩かないものはなに？', a: 'nose', aja: '鼻', trick: 'My nose is running. で「鼻水が出ている」。run には「（液体が）流れる」の意味がある。' },
  { q: 'Which letter of the alphabet is a large body of water?', ja: '広い水（うみ）になっているアルファベットはどれ？', a: 'C', aja: 'シー（海）', trick: 'C と sea（海）は同じ「シー」という発音。' },
  { q: 'Which letter of the alphabet asks a question?', ja: '質問をするアルファベットはどれ？', a: 'Y', aja: 'ワイ（なぜ）', trick: 'Y と why（なぜ）は同じ「ワイ」という発音。' },
  { q: 'What has ears but cannot hear?', ja: '耳があるのに、聞こえないものはなに？', a: 'corn', aja: 'とうもろこし', trick: 'ear は「耳」。とうもろこしの「1本（穂）」も英語で an ear of corn という。' },
  { q: 'What has bark but no bite?', ja: 'ほえる（バーク）のに、かみつかないものはなに？', a: 'tree', aja: '木', trick: 'bark は動詞で「（犬が）ほえる」、名詞で「木の皮」。木には bark（皮）があるけれど、かみつかない。' },
  { q: 'What goes up when the rain comes down?', ja: '雨がふってくると、上にあがるものはなに？', a: 'umbrella', aja: 'かさ', trick: 'go up（上がる）と come down（ふってくる）が反対の意味になっている。雨がふると、かさを開いて上にさす。' },
  { q: 'The more you take, the more you leave behind. What are they?', ja: 'とればとるほど、うしろに残していくものはなに？', a: 'footsteps', aja: '足あと', trick: 'take a step で「一歩ふみ出す」。take には「取る」のほかに「（歩みを）進める」の意味がある。leave behind は「あとに残す」。歩けば歩くほど足あとが残る。' },
  { q: "I'm tall when I'm young, and I'm short when I'm old. What am I?", ja: '若いときは背が高く、年をとると背が低くなる。わたしはなに？', a: 'candle', aja: 'ろうそく', trick: 'young / old はふつう人の年れいに使うけれど、ここでは「新しい／使いこまれた」の意味。ろうそくは燃えるほど短く（short）なる。' },
  { q: 'What is easy to get into but hard to get out of?', ja: '入るのはかんたんだけど、出るのはむずかしいものはなに？', a: 'trouble', aja: 'めんどうなこと（トラブル）', trick: 'get into trouble は「めんどうなことになる」、get out of trouble は「めんどうからぬけ出す」。部屋に入る・出るのと同じ get into / get out of を使ったしかけ。' },
  { q: 'What word is spelled wrong in every dictionary?', ja: 'どの辞書でも、まちがってつづられている単語はなに？', a: 'wrong', aja: 'wrong という単語', trick: 'spelled wrong は「まちがってつづられている」と読めるけれど、「wrong とつづられている」とも読める。どの辞書にも wrong という単語は W-R-O-N-G と書いてある。' },
  { q: 'What can you put in a bucket to make it lighter?', ja: 'バケツに入れると、バケツが軽くなるものはなに？', a: 'hole', aja: '穴', trick: 'ふつう物を入れると重くなるけれど、put a hole in a bucket（バケツに穴をあける）と中の水がぬけて軽くなる。lighter は light（軽い）の比較級。' },
  { q: 'Where does today come before yesterday?', ja: 'today（今日）が yesterday（きのう）より前に来るのはどこ？', a: 'dictionary', aja: '辞書', trick: 'come before は「〜より前に来る」。時間の順ではなく、辞書のアルファベット順では today（t）が yesterday（y）より前に出てくる。' },
  { q: 'What begins with an E but only has one letter in it?', ja: 'E で始まるのに、中に letter が1つしかないものはなに？', a: 'envelope', aja: 'ふうとう', trick: 'letter には「文字」と「手紙」の2つの意味がある。envelope（ふうとう）は E で始まり、中に手紙（letter）が1通だけ入っている。' },
  { q: 'What is always coming but never arrives?', ja: 'いつもやって来るのに、けっして着かないものはなに？', a: 'tomorrow', aja: 'あした', trick: '明日はいつも近づいて（is coming）いるけれど、来たときには「今日」になっているので、明日そのものはけっして到着（arrive）しない。' },
  { q: 'Forward I am heavy, but backward I am not. What am I?', ja: '前から読むと重いけれど、うしろから読むとそうではない。わたしはなに？', a: 'ton', aja: 'トン（重さの単位）', trick: 'ton（1トン＝1000kg）は重い。うしろから読むと not（〜でない）になる。backward I am not は「逆からだと重くない」と「逆からだと not だ」の2つの意味になる。' },
  { q: 'What comes once in a minute, twice in a moment, but never in a thousand years?', ja: '1分（minute）に1回、一瞬（moment）に2回来るのに、千年（a thousand years）には1回も来ないものはなに？', a: 'M', aja: 'M という文字', trick: '時間の話に見えて、実は文字の話。minute には m が1つ、moment には m が2つ、a thousand years には m が1つもない。' },
]

// なぞなぞのヒント：答えの最初の文字と文字数
export const riddleHint = (a: string) => `「${a[0]}」で始まる ${a.replace(/ /g, '').length}文字の英語${a.includes(' ') ? '（2語）' : ''}`

// なぞなぞの答えになってしまう別の答え（どちらも正解に見えるもの）は誤答に出さない
const RIDDLE_CLASH: Record<string, string[]> = { needle: ['storm', 'potato'], storm: ['needle', 'potato'], potato: ['needle', 'storm'], table: ['bed'], bed: ['table'], nose: ['river', 'fence', 'road'], river: ['nose'], word: ['promise'], promise: ['silence', 'word'], silence: ['promise'], phone: ['tree'], tree: ['phone'], book: ['dictionary'], dictionary: ['book'] }
export function riddleQ(rng: Rng = Math.random): PuzzleQ {
  const r = RIDDLES[Math.floor(rng() * RIDDLES.length)]
  const bad = RIDDLE_CLASH[r.a] ?? []
  const pool = [...new Set(RIDDLES.map((x) => x.a))].filter((x) => x !== r.a && !bad.includes(x))
  const choices = shuffle([r.a, ...shuffle(pool, rng).slice(0, 3)], rng)
  return { prompt: r.q, choices, answer: choices.indexOf(r.a), why: `${r.a}（${r.aja}）`, wordId: idOf(r.a) ?? '', explain: [`【訳】${r.ja}`, `【答え】${r.a}（${r.aja}）`, `【英語のしかけ】${r.trick}`], say: `${r.q} ${r.a}.`, hint: riddleHint(r.a) }
}
