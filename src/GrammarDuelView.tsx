import { useState } from 'react'
import { DUEL_BEST_XP, DUEL_PENALTY, duelTime, loadDuelBest, makeDuel, recordDuelBest } from './grammarduel'
import { playCorrect, playWrong } from './sound'

const nowMs = () => Date.now()
const rand = () => Math.random()

type Props = { onBack: () => void; onBest?: () => void } // onBest：ベスト更新（文法のなかまにボーナス）

export function GrammarDuel({ onBack, onBest }: Props) {
  const [qs, setQs] = useState(() => makeDuel(rand))
  const [step, setStep] = useState(0)
  const [misses, setMisses] = useState(0)
  const [startAt, setStartAt] = useState<number | null>(null)
  const [last, setLast] = useState<{ ok: boolean; why: string } | null>(null)
  const [result, setResult] = useState<{ sec: number; best: boolean } | null>(null)
  const [best, setBest] = useState(loadDuelBest)
  const q = qs[step]

  function pick(isRight: boolean) {
    if (startAt === null || result) return
    const m = misses + (isRight ? 0 : 1)
    if (isRight) playCorrect()
    else playWrong()
    setMisses(m)
    setLast({ ok: isRight, why: q.why })
    if (step + 1 >= qs.length) {
      const sec = duelTime(Math.max(1, Math.round((nowMs() - startAt) / 1000)), m)
      const b = recordDuelBest(sec)
      if (b) {
        setBest(sec)
        onBest?.()
      }
      setResult({ sec, best: b })
      return
    }
    setStep(step + 1)
  }

  const options = q ? (q.rightFirst ? [true, false] : [false, true]) : []
  return (
    <section className="card grammar grammar-duel">
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <h2>⚡ 2択スピード</h2>
      {startAt === null ? (
        <>
          <p className="stats-note">正しい英文はどっち？</p>
          <p className="buddy-chips game-chips">
            <span>📝 {qs.length}問</span>
            <span>❌ ミス +{DUEL_PENALTY}秒</span>
            {best > 0 && <span>🏆 ベスト {best}秒</span>}
          </p>
          <button className="flip ta-start" onClick={() => setStartAt(nowMs())}>
            スタート
          </button>
        </>
      ) : result ? (
        <div role="status" className="game-result">
          <p className="game-result-title">⏱ {result.sec}秒</p>
          <p className="buddy-chips game-chips">
            <span aria-label={`まちがい ${misses}`}>❌ ミス {misses}</span>
            {result.best ? <span className="game-best">🏆 ベスト記録！</span> : <span>🏆 ベスト {best}秒</span>}
            {result.best && onBest && <span>🐣 +{DUEL_BEST_XP}XP</span>}
          </p>
          <button
            className="flip"
            onClick={() => {
              setQs(makeDuel(rand))
              setStep(0)
              setMisses(0)
              setLast(null)
              setResult(null)
              setStartAt(nowMs())
            }}
          >
            もう一回
          </button>
        </div>
      ) : (
        <>
          <p className="progress">
            {step + 1} / {qs.length}　まちがい {misses}
          </p>
          <div className="duel-options">
            {options.map((isRight) => (
              <button key={String(isRight)} className="duel-option" onClick={() => pick(isRight)}>
                {isRight ? q.right : q.wrong}
              </button>
            ))}
          </div>
          {last && <p className={`long-why${last.ok ? ' right' : ' wrong'}`}>{last.ok ? '⭕' : '❌'} {last.why}</p>}
        </>
      )}
    </section>
  )
}
