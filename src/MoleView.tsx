import { useEffect, useRef, useState } from 'react'
import { loadMoleBest, makeRound, MOLE_SECONDS, recordMoleBest } from './mole'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'

const nowMs = () => Date.now()
const rand = () => Math.random()

type Props = {
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onClear?: () => void // 10匹以上たたいたとき
}

export function Mole({ words, onAnswer, onClear }: Props) {
  const [startAt, setStartAt] = useState<number | null>(null)
  const [now, setNow] = useState(0)
  const [round, setRound] = useState(() => makeRound(words, rand))
  const [score, setScore] = useState(0)
  const [miss, setMiss] = useState(0)
  const [best, setBest] = useState(loadMoleBest)
  const [result, setResult] = useState<{ score: number; best: boolean } | null>(null)
  const left = startAt === null ? MOLE_SECONDS : Math.max(0, MOLE_SECONDS - Math.floor((now - startAt) / 1000))

  const scoreRef = useRef(0)
  useEffect(() => {
    if (startAt === null || result) return
    const id = window.setInterval(() => {
      const t = nowMs()
      setNow(t)
      if (t - startAt < MOLE_SECONDS * 1000) return
      // 時間切れ：結果を出す
      window.clearInterval(id)
      const final = scoreRef.current
      const isBest = recordMoleBest(final)
      if (isBest) setBest(final)
      setResult({ score: final, best: isBest })
      if (final >= 10) onClear?.()
    }, 250)
    return () => window.clearInterval(id)
  }, [startAt, result, onClear])

  function hit(i: number) {
    if (startAt === null || result) return
    const t = nowMs()
    if (t - startAt >= MOLE_SECONDS * 1000) {
      setNow(t)
      return
    }
    const w = round.holes[i]
    if (!w) return
    const ok = w.id === round.target.id
    if (ok) playCorrect()
    else playWrong()
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, round.target.id, 'quiz')
    if (ok) {
      scoreRef.current = score + 1
      setScore(score + 1)
    }
    else setMiss(miss + 1)
    setNow(t)
    setRound(makeRound(words, rand))
  }

  return (
    <section className="card mole">
      <h2>🔨 単語もぐらたたき</h2>
      {startAt === null ? (
        <>
          <p className="stats-note">意味に合うもぐらをたたこう</p>
          <p className="buddy-chips game-chips">
            <span>⏱ {MOLE_SECONDS}秒</span>
            {best > 0 && <span>🏆 ベスト {best}匹</span>}
          </p>
          <button
            className="flip"
            onClick={() => {
              const t = nowMs()
              setStartAt(t)
              setNow(t)
            }}
          >
            スタート
          </button>
        </>
      ) : result ? (
        <div role="status" className="game-result">
          <p className="game-result-title">🔨 {result.score}匹たたいた！</p>
          <p className="buddy-chips game-chips">
            {result.best ? <span className="game-best">🏆 ベスト記録！</span> : <span>🏆 ベスト {best}匹</span>}
            <span aria-label={`まちがえてたたいた数 ${miss}`}>❌ ミス {miss}</span>
          </p>
          <button
            className="flip"
            onClick={() => {
              const t = nowMs()
              setScore(0)
              scoreRef.current = 0
              setMiss(0)
              setResult(null)
              setRound(makeRound(words, rand))
              setStartAt(t)
              setNow(t)
            }}
          >
            もう一回
          </button>
        </div>
      ) : (
        <>
          <p className="mole-head">
            ⏱ のこり {left}秒　🔨 {score}匹
          </p>
          <p className="mole-target">「{round.target.ja}」</p>
          <div className="mole-grid">
            {round.holes.map((w, i) => (
              <button key={i} className={`mole-hole${w ? ' up' : ''}`} disabled={!w} onClick={() => hit(i)} aria-label={w ? w.en : `あな ${i + 1}`}>
                {w ? (
                  <>
                    <span className="mole-face" aria-hidden="true">
                      🐹
                    </span>
                    <span className="mole-word">{w.en}</span>
                  </>
                ) : null}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
