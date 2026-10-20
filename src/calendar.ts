// 学習カレンダー：今月の日付を週ごとに並べる（日曜はじまり）
export type CalDay = { day: string; date: number } | null

export function monthGrid(today: string): CalDay[][] {
  const [y, m] = today.split('-').map(Number)
  const first = new Date(y, m - 1, 1).getDay()
  const days = new Date(y, m, 0).getDate()
  const cells: CalDay[] = Array.from({ length: first }, () => null)
  for (let d = 1; d <= days; d++) {
    cells.push({ day: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`, date: d })
  }
  while (cells.length % 7) cells.push(null)
  const weeks: CalDay[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}
