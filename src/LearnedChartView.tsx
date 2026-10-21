// 定着した単語の数のうつりかわり（折れ線）
export function LearnedChart({ values }: { values: number[] }) {
  if (values.every((v) => v === 0)) return null
  const max = Math.max(...values, 1)
  const w = 300
  const h = 60
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - (v / max) * (h - 4) - 2}`).join(' ')
  return (
    <div className="learned-chart">
      <p className="stats-note">
        📈 定着した単語の数（最近{values.length}日）：{values[values.length - 1]}語
      </p>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} role="img" aria-label={`定着した単語の数のグラフ（今日 ${values[values.length - 1]}語）`}>
        <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="2" />
      </svg>
    </div>
  )
}
