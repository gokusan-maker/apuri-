// 苦手単語：単語ごとの間違えた回数
export type Mistakes = Record<string, number>

const STORAGE_KEY = 'eitan:mistakes'

export function addMistake(m: Mistakes, id: string): Mistakes {
  return { ...m, [id]: (m[id] ?? 0) + 1 }
}

// 苦手カードで「覚えた」：回数を1減らし、0になったら苦手から外す
export function easeMistake(m: Mistakes, id: string): Mistakes {
  const n = (m[id] ?? 0) - 1
  const next = { ...m }
  if (n > 0) next[id] = n
  else delete next[id]
  return next
}

// 苦手から消す（オーナーの要望：もう苦手じゃない単語を自分で外せる）
export function removeMistake(m: Mistakes, id: string): Mistakes {
  const next = { ...m }
  delete next[id]
  return next
}

// 間違えた回数が多い順（同数なら元の並び順）
export function weakWords<T extends { id: string }>(words: T[], m: Mistakes, limit = 20): T[] {
  return words
    .map((w, i) => ({ w, i, n: m[w.id] ?? 0 }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.w)
}

export function loadMistakes(): Mistakes {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number' && n > 0)) as Mistakes
  } catch {
    return {}
  }
}

export function saveMistakes(m: Mistakes): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(m))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
