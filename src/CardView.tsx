import { blankOut } from './blank'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { speak } from './speech'
import { swipeResult } from './swipe'
import { useKeys } from './useKeys'
import { Note } from './NoteView'
import { confusingFor } from './confusing'
import { verbOf } from './irregular'
import { EMOJI } from './emoji'
import type { Word } from './words'

type Props = {
  card: Word | undefined
  onAnswer: (correct: boolean, easy?: boolean) => void
  autoSpeak?: boolean
  jaFirst?: boolean // 表に日本語、裏に英語
  emojiHint?: boolean // 表にも絵文字のヒント（かんたんモード）
  favorite?: boolean
  onToggleFavorite?: () => void
  onMore?: () => void // 今日の分が終わったあと、新しい単語を5語ふやす
  onSkip?: () => void // この単語をうしろに回す
  onQuiz?: () => void
  note?: string
  onNote?: (text: string) => void
  hideExampleJa?: boolean
  lookup?: (token: string) => Word | undefined // 例文の単語をタップしたときの意味
}

// 単語カード（英→日、めくる、発音、覚えた／まだ）
export function Card({ card, onAnswer, autoSpeak = false, jaFirst = false, favorite = false, onToggleFavorite, onMore, onQuiz, note, onNote, hideExampleJa = false, lookup, emojiHint = false, onSkip }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [dx, setDx] = useState(0)
  const [showJa, setShowJa] = useState(false)
  const [gloss, setGloss] = useState<Word | null>(null)
  const start = useRef<{ x: number; y: number } | null>(null)

  // 英語が見えたときに自動で発音（英→日なら表、日→英ならめくったとき）
  const englishShown = !!card && (!jaFirst || flipped)
  // 例文の中の見出し語（変化形もふくむ）
  const hlParts = card?.example ? blankOut(card.example, card.en) : null
  const hl = hlParts?.answer
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
      {emojiHint && !flipped && EMOJI[card.id] && (
        <p className="card-emoji-hint" aria-label="ヒント">
          {EMOJI[card.id]}
        </p>
      )}
      {jaFirst ? (
        <p className="en ja-prompt">{card.ja}</p>
      ) : (
        <>
          <p className="en">{card.en}</p>
          <button className="speak" onClick={() => speak(card.en)} aria-label="発音を聞く">
            🔊
          </button>
          <button className="speak" onClick={() => speak(card.en, true)} aria-label="ゆっくり聞く">
            🐢
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
            <p className="ja">
              {EMOJI[card.id] && (
                <span className="card-emoji" aria-hidden="true">
                  {EMOJI[card.id]}{' '}
                </span>
              )}
              {card.ja}
            </p>
          )}
          {verbOf(card.en) && (
            <p className="verb-forms">
              {verbOf(card.en)!.base} - {verbOf(card.en)!.past} - {verbOf(card.en)!.pp}
            </p>
          )}
          {card.example && (
            <p className="example">
              {lookup
                ? card.example.split(/(\s+)/).map((tok, i) => {
                    const hit = lookup(tok)
                    return hit && hit.id !== card.id ? (
                      <button key={i} className="gloss-word" onClick={() => setGloss(gloss?.id === hit.id ? null : hit)}>
                        {tok}
                      </button>
                    ) : hl && tok.replace(/[^A-Za-z']/g, '') === hl ? (
                      <strong key={i} className="hl">
                        {tok}
                      </strong>
                    ) : (
                      <span key={i}>{tok}</span>
                    )
                  })
                : hlParts
                  ? [hlParts.before, <strong key="hl" className="hl">{hlParts.answer}</strong>, hlParts.after]
                  : card.example}
              <button className="speak small" onClick={() => speak(card.example)} aria-label="例文を聞く">
                🔊
              </button>
            </p>
          )}
          {gloss && (
            <p className="gloss" role="status">
              {gloss.en}：{gloss.ja}
            </p>
          )}
          {card.exampleJa &&
            (hideExampleJa && !showJa ? (
              <button className="note-btn" onClick={() => setShowJa(true)}>
                訳を見る
              </button>
            ) : (
              <p className="example-ja">{card.exampleJa}</p>
            ))}
          {confusingFor(card.id) && (
            <details className="confusing-tip">
              <summary>⚠ まちがえやすい：{confusingFor(card.id)!.title}</summary>
              {confusingFor(card.id)!.points.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </details>
          )}
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
        <>
          <button className="flip" onClick={() => setFlipped(true)}>
            {jaFirst ? '英語を見る' : '意味を見る'}
          </button>
          {onSkip && (
            <button className="note-btn skip-card" onClick={onSkip}>
              ⏭ あとで
            </button>
          )}
        </>
      )}
    </section>
  )
}
