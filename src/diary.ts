// ひとこと英語日記：1日1文（日付 → 文）
export type Diary = Record<string, string>
const KEY = 'eitan:diary'
export const DIARY_MAX = 200

export const DIARY_HINTS = ['Today I ...', 'I want to ...', 'I like ... because ...', 'Tomorrow I will ...', 'I was happy when ...', 'My favorite ... is ...']

export function loadDiary(): Diary {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([k, t]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && typeof t === 'string')) as Diary
  } catch {
    return {}
  }
}

export function saveDiary(d: Diary): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(d))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export function writeDiary(d: Diary, day: string, text: string): Diary {
  const t = text.trim().slice(0, DIARY_MAX)
  const next = { ...d }
  if (t) next[day] = t
  else delete next[day]
  return next
}

// 新しい順に n 日分
export function recentDiary(d: Diary, n = 7): [string, string][] {
  return Object.entries(d)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, n)
}
