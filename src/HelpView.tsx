import { HELP } from './help'

export function Help() {
  return (
    <details className="setting whats-new help">
      <summary>❔ 遊び方</summary>
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
