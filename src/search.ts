// 単語の検索：英語は前方一致を優先、日本語は部分一致
export function searchWords<T extends { en: string; ja: string }>(words: T[], query: string): T[] {
  const q = query.trim().toLowerCase()
  if (!q) return words
  const starts = words.filter((w) => w.en.toLowerCase().startsWith(q))
  const rest = words.filter(
    (w) => !w.en.toLowerCase().startsWith(q) && (w.en.toLowerCase().includes(q) || w.ja.includes(query.trim())),
  )
  return [...starts, ...rest]
}
