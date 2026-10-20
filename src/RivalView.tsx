import { useEffect, useState } from 'react'
import { quizXp, type Source } from './monster'
import { makeQuiz } from './quiz'
import { RIVAL_ACCURACY, RIVAL_COINS, RIVAL_WIN } from './rival'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'


type Props = {
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onWin?: () => void
  rng?: () => number // テスト用
}

// ライバル「ガリベンモチ」と早押し。ライバルは2〜5秒で答え、7割正解する
export function Rival({ words, onAnswer, onWin, rng = Math.random }: Props) {
  const [qs, setQs] = useState(() => makeQuiz(words, (w) => w.ja, 40))
  const [index, setIndex] = useState(0)
  const [me, setMe] = useState(0)
  const [cpu, setCpu] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [cpuGot, setCpuGot] = useState(false)
  const [combo, setCombo] = useState(0)
  const q = qs[index]
  const over = me >= RIVAL_WIN || cpu >= RIVAL_WIN || !q

  // ライバルの早押し
  useEffect(() => {
    if (over || picked !== null || cpuGot) return
    const delay = 2000 + rng() * 3000
    const id = window.setTimeout(() => {
      if (rng() < RIVAL_ACCURACY) {
        setCpuGot(true)
        setCpu((c) => c + 1)
        playWrong()
      }
    }, delay)
    return () => window.clearTimeout(id)
  }, [index, over, picked, cpuGot, rng])

  function pick(i: number) {
    if (picked !== null || cpuGot || over) return
    setPicked(i)
    if (i === q.answer) {
      const c = combo + 1
      setCombo(c)
      const nextMe = me + 1
      setMe(nextMe)
      playCorrect()
      onAnswer?.(true, quizXp(c), q.word.id, 'quiz')
      if (nextMe >= RIVAL_WIN) onWin?.()
    } else {
      setCombo(0)
      playWrong()
      onAnswer?.(false, 0, q.word.id, 'quiz')
    }
  }

  function next() {
    setPicked(null)
    setCpuGot(false)
    setIndex(index + 1)
  }

  function again() {
    setQs(makeQuiz(words, (w) => w.ja, 40))
    setIndex(0)
    setMe(0)
    setCpu(0)
    setPicked(null)
    setCpuGot(false)
    setCombo(0)
  }

  return (
    <section className="card quiz rival">
      <div className="rival-score" aria-label={`あなた ${me} 対 ライバル ${cpu}`}>
        <span className="rival-me">あなた {me}</span>
        <span>―</span>
        <span className="rival-cpu">{cpu} ガリベンモチ</span>
      </div>
      {over ? (
        <>
          <p className="result-score">{me >= RIVAL_WIN ? '勝った！ 🎉' : me < cpu ? '負けた…' : '引き分け'}</p>
          {me >= RIVAL_WIN && <p className="result-message">ごほうび 🪙{RIVAL_COINS}</p>}
          <button className="flip" onClick={again}>
            もう一度たたかう
          </button>
        </>
      ) : (
        <>
          <p className="en">{q.word.en}</p>
          <div className="choices">
            {q.choices.map((c, i) => {
              let cls = 'choice'
              if ((picked !== null || cpuGot) && i === q.answer) cls += ' correct'
              else if (picked === i) cls += ' wrong'
              return (
                <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null || cpuGot}>
                  {c}
                </button>
              )
            })}
          </div>
          {(picked !== null || cpuGot) && (
            <>
              <p className="feedback">
                {cpuGot ? 'ライバルが先に正解！' : picked === q.answer ? '正解！ 1点！' : `正解は「${q.choices[q.answer]}」`}
              </p>
              <button className="flip" onClick={next}>
                次へ
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}
