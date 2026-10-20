// 中学で習う主な不規則動詞（原形・過去形・過去分詞・意味）
import { shuffle, type Rng } from './quiz'

export type Verb = { base: string; past: string; pp: string; ja: string }

export const VERBS: Verb[] = [
  { base: 'begin', past: 'began', pp: 'begun', ja: '始める' },
  { base: 'break', past: 'broke', pp: 'broken', ja: '壊す' },
  { base: 'bring', past: 'brought', pp: 'brought', ja: '持ってくる' },
  { base: 'build', past: 'built', pp: 'built', ja: '建てる' },
  { base: 'buy', past: 'bought', pp: 'bought', ja: '買う' },
  { base: 'catch', past: 'caught', pp: 'caught', ja: '捕まえる' },
  { base: 'choose', past: 'chose', pp: 'chosen', ja: '選ぶ' },
  { base: 'come', past: 'came', pp: 'come', ja: '来る' },
  { base: 'do', past: 'did', pp: 'done', ja: 'する' },
  { base: 'drink', past: 'drank', pp: 'drunk', ja: '飲む' },
  { base: 'drive', past: 'drove', pp: 'driven', ja: '運転する' },
  { base: 'eat', past: 'ate', pp: 'eaten', ja: '食べる' },
  { base: 'fall', past: 'fell', pp: 'fallen', ja: '落ちる' },
  { base: 'feel', past: 'felt', pp: 'felt', ja: '感じる' },
  { base: 'find', past: 'found', pp: 'found', ja: '見つける' },
  { base: 'fly', past: 'flew', pp: 'flown', ja: '飛ぶ' },
  { base: 'forget', past: 'forgot', pp: 'forgotten', ja: '忘れる' },
  { base: 'give', past: 'gave', pp: 'given', ja: '与える' },
  { base: 'go', past: 'went', pp: 'gone', ja: '行く' },
  { base: 'have', past: 'had', pp: 'had', ja: '持っている' },
  { base: 'hear', past: 'heard', pp: 'heard', ja: '聞こえる' },
  { base: 'know', past: 'knew', pp: 'known', ja: '知っている' },
  { base: 'leave', past: 'left', pp: 'left', ja: '去る・出発する' },
  { base: 'lose', past: 'lost', pp: 'lost', ja: 'なくす・負ける' },
  { base: 'make', past: 'made', pp: 'made', ja: '作る' },
  { base: 'meet', past: 'met', pp: 'met', ja: '会う' },
  { base: 'run', past: 'ran', pp: 'run', ja: '走る' },
  { base: 'say', past: 'said', pp: 'said', ja: '言う' },
  { base: 'see', past: 'saw', pp: 'seen', ja: '見る' },
  { base: 'sell', past: 'sold', pp: 'sold', ja: '売る' },
  { base: 'send', past: 'sent', pp: 'sent', ja: '送る' },
  { base: 'sing', past: 'sang', pp: 'sung', ja: '歌う' },
  { base: 'sit', past: 'sat', pp: 'sat', ja: '座る' },
  { base: 'sleep', past: 'slept', pp: 'slept', ja: '眠る' },
  { base: 'speak', past: 'spoke', pp: 'spoken', ja: '話す' },
  { base: 'swim', past: 'swam', pp: 'swum', ja: '泳ぐ' },
  { base: 'take', past: 'took', pp: 'taken', ja: '取る・持っていく' },
  { base: 'teach', past: 'taught', pp: 'taught', ja: '教える' },
  { base: 'tell', past: 'told', pp: 'told', ja: '伝える' },
  { base: 'think', past: 'thought', pp: 'thought', ja: '思う・考える' },
  { base: 'win', past: 'won', pp: 'won', ja: '勝つ' },
  { base: 'write', past: 'wrote', pp: 'written', ja: '書く' },
  { base: 'become', past: 'became', pp: 'become', ja: '〜になる' },
  { base: 'cut', past: 'cut', pp: 'cut', ja: '切る' },
  { base: 'draw', past: 'drew', pp: 'drawn', ja: '（絵を）描く' },
  { base: 'grow', past: 'grew', pp: 'grown', ja: '育つ・育てる' },
  { base: 'hide', past: 'hid', pp: 'hidden', ja: 'かくす・かくれる' },
  { base: 'hit', past: 'hit', pp: 'hit', ja: '打つ・当たる' },
  { base: 'hold', past: 'held', pp: 'held', ja: '持つ・開く' },
  { base: 'keep', past: 'kept', pp: 'kept', ja: '保つ' },
  { base: 'lend', past: 'lent', pp: 'lent', ja: '貸す' },
  { base: 'pay', past: 'paid', pp: 'paid', ja: '払う' },
  { base: 'put', past: 'put', pp: 'put', ja: '置く' },
  { base: 'ride', past: 'rode', pp: 'ridden', ja: '乗る' },
  { base: 'spend', past: 'spent', pp: 'spent', ja: '過ごす・使う' },
  { base: 'stand', past: 'stood', pp: 'stood', ja: '立つ' },
  { base: 'throw', past: 'threw', pp: 'thrown', ja: '投げる' },
  { base: 'understand', past: 'understood', pp: 'understood', ja: '理解する' },
  { base: 'wake', past: 'woke', pp: 'woken', ja: '目を覚ます' },
  { base: 'wear', past: 'wore', pp: 'worn', ja: '着ている' },
  { base: 'read', past: 'read', pp: 'read', ja: '読む' },
  { base: 'rise', past: 'rose', pp: 'risen', ja: '上がる・昇る' },
  { base: 'shake', past: 'shook', pp: 'shaken', ja: '振る・揺れる' },
  { base: 'steal', past: 'stole', pp: 'stolen', ja: '盗む' },
  { base: 'bite', past: 'bit', pp: 'bitten', ja: 'かむ' },
  { base: 'blow', past: 'blew', pp: 'blown', ja: '（風が）吹く' },
  { base: 'feed', past: 'fed', pp: 'fed', ja: 'えさをやる' },
  { base: 'fight', past: 'fought', pp: 'fought', ja: '戦う' },
  { base: 'forgive', past: 'forgave', pp: 'forgiven', ja: '許す' },
  { base: 'lead', past: 'led', pp: 'led', ja: '導く' },
  { base: 'mean', past: 'meant', pp: 'meant', ja: '意味する' },
  { base: 'show', past: 'showed', pp: 'shown', ja: '見せる' },
  { base: 'shoot', past: 'shot', pp: 'shot', ja: '撃つ・シュートする' },
  { base: 'tear', past: 'tore', pp: 'torn', ja: '引き裂く' },
  { base: 'dig', past: 'dug', pp: 'dug', ja: '掘る' },
]

// うっかり規則変化させた形（よくある間違い）
export function regularize(base: string): string {
  if (base.endsWith('e')) return base + 'd'
  if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + 'ied'
  return base + 'ed'
}

export type Tense = 'past' | 'pp'
export const TENSE_LABEL: Record<Tense, string> = { past: '過去形', pp: '過去分詞' }

export type VerbQuestion = { verb: Verb; tense: Tense; choices: string[]; answer: number }

export function makeVerbQuestion(verb: Verb, tense: Tense, rng: Rng = Math.random): VerbQuestion {
  const correct = verb[tense]
  const other = tense === 'past' ? verb.pp : verb.past
  const wrong: string[] = []
  const push = (w: string) => {
    if (w !== correct && !wrong.includes(w) && wrong.length < 3) wrong.push(w)
  }
  // 同じ動詞の別の形・規則変化のまちがいを優先し、足りなければ他の動詞の同じ形
  ;[other, regularize(verb.base), verb.base].forEach(push)
  for (const v of shuffle(VERBS, rng)) push(v[tense])
  const choices = shuffle([correct, ...wrong], rng)
  return { verb, tense, choices, answer: choices.indexOf(correct) }
}

export function makeVerbDrill(count = 10, rng: Rng = Math.random): VerbQuestion[] {
  return shuffle(VERBS, rng)
    .slice(0, count)
    .map((v) => makeVerbQuestion(v, rng() < 0.5 ? 'past' : 'pp', rng))
}
