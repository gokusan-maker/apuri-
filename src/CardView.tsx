import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { speak } from './speech'
import { swipeResult } from './swipe'
import { useKeys } from './useKeys'
import { Note } from './NoteView'
import type { Word } from './words'

type Props = {
  card: Word | undefined
  onAnswer: (correct: boolean, easy?: boolean) => void
  autoSpeak?: boolean
  jaFirst?: boolean // 表に日本語、裏に英語
  favorite?: boolean
  onToggleFavorite?: () => void
  onMore?: () => void // 今日の分が終わったあと、新しい単語を5語ふやす
  onQuiz?: () => void
  note?: string
  onNote?: (text: string) => void
}

// 単語カード（英→日、めくる、発音、覚えた／まだ）
export function Card({ card, onAnswer, autoSpeak = false, jaFirst = false, favorite = false, onToggleFavorite, onMore, onQuiz, note, onNote }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [dx, setDx] = useState(0)
  const start = useRef<{ x: number; y: number } | null>(null)

  // 英語が見えたときに自動で発音（英→日なら表、日→英ならめくったとき）
  const englishShown = !!card && (!jaFirst || flipped)
  useEffect(() => {
    if (autoSpeak && englishShown && card) speak(card.en)
  }, [autoSpeak, englishShown, card])

  // スペースでめくる、めくったあとは →／Enter で「覚えた」、← で「まだ」
  useKeys((key) => {
    if (!card) return
    if (!flipped && (key === ' ' || key === 'Enter')) {
      setFlipped(true)
      return true
    }
    if (flipped && (key === 'ArrowRight' || key === 'Enter')) {
      answer(true)
      return true
    }
    if (flipped && key === 'ArrowUp') {
      answer(true, true)
      return true
    }
    if (flipped && key === 'ArrowLeft') {
      answer(false)
      return true
    }
  })

  if (!card) {
    return (
      <div className="done">
        <p>今日の学習は完了です 🎉 また明日！</p>
        {(onMore || onQuiz) && (
          <div className="actions">
            {onMore && (
              <button className="good" onClick={onMore}>
                もう5語おぼえる
              </button>
            )}
            {onQuiz && (
              <button className="good" onClick={onQuiz}>
                クイズで力だめし
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  function answer(correct: boolean, easy = false) {
    setFlipped(false)
    setDx(0)
    onAnswer(correct, easy)
  }

  // めくったあとは、右にスワイプで「覚えた」、左で「まだ」
  const swipe = flipped
    ? {
        onPointerDown: (e: PointerEvent) => {
          start.current = { x: e.clientX, y: e.clientY }
          // カードの外で指やマウスを離しても離したことがわかるように
          ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
        },
        onPointerMove: (e: PointerEvent) => {
          if (e.pointerType === 'mouse' && e.buttons === 0) start.current = null
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
      {onToggleFavorite && (
        <button
          className={`fav${favorite ? ' on' : ''}`}
          onClick={onToggleFavorite}
          aria-pressed={favorite}
          aria-label="お気に入り"
        >
          {favorite ? '★' : '☆'}
        </button>
      )}
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
          {onNote && <Note text={note} onSave={onNote} />}
          <div className="actions">
            <button className="again" onClick={() => answer(false)}>
              まだ
            </button>
            <button className="good" onClick={() => answer(true)}>
              覚えた
            </button>
            <button className="easy" onClick={() => answer(true, true)}>
              かんたん
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
