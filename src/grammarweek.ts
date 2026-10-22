// 文法の「今週の成績」：日ごとの正解数（直近14日だけ残す）
const KEY = 'eitan:grammar-week'
export type GrammarWeek = Record<string, number> // 'YYYY-MM-DD' → 正解数

export function loadGrammarWeek(): GrammarWeek {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([k, n]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && typeof n === 'number'))
  } catch {
    return {}
  }
}

export function saveGrammarWeek(w: GrammarWeek): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(w))
  } catch {
    // 保存できなくても続ける
  }
}

// 今日の正解を1つ足す（14日より前は消す）
export function addGrammarCorrect(w: GrammarWeek, today: string): GrammarWeek {
  const keep = Object.keys(w).sort().slice(-13)
  const out: GrammarWeek = Object.fromEntries(keep.filter((k) => k !== today).map((k) => [k, w[k]]))
  out[today] = (w[today] ?? 0) + 1
  return out
}

const WD = ['日', '月', '火', '水', '木', '金', '土']
// 今日までの7日分（古い順）
export function last7(w: GrammarWeek, today: string): { day: string; label: string; count: number }[] {
  const t = new Date(`${today}T00:00:00`)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(t)
    d.setDate(t.getDate() - (6 - i))
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    return { day: key, label: WD[d.getDay()], count: w[key] ?? 0 }
  })
}
