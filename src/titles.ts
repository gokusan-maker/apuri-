// 称号：学習した日数（累計）で変わる
export const TITLES: { days: number; name: string }[] = [
  { days: 0, name: '見習い' },
  { days: 3, name: 'かけだし' },
  { days: 7, name: 'がんばり屋' },
  { days: 14, name: '単語ハンター' },
  { days: 30, name: '単語マスター' },
  { days: 60, name: '単語名人' },
  { days: 100, name: '伝説の学習者' },
  { days: 200, name: '英語の達人' },
  { days: 365, name: '一年の王者' },
]

export function titleFor(days: number): string {
  let t = TITLES[0].name
  for (const x of TITLES) if (days >= x.days) t = x.name
  return t
}

export function nextTitle(days: number): { days: number; name: string } | undefined {
  return TITLES.find((x) => x.days > days)
}
