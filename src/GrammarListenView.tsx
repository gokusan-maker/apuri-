import { useState } from 'react'
import { listenSet } from './grammarlisten'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onBack: () => void }

// 文法の例文リスニング（5問）
export function GrammarListen({ onAnswer, onBack }: Props) {
  const [qs] = useState(() => listenSet(5))
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  if (step >= qs.length) {
    return (
      <section className="card result">
        <button className="stage-back" onClick={onBack}>
          ← 単元一覧
        </button>
        <p className="result-title">👂 例文リスニング</p>
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
      </section>
    )
  }
  const q = qs[step]
  return (
    <section className="card quiz grammar">
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <p className="progress">
        👂 例文リスニング {step + 1} / {qs.length}
      </p>
      <button className="speak listen-play" onClick={() => speak(q.en)} aria-label="例文を聞く">
        🔊 聞く
      </button>
      <p className="example">{picked ? q.en : q.shown}</p>
      <div className="choices">
        {q.choices.map((c) => {
          let cls = 'choice'
          if (picked && c === q.answer) cls += ' correct'
          else if (picked === c) cls += ' wrong'
          return (
            <button
              key={c}
              className={cls}
              disabled={picked !== null}
              onClick={() => {
                setPicked(c)
                const ok = c === q.answer
                if (ok) {
                  setScore(score + 1)
                  playCorrect()
                } else playWrong()
                onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, '', 'ear')
              }}
            >
              {c}
            </button>
          )
        })}
      </div>
      {picked && (
        <>
          <p className="grammar-why">{q.ja}</p>
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
