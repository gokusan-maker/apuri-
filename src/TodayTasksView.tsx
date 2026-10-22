import { dailyGrammar, loadDailyGrammarDay } from './grammar'
import { dailyShort, loadDailyShortDay, loadTodayWordsDay, todayWords } from './dailyread'

type Props = {
  today: string
  onGo: (where: 'word' | 'grammar' | 'reading') => void
}

// ホームの「今日の課題」：今日の単語（4択）・今日の文法・今日の読解（今日の単語が出てくるかんたんな短い英文）
export function TodayTasks({ today, onGo }: Props) {
  const g = dailyGrammar(today)
  const r = dailyShort(today)
  const ws = todayWords(today)
  const items = [
    { id: 'word' as const, icon: '🔤', label: '単語', task: `今日の単語 4択（${ws.map((w) => w.en).join('・')}）`, done: loadTodayWordsDay() === today },
    { id: 'grammar' as const, icon: '📐', label: '文法', task: `今日の文法「${g.title}」`, done: loadDailyGrammarDay() === today },
    { id: 'reading' as const, icon: '📖', label: '読解', task: `今日の読解「${r.title}」（今日の単語入り）`, done: loadDailyShortDay() === today },
  ]
  const n = items.filter((x) => x.done).length
  return (
    <section className="today-tasks" aria-label="今日の課題">
      <p className="today-tasks-title">
        📋 今日の課題 <span>{n} / 3 クリア{n === 3 ? ' 🎉' : ''}</span>
      </p>
      {items.map((x) => (
        <button key={x.id} className={`today-task${x.done ? ' done' : ''}`} onClick={() => onGo(x.id)}>
          <span className="today-task-tag">
            {x.icon} {x.label}
          </span>
          <span className="today-task-text">{x.task}</span>
          <span className="today-task-mark">{x.done ? '✅' : '▶'}</span>
        </button>
      ))}
    </section>
  )
}
