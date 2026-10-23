import { useState } from 'react'
import { BINGO_BEST, loadLowBest, recordLowBest } from './bests'
import { hasBingo, makeBoard } from './bingo'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playFanfare, playWrong } from './sound'
import type { Word } from './words'

type Props = {
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  initialBoard?: Word[] // テスト用
  onClear?: () => void // ビンゴになったとき
}

// 単語ビンゴ
export function Bingo({ words, onAnswer, initialBoard, onClear }: Props) {
  const [board, setBoard] = useState(() => initialBoard ?? makeBoard(words))
  const [order, setOrder] = useState(() => shuffle([...Array(9).keys()]))
  const [step, setStep] = useState(0)
  const [marked, setMarked] = useState<number[]>([])
  const [miss, setMiss] = useState(false)
  const [best, setBest] = useState(() => loadLowBest(BINGO_BEST))
  const [newBest, setNewBest] = useState(false)
  const bingo = hasBingo(marked)
  const target = order[step]

  function tap(i: number) {
    if (bingo || marked.includes(i) || target === undefined) return
    if (i === target) {
      playCorrect()
      const m = [...marked, i]
      setMarked(m)
      setStep(step + 1)
      setMiss(false)
      onAnswer?.(true, XP_QUIZ_CORRECT, board[i].id, 'quiz')
      if (hasBingo(m)) {
        playFanfare()
        onClear?.()
        if (recordLowBest(BINGO_BEST, step + 1)) {
          setNewBest(true)
          setBest(step + 1)
        }
      }
    } else {
      playWrong()
      setMiss(true)
      onAnswer?.(false, 0, board[target].id, 'quiz')
    }
  }

  function restart() {
    setBoard(makeBoard(words))
    setOrder(shuffle([...Array(9).keys()]))
    setStep(0)
    setMarked([])
    setMiss(false)
    setNewBest(false)
  }

  return (
    <section className="card quiz bingo">
      <p className="buddy-chips game-chips">
        <span aria-label={`${step} 問目まで正解`}>✅ {step}問</span>
        {best !== null && <span aria-label={`ベスト ${best} 問でビンゴ`}>🏆 ベスト {best}問</span>}
      </p>
      {bingo ? (
        <div className="game-result" role="status">
          <p className="game-result-title">🎉 ビンゴ！</p>
          <p className="buddy-chips game-chips">
            <span>✅ {step}問</span>
            {newBest && <span className="game-best">🏆 自己ベスト！</span>}
          </p>
        </div>
      ) : (
        <p className="verb-ask">
          「<strong>{board[target]?.ja}</strong>」はどれ？{miss && <span className="stats-note">（ちがうよ）</span>}
        </p>
      )}
      <div className="bingo-grid">
        {board.map((w, i) => (
          <button key={w.id} className={`bingo-cell${marked.includes(i) ? ' marked' : ''}`} onClick={() => tap(i)}>
            {w.en}
          </button>
        ))}
      </div>
      {bingo && (
        <button className="flip" onClick={restart}>
          もう1回
        </button>
      )}
    </section>
  )
}
