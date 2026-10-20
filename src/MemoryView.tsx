import { useEffect, useState } from 'react'
import { isPair, makeDeck, type MemCard } from './memory'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'

type Props = {
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  initialDeck?: MemCard[] // テスト用
}

// 神経衰弱（6ペア）
export function Memory({ words, onAnswer, initialDeck }: Props) {
  const [deck, setDeck] = useState(() => initialDeck ?? makeDeck(words))
  const [open, setOpen] = useState<number[]>([]) // めくっている（最大2枚）
  const [done, setDone] = useState<string[]>([]) // そろったカードの key
  const [moves, setMoves] = useState(0)

  // 2枚がちがったら少し見せてから伏せる
  useEffect(() => {
    if (open.length !== 2) return
    const id = window.setTimeout(() => setOpen([]), 900)
    return () => window.clearTimeout(id)
  }, [open])

  function flip(i: number) {
    if (open.length === 2 || open.includes(i) || done.includes(deck[i].key)) return
    const next = [...open, i]
    if (next.length === 2) {
      setMoves(moves + 1)
      const [a, b] = next.map((k) => deck[k])
      if (isPair(a, b)) {
        playCorrect()
        setDone([...done, a.key, b.key])
        onAnswer?.(true, XP_QUIZ_CORRECT, a.wordId, 'quiz')
        setOpen([])
        return
      }
      playWrong()
    }
    setOpen(next)
  }

  const cleared = done.length === deck.length

  return (
    <section className="card quiz memory">
      <p className="quiz-progress">
        そろった {done.length / 2} / {deck.length / 2} ペア・{moves} 手
      </p>
      <div className="memory-grid">
        {deck.map((c: MemCard, i) => {
          const shown = open.includes(i) || done.includes(c.key)
          return (
            <button
              key={c.key}
              className={`memory-card${shown ? ' shown' : ''}${done.includes(c.key) ? ' done' : ''}`}
              onClick={() => flip(i)}
              aria-label={shown ? c.text : 'うら'}
            >
              {shown ? c.text : '？'}
            </button>
          )
        })}
      </div>
      {cleared && (
        <>
          <p className="level-up">ぜんぶそろった！ {moves} 手でクリア</p>
          <button
            className="flip"
            onClick={() => {
              setDeck(makeDeck(words))
              setDone([])
              setOpen([])
              setMoves(0)
            }}
          >
            もう1回
          </button>
        </>
      )}
    </section>
  )
}
