import { useState } from 'react'
import { spotSet } from './grammarspot'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onBack: () => void }

// 文法のまちがいさがし（○×で10問）
export function GrammarSpot({ onAnswer, onBack }: Props) {
  const [qs] = useState(() => spotSet(10))
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)

  if (step >= qs.length) {
    return (
      <section className="card result">
        <button className="stage-back" onClick={onBack}>
          ← 単元一覧
        </button>
        <p className="result-title">🔍 まちがいさがし</p>
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
      </section>
    )
  }
  const q = qs[step]
  return (
    <section className="card quiz grammar" aria-live="polite">
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <p className="progress">
        🔍 まちがいさがし {step + 1} / {qs.length}
      </p>
      <p className="stats-note">この英文は正しい？ 文法のまちがいがある？</p>
      <p className="example spot-text">{q.text}</p>
      <div className="long-choices tf spot-buttons">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            className={`long-choice${picked !== null && v === q.correct ? ' answer' : ''}${picked === v ? ' picked' : ''}`}
            disabled={picked !== null}
            aria-label={v ? '正しい' : 'まちがいがある'}
            onClick={() => {
              setPicked(v)
              const ok = v === q.correct
              if (ok) {
                setScore(score + 1)
                playCorrect()
              } else playWrong()
              onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, '', 'quiz')
            }}
          >
            {v ? '○ 正しい' : '× まちがい'}
          </button>
        ))}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.correct ? '正解！' : 'ざんねん'}</p>
          {!q.correct && <p className="grammar-why">正しくは「{q.right}」</p>}
          <p className="grammar-why">{q.why}</p>
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
