// 長文に出てくる文法：本文から目印の形をさがして、文法の単元名を返す（だいたいの目安）
import { GRAMMAR } from './grammar'
import type { LongPassage } from './longreading'

const RULES: { id: string; re: RegExp }[] = [
  { id: 'relative', re: /\b[a-z]+ (who|which) [a-z]+/ },
  { id: 'passive', re: /\b(is|are|was|were|be|been) (\w+ed|made|written|built|called|held|found|known|seen|sold|thrown)\b/ },
  { id: 'perfect', re: /\b(have|has) (\w+ed|been|made|seen|read|done|gone|eaten|written)\b/ },
  { id: 'compare', re: /\b(\w+er|more \w+) than\b/ },
  { id: 'there', re: /\b[Tt]here (is|are|was|were)\b/ },
  { id: 'past-progressive', re: /\b(was|were) \w+ing\b/ },
  { id: 'if-present', re: /\bIf\b|\bif\b/ },
  { id: 'gerund', re: /\b(enjoy|enjoyed|stop|stopped|finish|finished|like|love|loves) \w+ing\b/ },
  { id: 'it-for-to', re: /\bIt is \w+ (for \w+ )?to\b/ },
]

export function grammarTags(p: LongPassage): { id: string; title: string }[] {
  const text = p.paragraphs.join(' ')
  return RULES.filter((r) => r.re.test(text))
    .map((r) => GRAMMAR.find((u) => u.id === r.id))
    .filter((u): u is (typeof GRAMMAR)[number] => !!u)
    .map((u) => ({ id: u.id, title: u.title }))
}
