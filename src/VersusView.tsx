import { useState } from 'react'
import { makeQuiz } from './quiz'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'

export const VERSUS_EACH = 10 // ひとり何問
const PLAYERS = ['🔴 プレイヤー1', '🔵 プレイヤー2']

// 2人対戦：1台を交代で使う（XP は入らない）
export function Versus({ words }: { words: Word[] }) {
  const [jaEn, setJaEn] = useState(false) // 日→英
  const [qs, setQs] = useState(() => makeQuiz(words, (w) => w.ja, VERSUS_EACH * 2))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [scores, setScores] = useState([0, 0])
  const total = Math.floor(Math.min(qs.length, VERSUS_EACH * 2) / 2) * 2 // 2人で同じ数
  const turn = index % 2

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === qs[index].answer) {
      playCorrect()
      setScores((s) => s.map((n, k) => (k === turn ? n + 1 : n)))
    } else playWrong()
  }

  function restart(je = jaEn) {
    setJaEn(je)
    setQs(makeQuiz(words, je ? (w) => w.en : (w) => w.ja, VERSUS_EACH * 2))
    setIndex(0)
    setPicked(null)
    setScores([0, 0])
  }

  if (index >= total) {
    const winner = scores[0] === scores[1] ? null : scores[0] > scores[1] ? 0 : 1
    return (
      <section className="card result versus">
        <h2>結果</h2>
        <p className="result-score">
          {scores[0]} 対 {scores[1]}
        </p>
        <p className="level-up">{winner === null ? '引き分け！' : `${PLAYERS[winner]} の勝ち！`}</p>
        <button className="flip" onClick={() => restart()}>
          もう1回
        </button>
      </section>
    )
  }

  const q = qs[index]
  return (
    <section className="card quiz versus">
      <p className="quiz-progress">
        {PLAYERS[turn]} の番（{Math.floor(index / 2) + 1} / {total / 2} 問目）・{scores[0]} 対 {scores[1]}
      </p>
      {index === 0 && picked === null && (
        <div className="counts" role="group" aria-label="向き">
          <button aria-pressed={!jaEn} onClick={() => restart(false)}>
            英→日
          </button>
          <button aria-pressed={jaEn} onClick={() => restart(true)}>
            日→英
          </button>
        </div>
      )}
      <p className={jaEn ? 'en ja-prompt' : 'en'}>{jaEn ? q.word.ja : q.word.en}</p>
      <div className="choices">
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button key={c} className={cls} onClick={() => pick(i)}>
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? '正解！' : `正解は「${q.choices[q.answer]}」`}</p>
          <button
            className="flip"
            onClick={() => {
              setPicked(null)
              setIndex(index + 1)
            }}
          >
            {index + 1 < total ? `${PLAYERS[1 - turn]} にわたす` : '結果を見る'}
          </button>
        </>
      )}
    </section>
  )
}
