import type { Word } from './words'

// 日付から決まる「今日のことば」
export function pickWordOfDay(words: Word[], today: string): Word | undefined {
  const withExample = words.filter((w) => w.example)
  if (withExample.length === 0) return undefined
  let h = 0
  for (const c of today) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return withExample[h % withExample.length]
}
