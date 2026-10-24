import { useState } from 'react'
import type { GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'

type Props = { unit: GrammarUnit; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onBack: () => void; onSpend?: (coins: number) => boolean }

export const ORDER_HINT_COST = 3

// 文法の並べかえクイズ：単元の例文をばらばらにして、タップで並べなおす
export function GrammarOrder({ unit, onAnswer, onBack, onSpend }: Props) {
  const [qs] = useState(() => unit.examples.map((ex) => ({ ...ex, tiles: shuffle(ex.en.split(' ')) })))
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [checked, setChecked] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)

  if (step >= qs.length) {
    return (
      <section className="card result">
        <button className="stage-back" onClick={onBack}>
          ← 解説にもどる
        </button>
        <p className="result-title">🧩 並べかえ：{unit.title}</p>
        <p className="result-score">
          {score} / {qs.length} 問正解
        </p>
      </section>
    )
  }

  const q = qs[step]
  const built = picked.map((i) => q.tiles[i]).join(' ')
  return (
    <section className="card grammar grammar-order">
      <button className="stage-back" onClick={onBack}>
        ← 解説にもどる
      </button>
      <p className="progress">
        🧩 並べかえ {step + 1} / {qs.length}
      </p>
      <p className="grammar-order-ja">{q.ja}</p>
      <p className="long-order-answer" aria-label="並べた英文">
        {built || '　'}
      </p>
      <div className="long-order-words">
        {q.tiles.map((w, i) => (
          <button key={i} className={`long-choice order-tile${picked.includes(i) ? ' used' : ''}`} disabled={checked !== null || picked.includes(i)} onClick={() => setPicked([...picked, i])}>
            {w}
          </button>
        ))}
      </div>
      <div className="order-tools">
        {checked === null && picked.length > 0 && (
          <button className="order-tool redo" onClick={() => setPicked([])}>
            ↺ やりなおす
          </button>
        )}
        {checked === null && picked.length === 0 && onSpend && (
          <button
            className="order-tool hint"
            onClick={() => {
              if (!onSpend(ORDER_HINT_COST)) return
              const first = q.en.split(' ')[0]
              const i = q.tiles.indexOf(first)
              if (i >= 0) setPicked([i])
            }}
          >
            💡 最初の1語を教えて 🪙{ORDER_HINT_COST}
          </button>
        )}
      </div>
      {checked === null ? (
        <button
          className="flip order-check"
          disabled={picked.length < q.tiles.length}
          onClick={() => {
            const ok = built === q.en
            setChecked(ok)
            if (ok) {
              setScore(score + 1)
              playCorrect()
            } else playWrong()
            onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
          }}
        >
          ✔ 答えあわせ
        </button>
      ) : (
        <>
          <p className="feedback">{checked ? '⭕ 正解！' : `❌ 正解は「${q.en}」`}</p>
          <button
            className="flip order-next"
            onClick={() => {
              setStep(step + 1)
              setPicked([])
              setChecked(null)
            }}
          >
            次へ ▶
          </button>
        </>
      )}
    </section>
  )
}
