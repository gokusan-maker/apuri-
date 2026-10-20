import type { DayBar } from './history'

// 直近7日の学習数の棒グラフ（CSSだけで描く）
export function WeekChart({ days, goal }: { days: DayBar[]; goal: number }) {
  const max = Math.max(goal, ...days.map((d) => d.count), 1)
  const total = days.reduce((a, d) => a + d.count, 0)
  return (
    <div className="week">
      <h2>この1週間</h2>
      <p className="stats-note">合計 {total} 問・目標達成 {days.filter((d) => d.count >= goal).length} 日</p>
      <div className="week-chart" role="img" aria-label={days.map((d) => `${d.label}曜 ${d.count}問`).join('、')}>
        <div className="week-goal" style={{ bottom: `calc(20px + (100% - 38px) * ${goal / max})` }} aria-hidden="true" />
        {days.map((d, i) => (
          <div key={d.day} className="week-col">
            <div
              className={`week-bar${d.count >= goal ? ' met' : ''}${i === days.length - 1 ? ' today' : ''}`}
              style={{ height: `${(d.count / max) * 100}%` }}
            >
              {d.count > 0 && <span className="week-num">{d.count}</span>}
            </div>
            <span className="week-label">{i === days.length - 1 ? '今日' : d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
