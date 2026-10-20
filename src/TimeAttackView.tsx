import { useEffect, useRef, useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { randomQuestion, type Question } from './quiz'
import { playCorrect, playWrong } from './sound'
import { loadBest, saveBest, TIME_LIMIT } from './timeAttack'
import type { Word } from './words'

type Props = {
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onFinish?: (score: number) => void
}

type Phase = 'ready' | 'play' | 'done'

export function TimeAttack({ words, onAnswer, onFinish }: Props) {
  const [phase, setPhase] = useState<Phase>('ready')
  const [left, setLeft] = useState(TIME_LIMIT)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(loadBest)
  const [newBest, setNewBest] = useState(false)
  const [q, setQ] = useState<Question<Word> | null>(null)
  const [flash, setFlash] = useState<'ok' | 'ng' | null>(null)
  const scoreRef = useRef(0)

  function nextQuestion() {
    setQ(randomQuestion(words, (x) => x.ja))
  }

  function start() {
    scoreRef.current = 0
    setScore(0)
    setLeft(TIME_LIMIT)
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
      saveBest(final)
      setNewBest(true)
    }
    setPhase('done')
    onFinish?.(final)
  }, [left, phase, best, onFinish])

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
      onAnswer?.(false, 0, q.word.id, 'quiz')
    }
    nextQuestion()
  }

  if (phase === 'ready') {
    return (
      <section className="card result">
        <p className="result-title">タイムアタック</p>
        <p className="result-message">{TIME_LIMIT}秒で何問正解できるかな？</p>
        <p className="best">自己ベスト {best} 問</p>
        <button className="flip" onClick={start}>
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
        <div className="timer-fill" style={{ width: `${(left / TIME_LIMIT) * 100}%` }} />
      </div>
      {q && (
        <>
          <p className="en">{q.word.en}</p>
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
