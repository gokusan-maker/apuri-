import { useState } from 'react'
import { makeVerbDrill, TENSE_LABEL } from './irregular'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = {
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

export function Irregular({ count = 10, onAnswer }: Props) {
  const [qs, setQs] = useState(() => makeVerbDrill(count))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const q = qs[index]

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    const ok = i === q.answer
    if (ok) {
      setScore(score + 1)
      playCorrect()
    } else {
      playWrong()
    }
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `verb:${q.verb.base}`, 'quiz')
    speak(`${q.verb.base}, ${q.verb.past}, ${q.verb.pp}`)
  }

  if (!q) {
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
        <button
          className="flip"
          onClick={() => {
            setQs(makeVerbDrill(count))
            setIndex(0)
            setPicked(null)
            setScore(0)
          }}
        >
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz irregular" aria-live="polite">
      <p className="progress">
        {index + 1} / {qs.length}
      </p>
      <p className="en">{q.verb.base}</p>
      <p className="verb-ask">
        （{q.verb.ja}）の<strong>{TENSE_LABEL[q.tense]}</strong>は？
      </p>
      <div className="choices">
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? '正解！' : '正解はこちら'}</p>
          <p className="verb-forms">
            {q.verb.base} – {q.verb.past} – {q.verb.pp}
          </p>
          <button
            className="flip"
            onClick={() => {
              setPicked(null)
              setIndex(index + 1)
            }}
          >
            次へ
          </button>
        </>
      )}
    </section>
  )
}
