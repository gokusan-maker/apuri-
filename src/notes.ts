// 単語メモ：単語ごとの自分用メモ（200文字まで）
export type Notes = Record<string, string>
export const NOTE_MAX = 200
const STORAGE_KEY = 'eitan:notes'

export function setNote(n: Notes, id: string, text: string): Notes {
  const t = text.trim().slice(0, NOTE_MAX)
  const next = { ...n }
  if (t) next[id] = t
  else delete next[id]
  return next
}

export function loadNotes(): Notes {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, t]) => typeof t === 'string')) as Notes
  } catch {
    return {}
  }
}

export function saveNotes(n: Notes): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
