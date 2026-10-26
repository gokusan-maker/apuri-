import { useEffect, useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { isRight, numChoices, pickQ } from './numbers'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { starsFor } from './stages'

const ROUND = 10 // 1回の問題数

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; round?: number }

// 数の聞き取り：読み上げた数を数字で答える
export function Numbers({ onAnswer, round = ROUND }: Props) {
  const [q, setQ] = useState(() => pickQ())
  const [text, setText] = useState('') // えらんだ答え
  const [choices, setChoices] = useState(() => numChoices(q))
  const [result, setResult] = useState<boolean | null>(null)
  const [score, setScore] = useState({ ok: 0, all: 0 })
  const [streak, setStreak] = useState(0) // 連続正解
  const [best, setBest] = useState(0) // 連続正解の最高

  useEffect(() => {
    speak(q.say)
  }, [q])

  function newQ() {
    const nq = pickQ()
    setQ(nq)
    setChoices(numChoices(nq))
  }

  function check(pick: string) {
    if (result !== null) return
    setText(pick)
    const ok = isRight(q, pick)
    if (ok) playCorrect()
    else playWrong()
    setResult(ok)
    setStreak((n) => (ok ? n + 1 : 0))
    if (ok) setBest((b) => Math.max(b, streak + 1))
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }))
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, q.id, 'ear')
  }

  const [done, setDone] = useState(false)

  function next() {
    if (score.all >= round) {
      setDone(true)
      return
    }
    newQ()
    setText('')
    setResult(null)
  }

  if (done) {
    return (
      <section className="card result numbers">
        <h2>結果</h2>
        <p className="result-score">
          {score.ok} / {round} 問正解
        </p>
        {best >= 2 && <p className="num-streak">🔥 最高 {best}連続正解</p>}
        <p className="result-stars" aria-label={`星 ${starsFor(score.ok, round)}`}>
          {'★'.repeat(starsFor(score.ok, round))}
          {'☆'.repeat(3 - starsFor(score.ok, round))}
        </p>
        <p className="result-message">獲得XP +{score.ok * XP_QUIZ_CORRECT}</p>
        <button
          className="flip"
          onClick={() => {
            setScore({ ok: 0, all: 0 })
            setStreak(0)
            setBest(0)
            setDone(false)
            newQ()
            setText('')
            setResult(null)
          }}
        >
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz numbers">
      <p className="quiz-progress">
        {Math.min(score.all + (result === null ? 1 : 0), round)} / {round} 問目・正解 {score.ok}
      </p>
      <p className="prompt">{q.kind === 'time' ? '聞こえた時刻をえらぼう' : q.kind === 'date' ? '聞こえた日付（月/日）をえらぼう' : q.kind === 'price' ? '聞こえた値段（ドル）をえらぼう' : '聞こえた数をえらぼう'}</p>
      <button className="speak" onClick={() => speak(q.say)} aria-label="もう一度聞く">
        🔊
      </button>
      <button className="speak small" onClick={() => speak(q.say, true)} aria-label="ゆっくり聞く">
        🐢
      </button>
      <div className="num-choices" aria-label="答えの選択肢">
        {choices.map((c) => (
          <button key={c} className={`choice${result !== null && c === q.answer ? ' correct' : ''}${result === false && c === text ? ' wrong' : ''}`} disabled={result !== null} onClick={() => check(c)}>
            {q.kind === 'price' ? `$${c}` : c}
          </button>
        ))}
      </div>
      {result !== null && (
        <>
          <p className="feedback" role="status">
            {result ? '正解！' : `ざんねん… 正解は ${q.answer}`}　{q.answer} = {q.say}
          </p>
          {result && streak >= 2 && <p className="num-streak">🔥 {streak}連続正解！</p>}
          <button className="flip" onClick={next}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}
