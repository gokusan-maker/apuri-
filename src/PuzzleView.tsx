import { useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import type { PuzzleQ } from './puzzles'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

export const PUZZLE_COUNT = 10

type Props = {
  make: () => PuzzleQ
  count?: number // 何問で区切るか
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

// 4択パズル：10問で区切って結果を出す
export function Puzzle({ make, onAnswer, count = PUZZLE_COUNT }: Props) {
  const [q, setQ] = useState(make)
  const [picked, setPicked] = useState<number | null>(null)
  const [hintOpen, setHintOpen] = useState(false)
  const [n, setN] = useState(1)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    const ok = i === q.answer
    if (ok) {
      playCorrect()
      setScore(score + 1)
    } else playWrong()
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, q.wordId, 'quiz')
  }

  function next() {
    if (n >= count) {
      setDone(true)
      return
    }
    setN(n + 1)
    setQ(make())
    setPicked(null)
    setHintOpen(false)
  }

  if (done) {
    return (
      <section className="card result puzzle">
        <h2>結果</h2>
        <p className="result-score">
          {score} / {count} 問正解
        </p>
        <button
          className="flip"
          onClick={() => {
            setDone(false)
            setN(1)
            setScore(0)
            setQ(make())
            setPicked(null)
          }}
        >
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz puzzle">
      <p className="quiz-progress">
        {n} / {count} 問目・正解 {score}
      </p>
      <p className="verb-ask puzzle-prompt">{q.prompt}</p>
      {q.hint &&
        picked === null &&
        (hintOpen ? (
          <p className="puzzle-hint">💡 ヒント：{q.hint}</p>
        ) : (
          <button className="list-link" onClick={() => setHintOpen(true)}>
            💡 英語のヒントを見る
          </button>
        ))}
      <div className="choices">
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button key={c} className={cls} onClick={() => pick(i)}>
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? '正解！' : `正解は「${q.choices[q.answer]}」`}</p>
          {q.say && (
            <button className="list-link" onClick={() => speak(q.say!)}>
              🔊 問題と答えを英語で聞く
            </button>
          )}
          {q.explain ? (
            <ul className="puzzle-explain" aria-label="解説">
              {q.explain.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : (
            <p className="stats-note">{q.why}</p>
          )}
          <button className="flip" onClick={next}>
            {n >= count ? '結果を見る' : '次へ'}
          </button>
        </>
      )}
    </section>
  )
}
