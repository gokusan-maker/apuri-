import type { GrammarFig } from './grammarfig'
import { speak } from './speech'

// 文法の城の解説：かたちの式（色つきブロック）と、使い方3つのカード（絵・意味・例）
export function GrammarFigure({ fig }: { fig: GrammarFig }) {
  return (
    <div className="gfig">
      <p className="gfig-formula" aria-label="かたち">
        {fig.formula.map((c, i) => (
          <span key={i} className={`gfig-chip gfig-${c.c}`}>
            {c.t}
          </span>
        ))}
      </p>
      {fig.uses.length > 0 && (
        <ul className="gfig-uses">
          {fig.uses.map((u) => (
            <li key={u.name} className="gfig-use">
              <span className="gfig-icon" aria-hidden="true">
                {u.icon}
              </span>
              <strong className="gfig-name">{u.name}</strong>
              <button className="gfig-ex" onClick={() => speak(u.ex)} aria-label={`${u.ex} を聞く`}>
                {u.ex} 🔊
              </button>
              <small className="gfig-ja">{u.ja}</small>
            </li>
          ))}
        </ul>
      )}
      <p className="gfig-tip">💡 {fig.tip}</p>
    </div>
  )
}

// 入試の城の解説：項目ごとに、かたちの式を1行ずつ（ラベルつき）
export function GrammarFigRows({ rows }: { rows: { name: string; fig: GrammarFig }[] }) {
  return (
    <ul className="gfig-rows">
      {rows.map((r) => (
        <li key={r.name} className="gfig-row">
          <strong className="gfig-row-name">{r.name}</strong>
          <p className="gfig-formula" aria-label={`${r.name}のかたち`}>
            {r.fig.formula.map((c, i) => (
              <span key={i} className={`gfig-chip gfig-${c.c}`}>
                {c.t}
              </span>
            ))}
          </p>
          <small className="gfig-row-tip">💡 {r.fig.tip}</small>
        </li>
      ))}
    </ul>
  )
}
