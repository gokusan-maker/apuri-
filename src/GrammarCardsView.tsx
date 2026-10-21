import { useState } from 'react'
import { loadCardsKnown, markKnown, saveCardsKnown, type GrammarUnit } from './grammar'
import { speak } from './speech'

type Props = { units: GrammarUnit[]; onBack: () => void }

// 文法の要点カード：表に単元名、うらに要点と例文。タップでめくる
export function GrammarCards({ units: all, onBack }: Props) {
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(loadCardsKnown)
  const [onlyNew, setOnlyNew] = useState(false)
  const [deck, setDeck] = useState(all) // 「まだだけ」にしたときの山札（めくっている間は変えない）
  const units = onlyNew ? deck : all
  const u = units[Math.min(i, units.length - 1)]
  const go = (d: number) => {
    setI((i + d + units.length) % units.length)
    setFlipped(false)
  }
  const mark = (k: boolean) => {
    const next = markKnown(known, u.id, k)
    setKnown(next)
    saveCardsKnown(next)
    go(1)
  }
  const knownCount = all.filter((x) => known.includes(x.id)).length
  const toggle = (
    <button
      className="list-link"
      onClick={() => {
        setDeck(all.filter((x) => !known.includes(x.id)))
        setOnlyNew(!onlyNew)
        setI(0)
        setFlipped(false)
      }}
    >
      {onlyNew ? '📚 全部のカードにもどす' : '🔁 「まだ」のカードだけめくる'}
    </button>
  )
  if (!u) {
    return (
      <section className="card grammar grammar-cards">
        <button className="stage-back" onClick={onBack}>
          ← 単元一覧
        </button>
        <p className="level-up">🎉 全部のカードを覚えた！</p>
        {toggle}
      </section>
    )
  }
  return (
    <section className="card grammar grammar-cards">
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <p className="progress">
        🃏 要点カード {Math.min(i, units.length - 1) + 1} / {units.length}　⭕ 覚えた {knownCount} / {all.length}
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
      {flipped && (
        <div className="gcard-nav">
          <button className="list-link" onClick={() => mark(true)}>
            ⭕ 覚えた
          </button>
          <button className="list-link" onClick={() => mark(false)}>
            🔁 まだ
          </button>
        </div>
      )}
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
      {toggle}
    </section>
  )
}
