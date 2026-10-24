import { useState } from 'react'
import { makePlacement, PLACEMENT_LEVELS, PER_LEVEL, recommend } from './placement'
import type { Level } from './words'

type Props = { onSetLevels?: (levels: Level[]) => void }

// レベル診断（XP は入らない）
export function Placement({ onSetLevels }: Props) {
  const [qs, setQs] = useState(makePlacement)
  const [i, setI] = useState(0)
  const [score, setScore] = useState<Partial<Record<Level, number>>>({})
  const [set, setSet] = useState(false)

  if (i >= qs.length) {
    const rec = recommend(score)
    return (
      <section className="card result placement">
        <h2>診断結果</h2>
        <ul className="placement-bars" aria-label="レベルごとの結果">
          {PLACEMENT_LEVELS.map((l) => (
            <li key={l} className={l === rec ? 'rec' : undefined}>
              <strong>{l}</strong>
              <span className="placement-bar" aria-hidden="true">
                <i style={{ width: `${((score[l] ?? 0) / PER_LEVEL) * 100}%` }} />
              </span>
              <span className="placement-score">
                {score[l] ?? 0} / {PER_LEVEL}
              </span>
            </li>
          ))}
        </ul>
        <p className="level-up">おすすめの単語帳：{rec}</p>
        {onSetLevels && (
          <button
            className="flip"
            disabled={set}
            onClick={() => {
              onSetLevels([rec])
              setSet(true)
            }}
          >
            {set ? `「${rec}」にしました` : `「${rec}」で学習する`}
          </button>
        )}
        <button
          className="list-link pill-btn pill-blue"
          onClick={() => {
            setQs(makePlacement())
            setI(0)
            setScore({})
            setSet(false)
          }}
        >
          もう一度診断する
        </button>
      </section>
    )
  }

  const { level, q } = qs[i]
  return (
    <section className="card quiz placement">
      <p className="quiz-progress">
        {i + 1} / {qs.length} 問目（レベル診断）
      </p>
      <p className="en">{q.word.en}</p>
      <div className="choices">
        {q.choices.map((c, k) => (
          <button
            key={c}
            className="choice"
            onClick={() => {
              if (k === q.answer) setScore((s) => ({ ...s, [level]: (s[level] ?? 0) + 1 }))
              setI(i + 1)
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="stats-note">わからないときは、いちばん近いと思うものをえらんでね</p>
    </section>
  )
}
