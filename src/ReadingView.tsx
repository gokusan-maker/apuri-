import { useState } from 'react'
import type { Source } from './monster'
import { PASSAGES, type Passage } from './reading'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { makeLookup } from './glossary'
import { WORDS, type Word } from './words'

const lookup = makeLookup(WORDS)

export const XP_READING = 15

type Props = {
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  start?: Passage // はじめからこの話を開く（ホームの今日の読解）
  onDone?: (score: number, total: number) => void // 1本ぜんぶ答えたとき
}

export function Reading({ onAnswer, start, onDone }: Props) {
  const [p, setP] = useState<Passage | null>(start ?? null)
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showJa, setShowJa] = useState(false)
  const [gloss, setGloss] = useState<Word | null>(null)

  if (!p) {
    return (
      <section className="card grammar">
        <h2>読解ミニ</h2>
        <p className="stats-note">短い英文を読んで、内容の問題に答えよう。</p>
        <ul className="grammar-list">
          {PASSAGES.map((x) => (
            <li key={x.id}>
              <button
                onClick={() => {
                  setP(x)
                  setGloss(null)
                  setStep(0)
                  setPicked(null)
                  setScore(0)
                  setShowJa(false)
                }}
              >
                {x.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const q = p.questions[step]
  return (
    <section className="card grammar reading">
      <button className="stage-back" onClick={() => setP(null)}>
        ← 一覧
      </button>
      <h2>
        {p.title}
        <button className="speak small" onClick={() => speak(p.text)} aria-label="英文を聞く">
          🔊
        </button>
      </h2>
      <p className="reading-text">
        {p.text.split(/(\s+)/).map((tok, i) => {
          const hit = lookup(tok)
          return hit ? (
            <button key={i} className="gloss-word" onClick={() => setGloss(gloss?.id === hit.id ? null : hit)}>
              {tok}
            </button>
          ) : (
            <span key={i}>{tok}</span>
          )
        })}
      </p>
      {gloss && (
        <p className="gloss" role="status">
          {gloss.en}：{gloss.ja}
        </p>
      )}
      {showJa ? <p className="example-ja">{p.ja}</p> : null}
      {q ? (
        <>
          <p className="reading-q">
            Q{step + 1}. {q.q}
          </p>
          <div className="choices">
            {q.choices.map((c, i) => {
              let cls = 'choice'
              if (picked !== null && i === q.answer) cls += ' correct'
              else if (picked === i) cls += ' wrong'
              return (
                <button
                  key={c}
                  className={cls}
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(i)
                    const ok = i === q.answer
                    if (ok) {
                      setScore(score + 1)
                      playCorrect()
                    } else playWrong()
                    onAnswer?.(ok, ok ? XP_READING : 0, `reading:${p.id}`, 'quiz')
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <button
              className="flip"
              onClick={() => {
                setPicked(null)
                setStep(step + 1)
                if (step + 1 === p.questions.length) {
                  setShowJa(true)
                  onDone?.(score, p.questions.length)
                }
              }}
            >
              次へ
            </button>
          )}
        </>
      ) : (
        <>
          <p className="result-score">
            {score} / {p.questions.length} 問正解
          </p>
          <button className="flip" onClick={() => setP(null)}>
            ほかの話を読む
          </button>
        </>
      )}
    </section>
  )
}
