// 長文の本文の文字の大きさ（小・中・大）。端末ごとの見た目の好み
export type LongFont = 's' | 'm' | 'l'
const KEY = 'eitan:long-font'
export const LONG_FONTS: { id: LongFont; label: string }[] = [
  { id: 's', label: '小' },
  { id: 'm', label: '中' },
  { id: 'l', label: '大' },
]

export function loadLongFont(): LongFont {
  try {
    const v = localStorage.getItem(KEY)
    return v === 's' || v === 'l' ? v : 'm'
  } catch {
    return 'm'
  }
}

export function saveLongFont(f: LongFont): void {
  try {
    localStorage.setItem(KEY, f)
  } catch {
    // 保存できなくても続ける
  }
}
