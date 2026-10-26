import { useState } from 'react'
import type { TeamQ } from './boss'
import { bcPassOf } from './bosscastle'
import { playCorrect, playWrong } from './sound'

// ボスの城の問題の階：単語は10問（8問以上）、ほかは5問（4問以上）正解でクリア。終わったらすぐ再チャレンジできる
export function BossFloor({ title, qs, onDone, onBack, onRetry, taunt, reward = 0 }: { title: string; qs: TeamQ[]; onDone: (score: number) => void; onBack: () => void; onRetry?: () => void; taunt?: string; reward?: number }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [hint, setHint] = useState(false)
  const q = qs[i]
  const pass = bcPassOf(qs.length)
  const retryBtn = onRetry && (
    <button className="good next-unit-btn bfloor-retry" onClick={onRetry}>
      🔁 再チャレンジ（{qs.length}問）
    </button>
  )
  if (!q)
    return (
      <section className="card bfloor" aria-label={title}>
        <p className={`stage-result${score >= pass ? ' clear' : ''}`} role="status">
          {score >= pass ? `🏰 クリア！ ${score}/${qs.length}問正解` : `あと少し！ ${score}/${qs.length}問（${pass}問以上でクリア）`}
        </p>
        {score >= pass && reward > 0 && <p className="bfloor-reward">🪙 {reward}コイン ゲット！</p>}
        {score >= pass && taunt && <p className="bfloor-taunt">{taunt}</p>}
        {retryBtn}
        <button className={`${onRetry ? 'list-link' : 'good next-unit-btn'}`} onClick={onBack}>
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
      {/* クリアまであと何問：正解の数と目標を星で見せる */}
      <p className={`bfloor-goal${score >= pass ? ' done' : ''}`} aria-label={`正解 ${score}問 ／ クリアは${pass}問`}>
        {Array.from({ length: pass }, (_, k) => (k < score ? '★' : '☆')).join('')}
        <span>{score >= pass ? ' クリア確定！' : ` あと${pass - score}問正解でクリア`}</span>
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
      {/* 最後の問題に答えたら、結果を見なくてもすぐ再チャレンジできる */}
      {picked !== null && i === qs.length - 1 && onRetry && (
        <button
          className="list-link bfloor-retry-now"
          onClick={() => {
            onDone(score)
            onRetry()
          }}
        >
          🔁 すぐに再チャレンジ
        </button>
      )}
    </section>
  )
}
