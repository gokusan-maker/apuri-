import { MISSION_XP, missionsFor, type MissionState } from './missions'

export function Missions({ state, today }: { state: MissionState; today: string }) {
  const list = missionsFor(today)
  const counts = state.day === today ? state.counts : {}
  const done = list.filter((m) => (counts[m.counter] ?? 0) >= m.target).length
  return (
    <section className="card missions">
      <h2>
        今日のミッション {done} / {list.length}
      </h2>
      <ul>
        {list.map((m) => {
          const n = Math.min(counts[m.counter] ?? 0, m.target)
          const ok = n >= m.target
          return (
            <li key={m.id} className={ok ? 'done' : ''}>
              <span className="mission-check" aria-hidden="true">
                {ok ? '✅' : '⬜'}
              </span>
              <span className="mission-text">{m.text}</span>
              <span className="mission-progress">{ok ? `+${MISSION_XP}XP` : `${n}/${m.target}`}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
