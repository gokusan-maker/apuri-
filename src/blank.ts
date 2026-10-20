// 例文の穴埋め：例文の中から見出し語（または変化形）を探して空欄にする。
export type Blanked = { before: string; answer: string; after: string }

function stem(en: string): string {
  // decide→decid(ed), try→tr(ied), stop→stop(ped) などをざっくり拾う
  if (en.length > 3 && /[ey]$/.test(en)) return en.slice(0, -1)
  return en
}

export function blankOut(example: string, en: string): Blanked | null {
  const target = en.toLowerCase()
  const s = stem(target)
  const re = /[A-Za-z]+/g
  let m: RegExpExecArray | null
  let found: RegExpExecArray | null = null
  while ((m = re.exec(example))) {
    const t = m[0].toLowerCase()
    if (t === target) {
      found = m
      break
    }
    if (!found && t.startsWith(s) && t.length - s.length <= 4) found = m
  }
  if (!found) return null
  return {
    before: example.slice(0, found.index),
    answer: found[0],
    after: example.slice(found.index + found[0].length),
  }
}

export function canBlank(w: { en: string; example: string }): boolean {
  return blankOut(w.example, w.en) !== null
}
