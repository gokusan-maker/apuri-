import { useState } from 'react'
import { LONG_PASSAGES } from './longreading'
import { makeTfQuiz } from './longtf'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'

const rand = () => Math.random()

type Props = { readIds: string[]; onBack: () => void; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// ○×だけチャレンジ：解いた長文の内容一致から10問
export function LongTfQuiz({ readIds, onBack, onAnswer }: Props) {
  const [qs] = useState(() => makeTfQuiz(LONG_PASSAGES.filter((p) => readIds.includes(p.id)), rand))
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const back = (
    <button className="stage-back" onClick={onBack}>
      ← 読解の一覧
    </button>
  )
  if (step >= qs.length) {
    return (
      <section className="card result">
        {back}
        <p className="result-title">⭕❌ ○×だけチャレンジ</p>
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
        <p className="result-message">{score === qs.length ? 'カンペキ！' : 'まちがえた読解を読み直してみよう'}</p>
      </section>
    )
  }
  const q = qs[step]
  return (
    <section className="card quiz grammar long-tfq">
      {back}
      <p className="progress">
        ⭕❌ ○×だけチャレンジ {step + 1} / {qs.length}
      </p>
      <p className="stats-note">『{q.title}』の内容と合っていれば○、合っていなければ×</p>
      <p className="long-tf-statement">{q.statement}</p>
      <div className="choices">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            className={`choice${picked !== null && v === q.answer ? ' correct' : picked === v ? ' wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(v)
              const ok = v === q.answer
              if (ok) {
                playCorrect()
                setScore(score + 1)
              } else playWrong()
              onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, '', 'quiz')
            }}
          >
            {v ? '○' : '×'}
          </button>
        ))}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">
            {picked === q.answer ? '正解！' : 'ざんねん'} {q.why}
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
