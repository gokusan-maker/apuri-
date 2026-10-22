// なぞなぞ図鑑：正解したなぞなぞ（問題文）を覚えておく
import { RIDDLES } from './puzzles'

const KEY = 'eitan:riddle-book'

export function loadRiddleBook(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function addRiddle(book: string[], q: string): string[] {
  if (book.includes(q) || !RIDDLES.some((r) => r.q === q)) return book
  const next = [...book, q]
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // 保存できなくても続ける
  }
  return next
}
