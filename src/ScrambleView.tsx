import { useState } from 'react'
import type { Source } from './monster'
import { shuffle } from './quiz'
import { canScramble, isCorrectOrder, scramble, split } from './scramble'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import type { Word } from './words'

export const XP_SCRAMBLE = 15

type Props = {
  words: Word[]
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

type Chip = { id: number; text: string }

function setup(w: Word): Chip[] {
  return scramble(split(w.example).words).map((text, id) => ({ id, text }))
}

export function Scramble({ words, count = 10, onAnswer }: Props) {
  const [list, setList] = useState(() => shuffle(words.filter((w) => canScramble(w.example))).slice(0, count))
  const [index, setIndex] = useState(0)
  const [pool, setPool] = useState<Chip[]>(() => (list[0] ? setup(list[0]) : []))
  const [answer, setAnswer] = useState<Chip[]>([])
  const [result, setResult] = useState<'ok' | 'ng' | null>(null)
  const [score, setScore] = useState(0)
  const w = list[index]

  function start(i: number, l = list) {
    setIndex(i)
    setPool(l[i] ? setup(l[i]) : [])
    setAnswer([])
    setResult(null)
  }

  function check() {
    const { words: correct } = split(w.example)
    const ok = isCorrectOrder(
      answer.map((c) => c.text),
      correct,
    )
    setResult(ok ? 'ok' : 'ng')
    if (ok) {
      setScore(score + 1)
      playCorrect()
    } else {
      playWrong()
    }
    onAnswer?.(ok, ok ? XP_SCRAMBLE : 0, w.id, 'quiz')
    speak(w.example)
  }

  if (!w) {
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {list.length} 問正解
        </p>
        <button
          className="flip"
          onClick={() => {
            const l = shuffle(words.filter((x) => canScramble(x.example))).slice(0, count)
            setList(l)
            setScore(0)
            start(0, l)
          }}
        >
          もう1回
        </button>
      </section>
    )
  }

  const { end } = split(w.example)
  return (
    <section className="card quiz scramble" aria-live="polite">
      <p className="progress">
        {index + 1} / {list.length}
      </p>
      <p className="example-ja scramble-ja">{w.exampleJa}</p>
      <div className="scramble-answer" aria-label="答え">
        {answer.map((c) => (
          <button
            key={c.id}
            className="chip"
            disabled={result !== null}
            onClick={() => {
              setAnswer(answer.filter((x) => x.id !== c.id))
              setPool([...pool, c])
            }}
          >
            {c.text}
          </button>
        ))}
        <span className="scramble-end">{end}</span>
      </div>
      <div className="scramble-pool" aria-label="単語">
        {pool.map((c) => (
          <button
            key={c.id}
            className="chip"
            disabled={result !== null}
            onClick={() => {
              setPool(pool.filter((x) => x.id !== c.id))
              setAnswer([...answer, c])
            }}
          >
            {c.text}
          </button>
        ))}
      </div>
      {result === null ? (
        <button className="flip" disabled={pool.length > 0} onClick={check}>
          こたえあわせ
        </button>
      ) : (
        <>
          <p className="feedback">{result === 'ok' ? '正解！' : '正解はこちら'}</p>
          <p className="example">{w.example}</p>
          <button className="flip" onClick={() => start(index + 1)}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}
