import { useEffect, useRef, useState } from 'react'
import { BOSS_TA_SECONDS, damage, loadBossTaBest, recordBossTaBest } from './boss'
import { distractorPool, makeQuiz } from './quiz'
import { playCorrect, playWrong } from './sound'
import { WORDS, type Word } from './words'

const nowMs = () => Date.now()
const rnd = () => Math.random()

type Props = { words: Word[]; onBack: () => void }

// ボスのタイムアタック：30秒でボスに何ダメージあたえられるか（コンボでダメージアップ）
export function BossTime({ words, onBack }: Props) {
  const [qs, setQs] = useState(() => makeQuiz(distractorPool(words, WORDS), (w) => w.ja, 60, rnd, words))
  const [i, setI] = useState(0)
  const [combo, setCombo] = useState(0)
  const [total, setTotal] = useState(0)
  const [startAt, setStartAt] = useState<number | null>(null)
  const [now, setNow] = useState(0)
  const [result, setResult] = useState<{ total: number; best: boolean } | null>(null)
  const [best, setBest] = useState(loadBossTaBest)
  const totalRef = useRef(0)
  const left = startAt === null ? BOSS_TA_SECONDS : Math.max(0, BOSS_TA_SECONDS - Math.floor((now - startAt) / 1000))

  useEffect(() => {
    if (startAt === null || result) return
    const id = window.setInterval(() => {
      const t = nowMs()
      setNow(t)
      if (t - startAt < BOSS_TA_SECONDS * 1000) return
      window.clearInterval(id)
      const b = recordBossTaBest(totalRef.current)
      if (b) setBest(totalRef.current)
      setResult({ total: totalRef.current, best: b })
    }, 250)
    return () => window.clearInterval(id)
  }, [startAt, result])

  const q = qs[i % qs.length]
  return (
    <section className="card quiz boss-ta">
      <button className="stage-back" onClick={onBack}>
        ← ステージにもどる
      </button>
      <h2>⏱ ボスのタイムアタック</h2>
      {startAt === null ? (
        <>
          <p className="stats-note">
            {BOSS_TA_SECONDS}秒で何ダメージ出せる？{best > 0 ? `（ベスト ${best}）` : ''}
          </p>
          <button
            className="flip ta-start"
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
          <p className="game-result-title">💥 {result.total}ダメージ！</p>
          <p className="buddy-chips game-chips">{result.best ? <span className="game-best">🏆 ベスト記録！</span> : <span>🏆 ベスト {best}</span>}</p>
          <button
            className="flip"
            onClick={() => {
              const t = nowMs()
              setQs(makeQuiz(distractorPool(words, WORDS), (w) => w.ja, 60, rnd, words))
              setI(0)
              setCombo(0)
              setTotal(0)
              totalRef.current = 0
              setResult(null)
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
            ⏱ のこり {left}秒　💥 {total}ダメージ{combo >= 2 ? `　🔥${combo}` : ''}
          </p>
          <p className="en">{q.word.en}</p>
          <div className="choices">
            {q.choices.map((c, k) => (
              <button
                key={c}
                className="choice"
                onClick={() => {
                  if (nowMs() - startAt >= BOSS_TA_SECONDS * 1000) return
                  if (k === q.answer) {
                    const c2 = combo + 1
                    const t2 = total + damage(c2)
                    playCorrect()
                    setCombo(c2)
                    setTotal(t2)
                    totalRef.current = t2
                  } else {
                    playWrong()
                    setCombo(0)
                  }
                  setI(i + 1)
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
