import { useState } from 'react'
import { quizXp } from './monster'
import { makeQuiz } from './quiz'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'

type Props = {
  words: Word[]
  count?: number
  onCorrect?: (xp: number) => void
}

export function Quiz({ words, count = 10, onCorrect }: Props) {
  const [questions, setQuestions] = useState(() => makeQuiz(words, (w) => w.ja, count))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [earned, setEarned] = useState(0)
  const [lastXp, setLastXp] = useState(0)

  const q = questions[index]

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) {
      const c = combo + 1
      const xp = quizXp(c)
      setScore(score + 1)
      setCombo(c)
      setMaxCombo(Math.max(maxCombo, c))
      setEarned(earned + xp)
      setLastXp(xp)
      playCorrect()
      onCorrect?.(xp)
    } else {
      setCombo(0)
      setLastXp(0)
      playWrong()
    }
  }

  function next() {
    setPicked(null)
    setIndex(index + 1)
  }

  function restart() {
    setQuestions(makeQuiz(words, (w) => w.ja, count))
    setIndex(0)
    setPicked(null)
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setEarned(0)
  }

  if (!q) {
    const rate = Math.round((score / questions.length) * 100)
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {questions.length} 問正解
        </p>
        <dl className="result-list">
          <div>
            <dt>正答率</dt>
            <dd>{rate}%</dd>
          </div>
          <div>
            <dt>獲得XP</dt>
            <dd>+{earned}</dd>
          </div>
          <div>
            <dt>最大コンボ</dt>
            <dd>{maxCombo}</dd>
          </div>
        </dl>
        <p className="result-message">
          {rate === 100 ? 'パーフェクト！すごい！' : rate >= 70 ? 'いい調子！' : 'もう1回で覚えちゃおう！'}
        </p>
        <button className="flip" onClick={restart}>
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz" aria-live="polite">
      <p className="progress">
        {index + 1} / {questions.length}
        {combo >= 2 && (
          <span key={combo} className="combo">
            🔥{combo} コンボ！
          </span>
        )}
      </p>
      <p className="en">{q.word.en}</p>
      <div className="choices">
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">
            {picked === q.answer ? (
              <>
                正解！ <span className="xp-gain">+{lastXp} XP</span>
              </>
            ) : (
              `正解は「${q.choices[q.answer]}」`
            )}
          </p>
          <button className="flip" onClick={next}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}
