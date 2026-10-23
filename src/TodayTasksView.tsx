import { dailyGrammar, loadDailyGrammarDay } from './grammar'
import { useState } from 'react'
import { trioStreakNow, claimTrioStreak, dailyShort, loadDailyShortDay, loadTodayWordsDay, loadTrioDay, loadTrioStreak, saveTrioDay, todayWords, TRIO_TICKET_DAYS, TRIO_XP } from './dailyread'

type Props = {
  today: string
  onGo: (where: 'word' | 'grammar' | 'reading') => void
  onTrio?: (xp: number, ticket: boolean, week?: boolean) => void // 3つ全部クリアのトリオボーナスを受け取った（ticket：3日連続の🎟）
}

// ホームの「今日の課題」：今日の単語（4択）・今日の文法・今日の読解（今日の単語が出てくるかんたんな短い英文）
export function TodayTasks({ today, onGo, onTrio }: Props) {
  const [trio, setTrio] = useState(() => loadTrioDay() === today)
  const [party, setParty] = useState(false) // 受け取った瞬間だけ紙ふぶき
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
        {trioStreakNow(today) > 0 && <span className="trio-streak" aria-label="トリオボーナスの連続日数"> 🔥{trioStreakNow(today)}日</span>}
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
      {n === 3 &&
        (trio ? (
          <p className="today-trio done">
            🎁 トリオボーナス受け取りずみ（3体に +{TRIO_XP}XP）・{loadTrioStreak().count}日連続
            {loadTrioStreak().count % TRIO_TICKET_DAYS === 0 ? ' 🎟ゲット！' : `（あと${TRIO_TICKET_DAYS - (loadTrioStreak().count % TRIO_TICKET_DAYS)}日で🎟）`}
          </p>
        ) : (
          <button
            className="today-trio"
            onClick={() => {
              saveTrioDay(today)
              setTrio(true)
              setParty(true)
              const st = claimTrioStreak(today)
              onTrio?.(TRIO_XP, st.ticket, st.week)
            }}
          >
            🎁 3つクリア！ トリオボーナスを受け取る（3体に +{TRIO_XP}XP）
          </button>
        ))}
      {party && (
        <span className="trio-party" aria-label="トリオ達成のお祝い">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="confetti"
              aria-hidden="true"
              style={{ left: `${(i * 83) % 100}%`, background: ['#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'][i % 6], animationDelay: `${(i % 6) * 0.12}s` }}
            />
          ))}
        </span>
      )}
    </section>
  )
}
