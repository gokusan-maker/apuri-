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
