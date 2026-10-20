import { useState } from 'react'
import { makeQuiz } from './quiz'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'

type Props = {
  words: Word[]
  count?: number
}

export function Quiz({ words, count = 10 }: Props) {
  const [questions, setQuestions] = useState(() => makeQuiz(words, (w) => w.ja, count))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const q = questions[index]

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) {
      setScore(score + 1)
      playCorrect()
    } else {
      playWrong()
    }
  }

  function next() {
    setPicked(null)
    setIndex(index + 1)
  }

  function restart() {
    setQuestions(makeQuiz(words, (w) => w.ja, count))
    setIndex(0)
    setPicked(null)
    setScore(0)
  }

  if (!q) {
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {questions.length} 問正解
        </p>
        <button className="flip" onClick={restart}>
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz" aria-live="polite">
      <p className="progress">
        {index + 1} / {questions.length}
      </p>
      <p className="en">{q.word.en}</p>
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
          <p className="feedback">{picked === q.answer ? '正解！' : `正解は「${q.choices[q.answer]}」`}</p>
          <button className="flip" onClick={next}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}
