import { useEffect, useMemo, useRef, useState } from 'react'
import { Monster } from './MonsterView'
import {
  isLonely,
  levelInfo,
  loadMonster,
  saveMonster,
  stageOf,
  XP_CARD_AGAIN,
  XP_CARD_GOOD,
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
import { Quiz } from './QuizView'
import { speak } from './speech'
import { TimeAttack } from './TimeAttackView'
import { addToday, loadTodayCount, saveTodayCount } from './stats'
import { currentStreak, loadStreak, recordStudy, saveStreak } from './streak'
import { WORDS } from './words'

type Tab = 'card' | 'quiz' | 'time' | 'stats'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'card', icon: '🃏', label: 'カード' },
  { id: 'quiz', icon: '❓', label: 'クイズ' },
  { id: 'time', icon: '⏱', label: 'タイム' },
  { id: 'stats', icon: '📊', label: '記録' },
]

function App() {
  const [progress, setProgress] = useState<ProgressMap>(loadProgress)
  const [flipped, setFlipped] = useState(false)
  const [mode, setMode] = useState<Tab>('card')
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

  const [streak, setStreak] = useState(loadStreak)
  useEffect(() => saveStreak(streak), [streak])
  const streakDays = currentStreak(streak, today)

  const [todayCount, setTodayCount] = useState(() => loadTodayCount(today))
  useEffect(() => saveTodayCount(todayCount), [todayCount])
  const studiedToday = todayCount.day === today ? todayCount.count : 0

  // 1問答えるごとに呼ぶ（正解・不正解どちらでも）
  function studied() {
    setStreak(recordStudy(streak, today))
    setTodayCount(addToday(todayCount, today))
  }

  function onAnswer(correct: boolean, xp: number) {
    studied()
    if (correct && xp > 0) gainXp(xp)
  }

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
    studied()
    gainXp(correct ? XP_CARD_GOOD : XP_CARD_AGAIN)
    setFlipped(false)
  }

  return (
    <main className="app">
      <header>
        <div className="top">
          <h1>えいたん</h1>
          <p className={`streak${streakDays > 0 ? ' on' : ''}`} aria-label={`連続学習 ${streakDays} 日`}>
            🔥 {streakDays}日
          </p>
        </div>
        <Monster
          xp={monster.xp}
          mood={happy ? 'happy' : isLonely(monster, today) ? 'lonely' : 'normal'}
          leveledUp={leveledUp}
          evolved={evolved}
        />
        <p className="stats">
          今日の残り {queue.length} 語 ・ 定着 {learned} / {WORDS.length} 語
        </p>
      </header>

      {mode === 'stats' ? (
        <section className="card stats-view">
          <h2>記録</h2>
          <dl className="result-list">
            <div>
              <dt>連続学習</dt>
              <dd>{streakDays}日</dd>
            </div>
            <div>
              <dt>今日の学習</dt>
              <dd>{studiedToday}問</dd>
            </div>
            <div>
              <dt>定着語数</dt>
              <dd>
                {learned} / {WORDS.length}
              </dd>
            </div>
          </dl>
          <p className="stats-note">定着語数＝カードで3回以上続けて「覚えた」になった単語</p>
          <div className="xp-bar" role="progressbar" aria-label="定着の割合" aria-valuemin={0} aria-valuemax={WORDS.length} aria-valuenow={learned}>
            <div className="xp-fill" style={{ width: `${(learned / WORDS.length) * 100}%` }} />
          </div>
        </section>
      ) : mode === 'quiz' ? (
        <Quiz words={WORDS} onAnswer={onAnswer} />
      ) : mode === 'time' ? (
        <TimeAttack words={WORDS} onAnswer={onAnswer} />
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

      <nav className="tabbar" aria-label="画面の切り替え">
        {TABS.map((t) => (
          <button key={t.id} aria-current={mode === t.id ? 'page' : undefined} onClick={() => setMode(t.id)}>
            <span className="tab-icon" aria-hidden="true">
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </nav>
    </main>
  )
}

export default App
