import { useEffect, useState, type FormEvent } from 'react'
import { loadHabits, saveHabits, todayKey, toggleDone, type Habit } from './habits'

function App() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits)
  const [name, setName] = useState('')
  const today = todayKey()

  useEffect(() => saveHabits(habits), [habits])

  function addHabit(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setHabits([...habits, { id: crypto.randomUUID(), name: trimmed, doneDates: [] }])
    setName('')
  }

  const doneCount = habits.filter((h) => h.doneDates.includes(today)).length

  return (
    <main className="app">
      <header>
        <h1>まいにち習慣</h1>
        <p className="progress">
          今日の達成：{doneCount} / {habits.length}
        </p>
      </header>

      <form onSubmit={addHabit} className="add-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="新しい習慣（例：水を飲む）"
          aria-label="新しい習慣"
        />
        <button type="submit">追加</button>
      </form>

      {habits.length === 0 ? (
        <p className="empty">まだ習慣がありません。上から追加しましょう。</p>
      ) : (
        <ul className="habit-list">
          {habits.map((h) => {
            const done = h.doneDates.includes(today)
            return (
              <li key={h.id}>
                <button
                  className={done ? 'habit done' : 'habit'}
                  aria-pressed={done}
                  onClick={() => setHabits(habits.map((x) => (x.id === h.id ? toggleDone(x, today) : x)))}
                >
                  <span className="check">{done ? '✓' : ''}</span>
                  {h.name}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}

export default App
