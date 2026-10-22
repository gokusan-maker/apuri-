// 文法のなかま分け：4つの英文のうち、1つだけちがう文法の文をさがす
import { GRAMMAR, type GrammarQuestion, type GrammarUnit } from './grammar'

const fill = (q: GrammarQuestion) => (q.choices[q.answer].startsWith('（') ? q.sentence.replace(/___ ?/, '') : q.sentence.replace('___', q.choices[q.answer]))
export const sentencesOf = (u: GrammarUnit) => [...u.examples.map((e) => e.en), ...u.questions.map(fill)]

export type OddQ = { sentences: string[]; odd: number; unit: GrammarUnit; other: GrammarUnit }

// rnd は 0〜1 の乱数を返す関数
export function makeOdd(rnd: () => number, units: GrammarUnit[] = GRAMMAR): OddQ {
  const pick = <T,>(xs: T[]) => xs[Math.floor(rnd() * xs.length)]
  const unit = pick(units)
  const other = pick(units.filter((u) => u.id !== unit.id))
  const pool = [...sentencesOf(unit)]
  const three: string[] = []
  while (three.length < 3 && pool.length > 0) three.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0])
  const odd = Math.floor(rnd() * 4)
  const sentences = [...three]
  sentences.splice(odd, 0, pick(sentencesOf(other)))
  return { sentences, odd, unit, other }
}
