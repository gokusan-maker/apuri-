// 1日の目標達成のお祝い。紙吹雪は控えめに12枚だけ。
const PIECES = Array.from({ length: 12 }, (_, i) => i)
const COLORS = ['#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899']

type Props = {
  goal: number
  onClose: () => void
}

export function Celebrate({ goal, onClose }: Props) {
  return (
    <div className="celebrate" role="dialog" aria-label="今日の目標達成" onClick={onClose}>
      {PIECES.map((i) => (
        <span
          key={i}
          className="confetti"
          aria-hidden="true"
          style={{
            left: `${(i * 83) % 100}%`,
            background: COLORS[i % COLORS.length],
            animationDelay: `${(i % 6) * 0.12}s`,
          }}
        />
      ))}
      <div className="celebrate-card">
        <p className="celebrate-emoji" aria-hidden="true">
          🎉
        </p>
        <p className="celebrate-title">今日の目標達成！</p>
        <p className="celebrate-text">{goal}問クリア。モンスターも大よろこび！</p>
        <button className="flip" onClick={onClose}>
          やったね
        </button>
      </div>
    </div>
  )
}
