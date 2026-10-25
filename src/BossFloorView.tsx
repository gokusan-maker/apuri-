import { useState } from 'react'
import type { TeamQ } from './boss'
import { BC_PASS } from './bosscastle'
import { playCorrect, playWrong } from './sound'

// ボスの城の問題の階：5問。4問以上正解でクリア
export function BossFloor({ title, qs, onDone, onBack }: { title: string; qs: TeamQ[]; onDone: (score: number) => void; onBack: () => void }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [hint, setHint] = useState(false)
  const q = qs[i]
  if (!q)
    return (
      <section className="card bfloor" aria-label={title}>
        <p className={`stage-result${score >= BC_PASS ? ' clear' : ''}`} role="status">
          {score >= BC_PASS ? `🏰 クリア！ ${score}/${qs.length}問正解` : `あと少し！ ${score}/${qs.length}問（${BC_PASS}問以上でクリア）`}
        </p>
        <button className="good next-unit-btn" onClick={onBack}>
          城にもどる
        </button>
      </section>
    )
  return (
    <section className="card bfloor" aria-label={title}>
      <button className="list-link" onClick={onBack}>
        ← 城にもどる
      </button>
      <p className="bfloor-title">{title}</p>
      <p className="bfloor-count">
        {i + 1} / {qs.length}
      </p>
      <p className={`bfloor-q team-${q.team}`}>{q.word.en}</p>
      {q.hint && picked === null && !hint && (
        <button className="hint-5050" onClick={() => setHint(true)}>
          💡 ヒント
        </button>
      )}
      {hint && picked === null && q.hint && <p className="read-hint-text">💡 {q.hint}</p>}
      <div className="choices">
        {q.choices.map((c, k) => (
          <button
            key={c}
            className={`choice${picked !== null && k === q.answer ? ' correct' : ''}${picked === k && k !== q.answer ? ' wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(k)
              if (k === q.answer) {
                setScore(score + 1)
                playCorrect()
              } else playWrong()
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <button
          className="good next-unit-btn"
          onClick={() => {
            const last = i === qs.length - 1
            setI(i + 1)
            setPicked(null)
            setHint(false)
            if (last) onDone(score)
          }}
        >
          {i === qs.length - 1 ? '結果を見る' : '次へ'}
        </button>
      )}
    </section>
  )
}
