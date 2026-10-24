import { useState } from 'react'
import { walkQuiz, type WalkEntry } from './walk'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

const rand = () => Math.random()
const EXTRA = ['りんご', '学校', '走る', '空', '友だち', '時計']

type Props = { diary: WalkEntry[]; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onClose: () => void }

// おさんぽクイズ：おさんぽで拾った単語から3問
export function WalkQuiz({ diary, onAnswer, onClose }: Props) {
  const [qs] = useState(() => walkQuiz(diary, EXTRA, rand))
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  if (i >= qs.length) {
    return (
      <div className="walk-quiz" role="status">
        <p>
          🐾 おさんぽクイズ {score} / {qs.length} 問正解！
        </p>
        <button className="list-link pill-btn pill-blue" onClick={onClose}>
          とじる
        </button>
      </div>
    )
  }
  const q = qs[i]
  return (
    <div className="walk-quiz">
      <p className="walk-quiz-q">
        🐾 {i + 1} / {qs.length}：<strong>{q.en}</strong>
        <button className="speak small" aria-label="発音を聞く" onClick={() => speak(q.en)}>
          🔊
        </button>
      </p>
      <div className="choices">
        {q.choices.map((c) => (
          <button
            key={c}
            className={`choice${picked !== null && c === q.ja ? ' correct' : picked === c ? ' wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(c)
              const ok = c === q.ja
              if (ok) {
                playCorrect()
                setScore(score + 1)
              } else playWrong()
              onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, '', 'quiz')
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
            setI(i + 1)
          }}
        >
          次へ
        </button>
      )}
    </div>
  )
}
