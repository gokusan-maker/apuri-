// お気に入り（★）の単語id
const STORAGE_KEY = 'eitan:favorites'

export function toggleFavorite(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

// まとめて★に入れる（すでに入っているものはそのまま）
export function addFavorites(list: string[], ids: string[]): string[] {
  return [...list, ...ids.filter((id, i) => !list.includes(id) && ids.indexOf(id) === i)]
}

export function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function saveFavorites(list: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
