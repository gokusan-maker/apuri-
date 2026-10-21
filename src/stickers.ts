// ガチャのおまけシール帳：ガチャ1回ごとにシール1まい。12種ぜんぶ集めると🎟2（1回だけ）
export const STICKERS = ['🍎', '🚀', '🌈', '🎸', '🐳', '🍩', '⚽', '🦄', '🌻', '🎩', '🍉', '⭐'] as const
export const STICKER_TICKETS = 2
export type StickerBook = { got: string[]; rewarded: boolean }
const KEY = 'eitan:stickers'

export function loadStickers(): StickerBook {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<StickerBook> | null
    const got = Array.isArray(v?.got) ? v.got.filter((x): x is string => typeof x === 'string' && (STICKERS as readonly string[]).includes(x)) : []
    return { got: [...new Set(got)], rewarded: v?.rewarded === true }
  } catch {
    return { got: [], rewarded: false }
  }
}
export function saveStickers(b: StickerBook): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(b))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const stickerOf = (r: number) => STICKERS[Math.min(STICKERS.length - 1, Math.floor(r * STICKERS.length))]

// シールを1まい足す。はじめて全部そろったら complete が true
export function addSticker(b: StickerBook, s: string): { book: StickerBook; complete: boolean } {
  const got = b.got.includes(s) ? b.got : [...b.got, s]
  const complete = !b.rewarded && got.length >= STICKERS.length
  return { book: { got, rewarded: b.rewarded || complete }, complete }
}
