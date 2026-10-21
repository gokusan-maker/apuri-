// 相棒の月ごとの記念日：出会った日（born）と同じ日付ごとにお祝い（出会って○日の節目は anniversary.ts）。月末に出会った子は、短い月は月末の日にお祝いする
export const MONTHLY_COINS = 20 // 毎月の記念日のプレゼント

// 記念日なら「出会って何か月か」、ちがえば 0
export function annivMonths(born: string | undefined, today: string): number {
  if (!born || born >= today) return 0
  const [by, bm, bd] = born.split('-').map(Number)
  const [ty, tm, td] = today.split('-').map(Number)
  const last = new Date(ty, tm, 0).getDate() // 今月の最終日
  if (td !== Math.min(bd, last)) return 0
  return (ty - by) * 12 + (tm - bm)
}

export function annivText(name: string, months: number): string {
  return months % 12 === 0 ? `🎂 ${name}と出会って${months / 12}年の記念日！ いつもありがとう` : `🎉 ${name}と出会って${months}か月の記念日！`
}
