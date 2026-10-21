import type { GrammarUnit } from './grammar'
import { mistakeOf } from './grammarmistake'

type Props = { unit: GrammarUnit; onBack: () => void }

// 文法のおさらいプリント：要点・例文・確認問題（答えつき）を1画面にまとめて印刷できる
export function GrammarPrint({ unit, onBack }: Props) {
  const m = mistakeOf(unit.id)
  return (
    <section className="card grammar grammar-print">
      <div className="no-print">
        <button className="stage-back" onClick={onBack}>
          ← 解説にもどる
        </button>
        <button className="flip" onClick={() => window.print()}>
          🖨 印刷する
        </button>
      </div>
      <h2>📄 おさらいプリント：{unit.title}</h2>
      <h3>要点</h3>
      <ul className="grammar-points">
        {unit.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <h3>例文</h3>
      <ol className="print-list">
        {unit.examples.map((ex) => (
          <li key={ex.en}>
            {ex.en}
            <br />
            <small>{ex.ja}</small>
          </li>
        ))}
      </ol>
      {m && (
        <>
          <h3>よくあるまちがい</h3>
          <p>
            ✕ {m.wrong}　→　○ {m.right}
            <br />
            <small>{m.why}</small>
          </p>
        </>
      )}
      <h3>確認問題</h3>
      <ol className="print-list">
        {unit.questions.map((q) => (
          <li key={q.sentence}>
            {q.sentence.replace('___', '（　　　）')}　［{q.choices.join(' / ')}］
          </li>
        ))}
      </ol>
      <details className="print-answers" open>
        <summary>答え</summary>
        <ol className="print-list">
          {unit.questions.map((q) => (
            <li key={q.sentence}>
              {q.choices[q.answer]}　<small>{q.why}</small>
            </li>
          ))}
        </ol>
      </details>
    </section>
  )
}
