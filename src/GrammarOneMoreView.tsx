import { useState } from 'react'
import { oneMoreOf } from './grammarmistake'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'

type Props = {
  unitId: string
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

// 確認問題のあとの「もう1問」（正しい文はどれ？）
export function GrammarOneMore({ unitId, onAnswer }: Props) {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<number | null>(null)
  const q = oneMoreOf(unitId)
  if (!q) return null
  if (!open) {
    return (
      <button className="list-link grammar-one-more" onClick={() => setOpen(true)}>
        ➕ もう1問（正しい文はどれ？）
      </button>
    )
  }
  return (
    <div className="grammar-one-more-box">
      <p className="stats-note">➕ もう1問：正しい英文はどれ？</p>
      <div className="choices">
        {q.choices.map((c, i) => (
          <button
            key={c}
            className={`choice${picked === null ? '' : i === q.answer ? ' correct' : i === picked ? ' wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(i)
              const ok = i === q.answer
              if (ok) playCorrect()
              else playWrong()
              onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unitId}`, 'quiz')
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="feedback">
          {picked === q.answer ? '⭕ 正解！' : '❌ ざんねん'} {q.why}
        </p>
      )}
    </div>
  )
}
