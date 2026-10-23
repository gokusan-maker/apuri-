import { useState } from 'react'
import { collectRecords } from './records'

// 記録の部屋：自己ベストの一覧
export function Records() {
  const [rows] = useState(collectRecords)
  return (
    <div className="records">
      <h2>🏆 記録の部屋</h2>
      <ul>
        {rows.map((r) => (
          <li key={r.label} className={String(r.value).length > 10 ? 'wide' : undefined}>
            <span className="records-icon" aria-hidden="true">
              {r.icon}
            </span>
            <span className="records-label">{r.label}</span>
            <strong className="records-value">{r.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
