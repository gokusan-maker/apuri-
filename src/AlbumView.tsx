import { albumEntries } from './album'
import type { Earned } from './badges'

export function Album({ earned, born }: { earned: Earned; born?: string }) {
  const list = albumEntries(earned)
  return (
    <div className="album">
      <h2>思い出アルバム</h2>
      <ol className="album-list" aria-label="思い出アルバム">
        {born && (
          <li>
            <span className="album-day">{born.slice(5).replace('-', '/')}</span> 🥚 相棒と出会った
          </li>
        )}
        {list.map((b) => (
          <li key={b.id}>
            <span className="album-day">{b.day.slice(5).replace('-', '/')}</span> {b.icon} {b.name}
          </li>
        ))}
      </ol>
      {list.length === 0 && <p className="stats-note">バッジをもらうと、ここに思い出がふえていくよ。</p>}
    </div>
  )
}
