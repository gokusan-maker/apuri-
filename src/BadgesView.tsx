import { BADGES, type Badge, type Earned } from './badges'

export function BadgeList({ earned }: { earned: Earned }) {
  const count = BADGES.filter((b) => earned[b.id]).length
  return (
    <div className="badges">
      <h2>
        バッジ {count} / {BADGES.length}
      </h2>
      <ul className="badge-grid">
        {BADGES.map((b) => (
          <li key={b.id} className={earned[b.id] ? 'got' : 'locked'} title={b.desc}>
            <span className="badge-icon" aria-hidden="true">
              {earned[b.id] ? b.icon : '🔒'}
            </span>
            <span className="badge-name">{b.name}</span>
            <span className="badge-desc">{earned[b.id] ? earned[b.id] : b.desc}</span>
          </li>
        ))}
      </ul>
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
