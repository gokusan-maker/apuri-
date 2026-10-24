import { useState } from 'react'
import { splitSoft } from './softbreak'
import { BADGES, type Badge, type Earned } from './badges'

// バッジ一覧：タイルは名前だけ。押すと上に条件（取った日）が出る。まだのバッジはたたんでおく（🔒 がずらっと並ばないように）
export function BadgeList({ earned }: { earned: Earned }) {
  const count = BADGES.filter((b) => earned[b.id]).length
  const [sel, setSel] = useState<string | null>(null)
  const picked = BADGES.find((b) => b.id === sel)
  const tile = (b: Badge) => (
    <li key={b.id} className={`${earned[b.id] ? 'got' : 'locked'}${sel === b.id ? ' active' : ''}`}>
      <button className="badge-tile" aria-pressed={sel === b.id} onClick={() => setSel(sel === b.id ? null : b.id)}>
        <span className="badge-icon" aria-hidden="true">
          {earned[b.id] ? b.icon : '🔒'}
        </span>
        <span className="badge-name">{splitSoft(b.name).flatMap((t, i) => (i > 0 ? [<wbr key={i} />, t] : [t]))}</span>
      </button>
    </li>
  )
  return (
    <div className="badges">
      <h2>
        バッジ {count} / {BADGES.length}
      </h2>
      {picked && (
        <p className="badge-detail" role="status">
          {earned[picked.id] ? picked.icon : '🔒'} <b>{picked.name}</b>：{picked.desc}
          {earned[picked.id] && <small>（{earned[picked.id]}）</small>}
        </p>
      )}
      {count > 0 && <ul className="badge-grid">{BADGES.filter((b) => earned[b.id]).map(tile)}</ul>}
      {count < BADGES.length && (
        <details className="badges-locked">
          <summary>
            🔒 まだのバッジ <span className="game-count">{BADGES.length - count}</span>
          </summary>
          <ul className="badge-grid">{BADGES.filter((b) => !earned[b.id]).map(tile)}</ul>
        </details>
      )}
    </div>
  )
}

export function BadgeToast({ badges, onClose }: { badges: Badge[]; onClose: () => void }) {
  if (badges.length === 0) return null
  return (
    <div className="badge-toast" role="status" onClick={onClose}>
      <span className="badge-icon" aria-hidden="true">
        {badges[0].icon}
      </span>
      <div>
        <p className="badge-toast-title">バッジ獲得！</p>
        <p className="badge-toast-name">
          {badges.map((b) => b.name).join('・')}
        </p>
      </div>
    </div>
  )
}
