import changelog from '../CHANGELOG.md?raw'
import { recentChanges } from './changelog'

export function WhatsNew() {
  const changes = recentChanges(changelog)
  if (changes.length === 0) return null
  return (
    <details className="setting whats-new">
      <summary>🆕 新しくなったこと</summary>
      <ul>
        {changes.map((c, i) => (
          <li key={i}>
            <small>{c.date.slice(5).replace('-', '/')}</small> {c.text}
          </li>
        ))}
      </ul>
    </details>
  )
}
