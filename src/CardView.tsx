import { useState } from 'react'
import { speak } from './speech'
import type { Word } from './words'

type Props = {
  card: Word | undefined
  onAnswer: (correct: boolean) => void
}

// 単語カード（英→日、めくる、発音、覚えた／まだ）
export function Card({ card, onAnswer }: Props) {
  const [flipped, setFlipped] = useState(false)

  if (!card) return <p className="done">今日の学習は完了です 🎉 また明日！</p>

  return (
    <section className="card" aria-live="polite">
      <p className="en">{card.en}</p>
      <button className="speak" onClick={() => speak(card.en)} aria-label="発音を聞く">
        🔊
      </button>
      {flipped ? (
        <>
          <p className="ja">{card.ja}</p>
          {card.example && (
            <p className="example">
              {card.example}
              <button className="speak small" onClick={() => speak(card.example)} aria-label="例文を聞く">
                🔊
              </button>
            </p>
          )}
          <p className="example-ja">{card.exampleJa}</p>
          <div className="actions">
            <button
              className="again"
              onClick={() => {
                setFlipped(false)
                onAnswer(false)
              }}
            >
              まだ
            </button>
            <button
              className="good"
              onClick={() => {
                setFlipped(false)
                onAnswer(true)
              }}
            >
              覚えた
            </button>
          </div>
        </>
      ) : (
        <button className="flip" onClick={() => setFlipped(true)}>
          意味を見る
        </button>
      )}
    </section>
  )
}
