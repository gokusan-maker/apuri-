import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { speak } from './speech'
import { swipeResult } from './swipe'
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
  const [dx, setDx] = useState(0)
  const start = useRef<{ x: number; y: number } | null>(null)

  // 英語が見えたときに自動で発音（英→日なら表、日→英ならめくったとき）
  const englishShown = !!card && (!jaFirst || flipped)
  useEffect(() => {
    if (autoSpeak && englishShown && card) speak(card.en)
  }, [autoSpeak, englishShown, card])

  if (!card) return <p className="done">今日の学習は完了です 🎉 また明日！</p>

  function answer(correct: boolean) {
    setFlipped(false)
    setDx(0)
    onAnswer(correct)
  }

  // めくったあとは、右にスワイプで「覚えた」、左で「まだ」
  const swipe = flipped
    ? {
        onPointerDown: (e: PointerEvent) => {
          start.current = { x: e.clientX, y: e.clientY }
        },
        onPointerMove: (e: PointerEvent) => {
          if (start.current) setDx(e.clientX - start.current.x)
        },
        onPointerUp: (e: PointerEvent) => {
          const s0 = start.current
          start.current = null
          setDx(0)
          if (!s0) return
          const r = swipeResult(e.clientX - s0.x, e.clientY - s0.y)
          if (r) answer(r === 'good')
        },
        onPointerCancel: () => {
          start.current = null
          setDx(0)
        },
      }
    : {}

  return (
    <section
      className={`card${dx > 40 ? ' swipe-good' : dx < -40 ? ' swipe-again' : ''}`}
      aria-live="polite"
      style={dx ? { transform: `translateX(${dx}px) rotate(${dx / 30}deg)` } : undefined}
      {...swipe}
    >
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
            <button className="again" onClick={() => answer(false)}>
              まだ
            </button>
            <button className="good" onClick={() => answer(true)}>
              覚えた
            </button>
          </div>
          <p className="swipe-hint">← スワイプでも答えられるよ →</p>
        </>
      ) : (
        <button className="flip" onClick={() => setFlipped(true)}>
          {jaFirst ? '英語を見る' : '意味を見る'}
        </button>
      )}
    </section>
  )
}
