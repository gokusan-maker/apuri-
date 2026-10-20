// 単語帳の定着率（0〜100）でメダル
export function medalFor(pct: number): string {
  if (pct >= 100) return '🥇'
  if (pct >= 80) return '🥈'
  if (pct >= 50) return '🥉'
  return ''
}
