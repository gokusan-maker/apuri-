import { useEffect, useMemo, useRef, useState } from 'react'
import { Monster } from './Monster'
import {
  isLonely,
  levelInfo,
  loadMonster,
  saveMonster,
  stageOf,
  XP_CARD_AGAIN,
  XP_CARD_GOOD,
  XP_QUIZ_CORRECT,
} from './monster'
import {
  buildQueue,
  dayKey,
  grade,
  loadDailyNew,
  loadProgress,
  saveDailyNew,
  saveProgress,
  type ProgressMap,
} from './srs'
import { Quiz } from './Quiz'
import { WORDS } from './words'

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

function App() {
  const [progress, setProgress] = useState<ProgressMap>(loadProgress)
  const [flipped, setFlipped] = useState(false)
  const [mode, setMode] = useState<'card' | 'quiz'>('card')
  const today = dayKey()
  const [daily, setDaily] = useState(() => loadDailyNew(today))
  const newToday = daily.day === today ? daily.count : 0

  useEffect(() => saveProgress(progress), [progress])
  useEffect(() => saveDailyNew(daily), [daily])

  const [monster, setMonster] = useState(loadMonster)
  const [happy, setHappy] = useState(false)
  const [leveledUp, setLeveledUp] = useState(false)
  const [evolved, setEvolved] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => saveMonster(monster), [monster])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  function gainXp(amount: number) {
    const before = levelInfo(monster.xp).level
    const xp = monster.xp + amount
    const after = levelInfo(xp).level
    setMonster({ xp, lastDay: today })
    setHappy(true)
    setLeveledUp(after > before)
    setEvolved(stageOf(after).index > stageOf(before).index)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setHappy(false)
      setLeveledUp(false)
      setEvolved(false)
    }, 2000)
  }

  const queue = useMemo(() => buildQueue(WORDS, progress, today, newToday), [progress, today, newToday])
  const learned = WORDS.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length
  const card = queue[0]

  function answer(correct: boolean) {
    if (!progress[card.id]) setDaily({ day: today, count: newToday + 1 })
    setProgress({ ...progress, [card.id]: grade(progress[card.id], correct, today) })
    gainXp(correct ? XP_CARD_GOOD : XP_CARD_AGAIN)
    setFlipped(false)
  }

  return (
    <main className="app">
      <header>
        <h1>えいたん</h1>
        <Monster
          xp={monster.xp}
          mood={happy ? 'happy' : isLonely(monster, today) ? 'lonely' : 'normal'}
          leveledUp={leveledUp}
          evolved={evolved}
        />
        <p className="stats">
          今日の残り {queue.length} 語 ・ 定着 {learned} / {WORDS.length} 語
        </p>
        <nav className="modes">
          <button aria-pressed={mode === 'card'} onClick={() => setMode('card')}>
            カード
          </button>
          <button aria-pressed={mode === 'quiz'} onClick={() => setMode('quiz')}>
            クイズ
          </button>
        </nav>
      </header>

      {mode === 'quiz' ? (
        <Quiz words={WORDS} onCorrect={() => gainXp(XP_QUIZ_CORRECT)} />
      ) : card ? (
        <section className="card" aria-live="polite">
          <p className="en">{card.en}</p>
          <button className="speak" onClick={() => speak(card.en)} aria-label="発音を聞く">
            🔊
          </button>
          {flipped ? (
            <>
              <p className="ja">{card.ja}</p>
              <p className="example">{card.example}</p>
              <p className="example-ja">{card.exampleJa}</p>
              <div className="actions">
                <button className="again" onClick={() => answer(false)}>
                  まだ
                </button>
                <button className="good" onClick={() => answer(true)}>
                  覚えた
                </button>
              </div>
            </>
          ) : (
            <button className="flip" onClick={() => setFlipped(true)}>
              意味を見る
            </button>
          )}
        </section>
      ) : (
        <p className="done">今日の学習は完了です 🎉 また明日！</p>
      )}
    </main>
  )
}

export default App
