import { monthGrid } from './calendar'
import type { History } from './history'

const WEEK = ['日', '月', '火', '水', '木', '金', '土']

export function Calendar({ history, today, goal }: { history: History; today: string; goal: number }) {
  const weeks = monthGrid(today)
  const [y, m] = today.split('-').map(Number)
  const studied = Object.entries(history).filter(([d, n]) => d.startsWith(today.slice(0, 7)) && n > 0).length
  if (studied === 0) return null // 今月まだ0日のときはカレンダーごと出さない（0の欄はかくす）
  return (
    <div className="calendar">
      <h2>
        {y}年{m}月の学習
      </h2>
      <p className="stats-note">今月 {studied}日 学習しました</p>
      <table>
        <thead>
          <tr>
            {WEEK.map((w) => (
              <th key={w}>{w}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((wk, i) => (
            <tr key={i}>
              {wk.map((c, j) => {
                if (!c) return <td key={j} />
                const n = history[c.day] ?? 0
                const cls = [n >= goal ? 'met' : n > 0 ? 'studied' : '', c.day === today ? 'today' : ''].join(' ').trim()
                return (
                  <td key={j} className={cls} aria-label={`${c.date}日 ${n}問`}>
                    <span>{n >= goal ? '🎯' : c.date}</span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
