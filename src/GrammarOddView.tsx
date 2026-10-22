import { useState } from 'react'
import { makeOdd } from './grammarodd'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'

const rand = () => Math.random()
const ROUNDS = 5
const MARKS = ['ア', 'イ', 'ウ', 'エ']

type Props = { onBack: () => void; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

export function GrammarOdd({ onBack, onAnswer }: Props) {
  const [qs] = useState(() => Array.from({ length: ROUNDS }, () => makeOdd(rand)))
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  if (step >= qs.length) {
    return (
      <section className="card result">
        <button className="stage-back" onClick={onBack}>
          ← 単元一覧
        </button>
        <p className="result-title">🧺 文法のなかま分け</p>
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
      </section>
    )
  }
  const q = qs[step]
  return (
    <section className="card quiz grammar grammar-odd">
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <p className="progress">
        🧺 なかま分け {step + 1} / {qs.length}：1つだけ文法の種類がちがう文は？
      </p>
      <div className="duel-options">
        {q.sentences.map((t, i) => (
          <button
            key={i}
            className={`duel-option${picked !== null && i === q.odd ? ' correct' : ''}${picked === i && i !== q.odd ? ' wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(i)
              const ok = i === q.odd
              if (ok) {
                playCorrect()
                setScore(score + 1)
              } else playWrong()
              onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${q.unit.id}`, 'quiz')
            }}
          >
            {MARKS[i]} {t}
          </button>
        ))}
      </div>
      {picked !== null && (
        <>
          <p className={`long-why${picked === q.odd ? ' right' : ' wrong'}`}>
            {picked === q.odd ? '⭕' : '❌'} 正解 {MARKS[q.odd]}：ほかの3つは「{q.unit.title}」、{MARKS[q.odd]}は「{q.other.title}」
          </p>
          <button
            className="flip"
            onClick={() => {
              setPicked(null)
              setStep(step + 1)
            }}
          >
            次へ
          </button>
        </>
      )}
    </section>
  )
}
