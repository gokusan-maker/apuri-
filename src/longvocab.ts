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
