import { useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { makeSeqQ } from './sequence'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = { count?: number; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

export function Sequence({ count = 10, onAnswer }: Props) {
  const [qs, setQs] = useState(() => Array.from({ length: count }, () => makeSeqQ()))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const q = qs[index]

  if (!q) {
    return (
      <section className="card result">
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
        <button
          className="flip"
          onClick={() => {
            setQs(Array.from({ length: count }, () => makeSeqQ()))
            setIndex(0)
            setScore(0)
            setPicked(null)
          }}
        >
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz sequence">
      <p className="progress">
        {index + 1} / {qs.length}（{q.seq}）
      </p>
      <p className="en">{q.word}</p>
      <p className="verb-ask">
        の<strong>{q.dir === 'next' ? '次' : '前'}</strong>は？
      </p>
      <div className="choices">
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button
              key={c}
              className={cls}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i)
                const ok = i === q.answer
                if (ok) {
                  setScore(score + 1)
                  playCorrect()
                } else playWrong()
                onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `seq:${q.choices[q.answer].toLowerCase()}`, 'quiz')
                speak(q.choices[q.answer])
              }}
            >
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <button
          className="flip"
          onClick={() => {
            setPicked(null)
            setIndex(index + 1)
          }}
        >
          次へ
        </button>
      )}
    </section>
  )
}
