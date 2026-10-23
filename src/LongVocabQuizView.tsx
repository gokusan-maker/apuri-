import { useState } from 'react'
import { keyWords, makeVocabQuiz } from './longvocab'
import { LONG_PASSAGES } from './longreading'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'

const rand = () => Math.random()

type Props = { readIds: string[]; onBack: () => void; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

export function LongVocabQuiz({ readIds, onBack, onAnswer }: Props) {
  const [qs] = useState(() => makeVocabQuiz(LONG_PASSAGES.filter((p) => readIds.includes(p.id)).flatMap((p) => keyWords(p)), rand))
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  if (qs.length === 0) {
    return (
      <section className="card grammar">
        <button className="stage-back" onClick={onBack}>
          ← 読解の一覧
        </button>
        <p className="stats-note">まず読解を読んで採点してみよう。</p>
      </section>
    )
  }
  if (step >= qs.length) {
    return (
      <section className="card result">
        <button className="stage-back" onClick={onBack}>
          ← 読解の一覧
        </button>
        <p className="result-title">📒 重要語句クイズ</p>
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
      </section>
    )
  }
  const q = qs[step]
  return (
    <section className="card quiz grammar long-vq">
      <button className="stage-back" onClick={onBack}>
        ← 読解の一覧
      </button>
      <p className="progress">
        📒 重要語句クイズ {step + 1} / {qs.length}
      </p>
      <p className="en">{q.w.en}</p>
      <div className="choices">
        {q.choices.map((c) => (
          <button
            key={c}
            className={`choice${picked !== null && c === q.w.ja ? ' correct' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(c)
              const ok = c === q.w.ja
              if (ok) {
                playCorrect()
                setScore(score + 1)
              } else playWrong()
              onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, q.w.id, 'quiz')
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <button
          className="flip"
          onClick={() => {
            setPicked(null)
            setStep(step + 1)
          }}
        >
          次へ
        </button>
      )}
    </section>
  )
}
