import { useState } from 'react'
import type { MapSpot } from './CastleMapView'

// キャラの下の小さなレベルえらび：おすと候補が出て、えらぶとそのレベルの城に変わる
export function LevelPick({ label, spots, current, onPick, unit = '' }: { label: string; spots: MapSpot[]; current: string; onPick: (id: string) => void; unit?: string }) {
  const [open, setOpen] = useState(false)
  const now = spots.find((s) => s.id === current)
  return (
    <div className="lvpick">
      <button className="lvpick-btn" aria-expanded={open} aria-label={`${label}：${now?.name ?? 'えらぶ'}（変更）`} onClick={() => setOpen(!open)}>
        <span className="lvpick-cap">🗺 {label}</span>
        <b className="lvpick-now">{now?.name ?? 'えらぶ'}</b>
        <span className="lvpick-change">{open ? '▲ とじる' : '▼ 変更'}</span>
      </button>
      {open && (
        <ul className="lvpick-list" role="listbox" aria-label={label}>
          {spots.map((s) => {
            const full = s.total !== undefined && s.total > 0 && s.done === s.total
            return (
              <li key={s.id}>
                <button
                  role="option"
                  aria-selected={s.id === current}
                  className={`lvpick-opt${s.id === current ? ' on' : ''}`}
                  onClick={() => {
                    onPick(s.id)
                    setOpen(false)
                  }}
                >
                  <b>
                    {full ? '👑 ' : ''}
                    {s.name}
                  </b>
                  {s.sub && <small>{s.sub}</small>}
                  {s.badge && <small className="lvpick-badge">{s.badge}</small>}
                  {s.total !== undefined && s.total > 0 && (
                    <small className="lvpick-prog">
                      {s.done ?? 0}/{s.total}
                      {unit}
                    </small>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
