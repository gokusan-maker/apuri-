// マイ単語帳：自分で追加した単語。端末に保存する。
import type { Word } from './words'

const STORAGE_KEY = 'eitan:my-words'
const USE_KEY = 'eitan:use-my'

export type NewWord = { en: string; ja: string; example?: string; exampleJa?: string }

export function validate(w: NewWord, list: Word[]): string | null {
  const en = w.en.trim()
  if (!en) return '英語を入力してください'
  if (!/^[A-Za-z][A-Za-z '\-.]*$/.test(en)) return '英語はアルファベットで入力してください'
  if (!w.ja.trim()) return '意味を入力してください'
  if (list.some((x) => x.en.toLowerCase() === en.toLowerCase())) return 'その単語はもう入っています'
  return null
}

export function addMyWord(list: Word[], w: NewWord, now = Date.now()): Word[] {
  const word: Word = {
    id: `my:${now}`,
    en: w.en.trim(),
    ja: w.ja.trim(),
    example: (w.example ?? '').trim(),
    exampleJa: (w.exampleJa ?? '').trim(),
  }
  return [...list, word]
}

export function removeMyWord(list: Word[], id: string): Word[] {
  return list.filter((w) => w.id !== id)
}

const isWord = (v: unknown): v is Word => {
  const w = v as Word
  return !!w && typeof w.id === 'string' && w.id.startsWith('my:') && typeof w.en === 'string' && typeof w.ja === 'string'
}

export function loadMyWords(): Word[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (!Array.isArray(v)) return []
    return v.filter(isWord).map((w) => ({ ...w, example: w.example ?? '', exampleJa: w.exampleJa ?? '' }))
  } catch {
    return []
  }
}

export function saveMyWords(list: Word[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export function loadUseMy(): boolean {
  try {
    return localStorage.getItem(USE_KEY) === 'true'
  } catch {
    return false
  }
}

export function saveUseMy(v: boolean): void {
  try {
    localStorage.setItem(USE_KEY, String(v))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
