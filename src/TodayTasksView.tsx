import { dailyGrammar, loadDailyGrammarDay } from './grammar'
import { dailyWordGame, loadWordGameDay } from './wordgame'
import { dailyLong, loadDailyLongDay, LONG_PASSAGES, shownTitle } from './longreading'

type Props = {
  today: string
  cardsLeft: number // 今日のカードののこり
  onGo: (where: 'word' | 'grammar' | 'reading') => void
}

// ホームの「今日の課題」：単語（日がわりの単語ゲーム）・文法・長文を1つずつ
export function TodayTasks({ today, cardsLeft, onGo }: Props) {
  const g = dailyGrammar(today)
  const l = dailyLong(today)
  const w = dailyWordGame(today)
  const items = [
    { id: 'word' as const, icon: '🔤', label: '単語', task: `今日の単語ゲーム「${w.label}」`, done: loadWordGameDay() === today || (w.id === 'card' && cardsLeft === 0) },
    { id: 'grammar' as const, icon: '📐', label: '文法', task: `今日の文法「${g.title}」`, done: loadDailyGrammarDay() === today },
    { id: 'reading' as const, icon: '🐉', label: '長文', task: `今日の1本「${shownTitle(l, LONG_PASSAGES.indexOf(l))}」`, done: loadDailyLongDay() === today },
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
