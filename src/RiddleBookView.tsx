import { RIDDLES } from './puzzles'

// なぞなぞ図鑑：正解したなぞなぞを、訳としかけの解説つきで見返せる
export function RiddleBook({ solved }: { solved: string[] }) {
  const got = RIDDLES.filter((r) => solved.includes(r.q))
  return (
    <details className="tense-table riddle-book chip-fold cf-1">
      <summary>
        📚 なぞなぞ図鑑（{got.length} / {RIDDLES.length}）
      </summary>
      {got.length === 0 ? (
        <p className="stats-note">正解したなぞなぞがここに集まるよ。</p>
      ) : (
        <ul>
          {got.map((r) => (
            <li key={r.q}>
              <strong>{r.q}</strong>
              <span>
                → {r.a}（{r.aja}）
              </span>
              <small>{r.trick}</small>
            </li>
          ))}
        </ul>
      )}
    </details>
  )
}
