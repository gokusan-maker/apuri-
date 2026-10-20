// 例文の単語から単語帳の単語を探す（変化形もざっくり）
import type { Word } from './words'

export function makeLookup(words: Word[]): (token: string) => Word | undefined {
  const map = new Map<string, Word>()
  for (const w of words) if (!/\s/.test(w.en)) map.set(w.en.toLowerCase(), w)
  return (token: string) => {
    const t = token.toLowerCase().replace(/[^a-z']/g, '').replace(/'s$/, '')
    if (!t) return undefined
    const tries = [t]
    if (t.endsWith('ies')) tries.push(t.slice(0, -3) + 'y')
    if (t.endsWith('ied')) tries.push(t.slice(0, -3) + 'y')
    if (t.endsWith('es')) tries.push(t.slice(0, -2))
    if (t.endsWith('s')) tries.push(t.slice(0, -1))
    if (t.endsWith('ed')) tries.push(t.slice(0, -2), t.slice(0, -1))
    if (t.endsWith('ing')) tries.push(t.slice(0, -3), t.slice(0, -3) + 'e')
    for (const x of tries) {
      const w = map.get(x)
      if (w) return w
    }
    return undefined
  }
}
