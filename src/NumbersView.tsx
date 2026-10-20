import { useEffect, useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { isRight, pickQ } from './numbers'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 数の聞き取り：読み上げた数を数字で答える
export function Numbers({ onAnswer }: Props) {
  const [q, setQ] = useState(() => pickQ())
  const [text, setText] = useState('')
  const [result, setResult] = useState<boolean | null>(null)
  const [score, setScore] = useState({ ok: 0, all: 0 })

  useEffect(() => {
    speak(q.say)
  }, [q])

  function check() {
    if (text.trim() === '' || result !== null) return
    const ok = isRight(q, text)
    if (ok) playCorrect()
    else playWrong()
    setResult(ok)
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }))
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, q.id, 'quiz')
  }

  function next() {
    setQ(pickQ())
    setText('')
    setResult(null)
  }

  return (
    <section className="card quiz numbers">
      <p className="quiz-progress">
        正解 {score.ok} / {score.all}
      </p>
      <p className="prompt">{q.kind === 'time' ? '聞こえた時刻を 7:30 のように書こう' : '聞こえた数を数字で書こう'}</p>
      <button className="speak" onClick={() => speak(q.say)} aria-label="もう一度聞く">
        🔊
      </button>
      <button className="speak small" onClick={() => speak(q.say, true)} aria-label="ゆっくり聞く">
        🐢
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (result === null) check()
          else next()
        }}
      >
        <input
          className="spell-input"
          inputMode={q.kind === 'number' ? 'numeric' : 'text'}
          aria-label="答え"
          value={text}
          disabled={result !== null}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        {result === null ? (
          <button className="flip" type="submit" disabled={text.trim() === ''}>
            答える
          </button>
        ) : (
          <>
            <p className="feedback" role="status">
              {result ? '正解！' : `ざんねん… 正解は ${q.answer}`}　{q.answer} = {q.say}
            </p>
            <button className="flip" type="submit">
              次へ
            </button>
          </>
        )}
      </form>
    </section>
  )
}
