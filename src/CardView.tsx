import { useEffect, useState } from 'react'
import { speak } from './speech'
import type { Word } from './words'

type Props = {
  card: Word | undefined
  onAnswer: (correct: boolean) => void
  autoSpeak?: boolean
  jaFirst?: boolean // 表に日本語、裏に英語
}

// 単語カード（英→日、めくる、発音、覚えた／まだ）
export function Card({ card, onAnswer, autoSpeak = false, jaFirst = false }: Props) {
  const [flipped, setFlipped] = useState(false)

  // 英語が見えたときに自動で発音（英→日なら表、日→英ならめくったとき）
  const englishShown = !!card && (!jaFirst || flipped)
  useEffect(() => {
    if (autoSpeak && englishShown && card) speak(card.en)
  }, [autoSpeak, englishShown, card])

  if (!card) return <p className="done">今日の学習は完了です 🎉 また明日！</p>

  return (
    <section className="card" aria-live="polite">
      {jaFirst ? (
        <p className="en ja-prompt">{card.ja}</p>
      ) : (
        <>
          <p className="en">{card.en}</p>
          <button className="speak" onClick={() => speak(card.en)} aria-label="発音を聞く">
            🔊
          </button>
        </>
      )}
      {flipped ? (
        <>
          {jaFirst ? (
            <p className="ja card-en-back">
              {card.en}
              <button className="speak small" onClick={() => speak(card.en)} aria-label="発音を聞く">
                🔊
              </button>
            </p>
          ) : (
            <p className="ja">{card.ja}</p>
          )}
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
          {jaFirst ? '英語を見る' : '意味を見る'}
        </button>
      )}
    </section>
  )
}
