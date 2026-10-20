import { useEffect, useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { parseAnswer, pickNumber, toEnglish, wordIdOf } from './numbers'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 数の聞き取り：読み上げた数を数字で答える
export function Numbers({ onAnswer }: Props) {
  const [n, setN] = useState(() => pickNumber())
  const [text, setText] = useState('')
  const [result, setResult] = useState<boolean | null>(null)
  const [score, setScore] = useState({ ok: 0, all: 0 })

  useEffect(() => {
    speak(toEnglish(n))
  }, [n])

  function check() {
    const v = parseAnswer(text)
    if (v === null || result !== null) return
    const ok = v === n
    if (ok) playCorrect()
    else playWrong()
    setResult(ok)
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }))
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, wordIdOf(n), 'quiz')
  }

  function next() {
    setN(pickNumber())
    setText('')
    setResult(null)
  }

  return (
    <section className="card quiz numbers">
      <p className="quiz-progress">
        正解 {score.ok} / {score.all}
      </p>
      <p className="prompt">聞こえた数を数字で書こう</p>
      <button className="speak" onClick={() => speak(toEnglish(n))} aria-label="もう一度聞く">
        🔊
      </button>
      <button className="speak small" onClick={() => speak(toEnglish(n), true)} aria-label="ゆっくり聞く">
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
          inputMode="numeric"
          aria-label="数"
          value={text}
          disabled={result !== null}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        {result === null ? (
          <button className="flip" type="submit" disabled={parseAnswer(text) === null}>
            答える
          </button>
        ) : (
          <>
            <p className="feedback" role="status">
              {result ? '正解！' : `ざんねん… 正解は ${n}`}　{n} = {toEnglish(n)}
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
