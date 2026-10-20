import { useEffect, useMemo, useRef, useState } from 'react'
import { Backup } from './BackupView'
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
import { addMistake, loadMistakes, saveMistakes, weakWords } from './mistakes'
import { Quiz } from './QuizView'
import { speak } from './speech'
import { TimeAttack } from './TimeAttackView'
import { addToday, loadTodayCount, saveTodayCount } from './stats'
import { currentStreak, loadStreak, recordStudy, saveStreak } from './streak'
import { loadLevels, saveLevels, toggleLevel } from './settings'
import { LEVELS, wordsOf } from './words'

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

  const [mistakes, setMistakes] = useState(loadMistakes)
  useEffect(() => saveMistakes(mistakes), [mistakes])
  const [weakOnly, setWeakOnly] = useState(false)

  function onAnswer(correct: boolean, xp: number, wordId: string) {
    studied()
    if (!correct) setMistakes((m) => addMistake(m, wordId))
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

  const [levels, setLevels] = useState(loadLevels)
  useEffect(() => saveLevels(levels), [levels])
  const words = useMemo(() => wordsOf(levels), [levels])
  const levelKey = levels.join(',')

  const weak = useMemo(() => weakWords(words, mistakes), [words, mistakes])

  const queue = useMemo(() => buildQueue(words, progress, today, newToday), [words, progress, today, newToday])
  const learned = words.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length
  const card = queue[0]

  function answer(correct: boolean) {
    if (!progress[card.id]) setDaily({ day: today, count: newToday + 1 })
    setProgress({ ...progress, [card.id]: grade(progress[card.id], correct, today) })
    studied()
    if (!correct) setMistakes((m) => addMistake(m, card.id))
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
          今日の残り {queue.length} 語 ・ 定着 {learned} / {words.length} 語
        </p>
        {mode !== 'stats' && (
          <div className="levels" role="group" aria-label="単語帳">
            {LEVELS.map((l) => (
              <button key={l} aria-pressed={levels.includes(l)} onClick={() => setLevels(toggleLevel(levels, l))}>
                {l}
              </button>
            ))}
          </div>
        )}
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
                {learned} / {words.length}
              </dd>
            </div>
          </dl>
          <p className="stats-note">定着語数＝カードで3回以上続けて「覚えた」になった単語</p>
          <div className="xp-bar" role="progressbar" aria-label="定着の割合" aria-valuemin={0} aria-valuemax={words.length} aria-valuenow={learned}>
            <div className="xp-fill" style={{ width: `${(learned / words.length) * 100}%` }} />
          </div>
          <h2>苦手な単語</h2>
          {weak.length === 0 ? (
            <p className="stats-note">まだありません。まちがえた単語がここに集まります。</p>
          ) : (
            <>
              <ol className="weak-list">
                {weak.slice(0, 10).map((w) => (
                  <li key={w.id}>
                    <span className="weak-en">{w.en}</span>
                    <span className="weak-ja">{w.ja}</span>
                    <span className="weak-count">×{mistakes[w.id]}</span>
                  </li>
                ))}
              </ol>
              <button
                className="flip"
                onClick={() => {
                  setWeakOnly(true)
                  setMode('quiz')
                }}
              >
                苦手だけ復習する
              </button>
            </>
          )}
          <Backup />
        </section>
      ) : mode === 'quiz' ? (
        <>
          {weakOnly && weak.length > 0 && (
            <p className="weak-banner">
              苦手だけ復習中（{weak.length}語）
              <button onClick={() => setWeakOnly(false)}>やめる</button>
            </p>
          )}
          <Quiz
            key={`${levelKey}${weakOnly ? ':weak' : ''}`}
            words={words}
            targets={weakOnly && weak.length > 0 ? weak : undefined}
            onAnswer={onAnswer}
          />
        </>
      ) : mode === 'time' ? (
        <TimeAttack key={levelKey} words={words} onAnswer={onAnswer} />
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
