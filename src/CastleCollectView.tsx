import { useState } from 'react'
import { allCastles, claimableSteps, COLLECT_STEPS, conquered, loadCollectClaimed, saveCollectClaimed, titleOf } from './castlecollect'

// ホーム：城の制覇コレクション（てっぺんまで登った城の数・称号・節目のごほうび）
export function CastleCollection({ onReward }: { onReward: (tickets: number) => void }) {
  const [list] = useState(allCastles)
  const [claimed, setClaimed] = useState(loadCollectClaimed)
  const done = conquered(list)
  const can = claimableSteps(done, claimed)
  const next = COLLECT_STEPS.find((s) => s.n > done)
  return (
    <details className="castle-collect">
      <summary>
        <span className="cc-icon" aria-hidden="true">🏰</span>
        <span className="cc-head">
          城の制覇コレクション <b aria-label={`制覇 ${done} / ${list.length}城`}>{done}/{list.length}</b>
        </span>
        <small className="cc-title">{titleOf(done) ? `称号「${titleOf(done)}」` : next ? `あと${next.n - done}城で称号` : ''}</small>
      </summary>
      {can > 0 && (
        <button
          className="treasure-btn cc-claim"
          onClick={() => {
            saveCollectClaimed(claimed + can)
            setClaimed(claimed + can)
            onReward(can)
          }}
        >
          🎁 ごほうびを受け取る（🎟×{can}）
        </button>
      )}
      <ul className="cc-list">
        {list.map((c) => (
          <li key={c.id} className={c.floors > 0 && c.cleared >= c.floors ? 'done' : undefined}>
            <span className={`cc-kind k-${c.kind}`}>{c.kind}</span>
            <span className="cc-name">
              {c.floors > 0 && c.cleared >= c.floors ? '👑 ' : ''}
              {c.name}
            </span>
            <span className="cc-bar" aria-hidden="true">
              <i style={{ width: `${c.floors ? (c.cleared / c.floors) * 100 : 0}%` }} />
            </span>
            <small className="cc-n">
              {c.cleared}/{c.floors}
            </small>
          </li>
        ))}
      </ul>
    </details>
  )
}

// ホームのキャラの上に出す城主の称号（制覇した城が1つ以上のとき）
export function CastleTitleChip() {
  const [title] = useState(() => titleOf(conquered(allCastles())))
  if (!title) return null
  return (
    <p className="castle-title-chip" aria-label={`城の称号：${title}`}>
      🏰 {title}
    </p>
  )
}
