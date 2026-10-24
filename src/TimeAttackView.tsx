import { loadSettings } from './settings'
import { MissedList } from './MissedListView'
import { useEffect, useRef, useState } from 'react'
import { usePlaying } from './playing'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { easyIf, randomQuestion, type Question } from './quiz'
import { playCorrect, playWrong } from './sound'
import { addTop, LENGTHS, loadBest, loadTop, saveBest, saveTop, TIME_LIMIT } from './timeAttack'
import { dayKey } from './srs'
import type { Word } from './words'

type Props = {
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onFinish?: (score: number) => void
}

type Phase = 'ready' | 'play' | 'done'

export function TimeAttack({ words, onAnswer, onFinish }: Props) {
  const [phase, setPhase] = useState<Phase>('ready')
  const [length, setLength] = useState(TIME_LIMIT)
  const [jaEn, setJaEn] = useState(false) // 日→英
  const [left, setLeft] = useState(TIME_LIMIT)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => loadBest(TIME_LIMIT))
  const [top, setTop] = useState(loadTop)
  const [newBest, setNewBest] = useState(false)
  usePlaying(phase !== 'ready', () => setPhase('ready')) // 遊んでいるあいだは問題だけの画面（上の「ほかの問題をえらぶ」で最初の画面へ）
  const [q, setQ] = useState<Question<Word> | null>(null)
  const [flash, setFlash] = useState<'ok' | 'ng' | null>(null)
  const scoreRef = useRef(0)
  const [missed, setMissed] = useState<Word[]>([])

  function nextQuestion() {
    setQ(easyIf(loadSettings().easy, randomQuestion(words, jaEn ? (x) => x.en : (x) => x.ja)))
  }

  function start() {
    scoreRef.current = 0
    setScore(0)
    setMissed([])
    setLeft(length)
    setNewBest(false)
    setFlash(null)
    nextQuestion()
    setPhase('play')
  }

  useEffect(() => {
    if (phase !== 'play') return
    const id = window.setInterval(() => setLeft((s) => s - 1), 1000)
    return () => window.clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase !== 'play' || left > 0) return
    const final = scoreRef.current
    if (final > best) {
      setBest(final)
      saveBest(final, length)
      setNewBest(true)
    }
    const nextTop = addTop(top, final, dayKey())
    setTop(nextTop)
    saveTop(nextTop)
    setPhase('done')
    onFinish?.(final)
  }, [left, phase, best, onFinish, top, length])

  function pick(i: number) {
    if (!q) return
    if (i === q.answer) {
      scoreRef.current += 1
      setScore(scoreRef.current)
      setFlash('ok')
      playCorrect()
      onAnswer?.(true, XP_QUIZ_CORRECT, q.word.id, 'quiz')
    } else {
      setFlash('ng')
      playWrong()
      setMissed((m) => (m.some((w) => w.id === q.word.id) ? m : [...m, q.word]))
      onAnswer?.(false, 0, q.word.id, 'quiz')
    }
    nextQuestion()
  }

  if (phase === 'ready') {
    return (
      <section className="card result ta-ready">
        <p className="ta-hero" aria-hidden="true">⏱️</p>
        <p className="result-title">タイムアタック</p>
        <div className="counts" role="group" aria-label="長さ">
          {LENGTHS.map((n) => (
            <button
              key={n}
              aria-pressed={length === n}
              onClick={() => {
                setLength(n)
                setBest(loadBest(n))
              }}
            >
              {n}秒
            </button>
          ))}
        </div>
        <div className="counts" role="group" aria-label="向き">
          <button aria-pressed={!jaEn} onClick={() => setJaEn(false)}>
            英→日
          </button>
          <button aria-pressed={jaEn} onClick={() => setJaEn(true)}>
            日→英
          </button>
        </div>
        <p className="result-message">{length}秒で何問正解できるかな？</p>
        {best > 0 && <p className="best ta-best">🏆 自己ベスト {best} 問</p>}
        {top.length > 0 && (
          <ol className="ta-top" aria-label="これまでの記録">
            {top.map((t, i) => (
              <li key={i}>
                {i + 1}位 {t.score}問 <span className="stats-note">{t.day}</span>
              </li>
            ))}
          </ol>
        )}
        <button className="flip ta-start" onClick={start}>
          スタート
        </button>
      </section>
    )
  }

  if (phase === 'done') {
    return (
      <section className="card result">
        <p className="result-title">タイムアップ！</p>
        <p className="result-score">{score} 問正解</p>
        {newBest ? <p className="level-up">自己ベスト更新！</p> : <p className="best">自己ベスト {best} 問</p>}
        <MissedList words={missed} />
        <button className="flip" onClick={start}>
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className={`card quiz${flash ? ` flash-${flash}` : ''}`} aria-live="polite">
      <div className="ta-head">
        <span className={`timer${left <= 10 ? ' hurry' : ''}`}>⏱ {left}秒</span>
        <span className="ta-score">{score} 問</span>
      </div>
      <div className="timer-bar">
        <div className="timer-fill" style={{ width: `${(left / length) * 100}%` }} />
      </div>
      {q && (
        <>
          <p className={jaEn ? 'en ja-prompt' : 'en'}>{jaEn ? q.word.ja : q.word.en}</p>
          <div className="choices">
            {q.choices.map((c, i) => (
              <button key={c} className="choice" onClick={() => pick(i)}>
                {c}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
