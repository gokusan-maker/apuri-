// 定期テストモード：テストの日までの日数と、1日に覚える語数の目安
export function daysUntil(today: string, target: string): number {
  const [y1, m1, d1] = today.split('-').map(Number)
  const [y2, m2, d2] = target.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
}

export function perDay(remaining: number, days: number): number {
  return Math.ceil(remaining / Math.max(days, 1))
}
