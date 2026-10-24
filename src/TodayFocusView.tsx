// 今日の課題をひらいたときの上のバー：もどる・ほかの課題へ（課題だけを画面いっぱいに出す）
import { TODAY_TASK_INFO as TASKS, type TodayTask } from './todayfocus'

type Props = {
  current: TodayTask
  done: Record<TodayTask, boolean>
  onBack: () => void
  onGo: (t: TodayTask) => void
}

export function TodayFocusBar({ current, done, onBack, onGo }: Props) {
  return (
    <nav className="today-focus" aria-label="今日の課題の切りかえ">
      <div className="today-focus-top">
        <button className="today-focus-back" onClick={onBack}>
          ← もどる
        </button>
        <strong className="today-focus-title">📋 今日の課題</strong>
      </div>
      <div className="today-focus-tasks">
        {TASKS.map((t) => (
          <button
            key={t.id}
            className={`today-focus-task tf-${t.id}`}
            aria-current={t.id === current ? 'page' : undefined}
            aria-label={`今日の課題（${t.name}）${t.id === current ? '：いまの課題' : 'へ'}${done[t.id] ? '（クリアずみ）' : ''}`}
            disabled={t.id === current}
            onClick={() => onGo(t.id)}
          >
            <span aria-hidden="true">{t.icon}</span>
            {t.name}
            {done[t.id] && <span aria-hidden="true">✅</span>}
          </button>
        ))}
      </div>
    </nav>
  )
}
