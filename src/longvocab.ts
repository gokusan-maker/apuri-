// 長文の重要語句：本文に出てくる熟語と、中2以上の単語を単語帳から拾う（意味は単語帳のもの）
import { makeLookup } from './glossary'
import type { LongPassage } from './longreading'
import { levelOf, WORDS, type Word } from './words'

const lookup = makeLookup(WORDS)
const HARD = new Set(['中2', '中3', '高校基礎'])
const PHRASES = WORDS.filter((w) => levelOf(w) === '熟語' && /\s/.test(w.en) && !w.en.includes('...') && !w.en.includes('〜'))

export function keyWords(p: LongPassage, max = 14): Word[] {
  const text = p.paragraphs.join(' ').toLowerCase()
  const out = new Map<string, Word>()
  for (const w of PHRASES) if (new RegExp(`\\b${w.en.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text)) out.set(w.id, w)
  for (const tok of p.paragraphs.join(' ').split(/[\s,.!?"():;]+/)) {
    const w = lookup(tok)
    if (w && HARD.has(levelOf(w))) out.set(w.id, w)
  }
  return [...out.values()].slice(0, max)
}

// 長文の重要語句クイズ：読んだ長文の重要語句から5問（意味を3択）
export function makeVocabQuiz(words: Word[], rnd: () => number, n = 5) {
  const pool = [...new Map(words.map((w) => [w.id, w])).values()]
  const qs: { w: Word; choices: string[] }[] = []
  const used = new Set<string>()
  for (let k = 0; k < pool.length * 3 && qs.length < Math.min(n, pool.length); k++) {
    const w = pool[Math.floor(rnd() * pool.length)]
    if (used.has(w.id)) continue
    used.add(w.id)
    const others = [...new Set(pool.filter((x) => x.ja !== w.ja).map((x) => x.ja))]
    const wrong: string[] = []
    while (wrong.length < 2 && wrong.length < others.length) {
      const o = others[Math.floor(rnd() * others.length)]
      if (!wrong.includes(o)) wrong.push(o)
    }
    const at = Math.floor(rnd() * (wrong.length + 1))
    qs.push({ w, choices: [...wrong.slice(0, at), w.ja, ...wrong.slice(at)] })
  }
  return qs
}


// 長文の「よく出る熟語」：空所に答えを入れた文の中で、答えの語をふくむ熟語を全長文から集める（多い順）
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
export function blankIdioms(passages: LongPassage[]): { w: Word; count: number }[] {
  const count = new Map<string, number>()
  for (const p of passages) {
    const found = new Set<string>()
    for (const b of p.blanks) {
      const ans = b.choices[b.answer].toLowerCase()
      for (const para of p.paragraphs) {
        const sent = para.split(/(?<=[.!?])\s+/).find((s) => s.includes(`( ${b.id} )`))
        if (!sent) continue
        const filled = sent.replace(`( ${b.id} )`, ans).toLowerCase()
        for (const w of PHRASES) {
          const en = w.en.toLowerCase()
          if (en.split(/\s+/).includes(ans.split(/\s+/)[0]) && new RegExp(`\\b${esc(en)}\\b`).test(filled)) found.add(w.id)
        }
      }
    }
    for (const id of found) count.set(id, (count.get(id) ?? 0) + 1)
  }
  return PHRASES.filter((w) => count.has(w.id))
    .map((w) => ({ w, count: count.get(w.id)! }))
    .sort((a, b) => b.count - a.count)
}
