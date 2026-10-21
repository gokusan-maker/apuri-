import { useState } from 'react'
import type { GrammarUnit } from './grammar'
import { speak } from './speech'

type Props = { units: GrammarUnit[]; onBack: () => void }

// 文法の要点カード：表に単元名、うらに要点と例文。タップでめくる
export function GrammarCards({ units, onBack }: Props) {
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const u = units[i]
  const go = (d: number) => {
    setI((i + d + units.length) % units.length)
    setFlipped(false)
  }
  return (
    <section className="card grammar grammar-cards">
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <p className="progress">
        🃏 要点カード {i + 1} / {units.length}
      </p>
      <button className={`gcard${flipped ? ' back' : ''}`} onClick={() => setFlipped(!flipped)} aria-label={flipped ? 'カードの表を見る' : 'カードをめくる'}>
        {flipped ? (
          <span className="gcard-body">
            {u.points.map((p) => (
              <span key={p} className="gcard-point">
                ・{p}
              </span>
            ))}
            {u.examples[0] && (
              <span className="gcard-ex">
                {u.examples[0].en}
                <br />
                <small>{u.examples[0].ja}</small>
              </span>
            )}
          </span>
        ) : (
          <span className="gcard-title">
            {u.title}
            <small>タップでめくる</small>
          </span>
        )}
      </button>
      <div className="gcard-nav">
        <button className="list-link" onClick={() => go(-1)}>
          ◀ まえ
        </button>
        {flipped && u.examples[0] && (
          <button className="speak small" aria-label="例文を聞く" onClick={() => speak(u.examples[0].en)}>
            🔊
          </button>
        )}
        <button className="list-link" onClick={() => go(1)}>
          つぎ ▶
        </button>
      </div>
    </section>
  )
}
