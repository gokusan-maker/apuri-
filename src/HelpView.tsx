import { HELP } from './help'

export function Help() {
  return (
    <details className="setting whats-new help game-fold lg-0">
      <summary><span className="lg-icon" aria-hidden="true">❔</span>遊び方</summary>
      <dl>
        {HELP.map((h) => (
          <div key={h.title}>
            <dt>{h.title}</dt>
            <dd>{h.text}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}
