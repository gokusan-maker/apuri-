import { useState } from 'react'
import { loadTraining, POWER_MAX, saveTraining, trainDone, TRAIN_COUNT, type Training as TrainingState } from './training'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'

const rand = () => Math.random()

type Props = { day: string; words: Word[]; name: string; onChange?: (t: TrainingState) => void }

function makeQ(words: Word[]) {
  const pick = () => words[Math.floor(rand() * words.length)]
  const w = pick()
  const others = words.filter((x) => x.ja !== w.ja)
  const a = others[Math.floor(rand() * others.length)]
  const rest = others.filter((x) => x.ja !== a.ja)
  const b = rest[Math.floor(rand() * rest.length)]
  const at = Math.floor(rand() * 3)
  const choices = [a, b]
  choices.splice(at, 0, w)
  return { w, choices }
}

export function Training({ day, words, name, onChange }: Props) {
  const [t, setT] = useState(loadTraining)
  const [qs, setQs] = useState<ReturnType<typeof makeQ>[] | null>(null)
  const [step, setStep] = useState(0)
  const [ok, setOk] = useState(0)
  const [msg, setMsg] = useState('')
  if (t.day === day && !qs) return msg ? <p className="walk-msg">{msg}</p> : <p className="stats-note">💪 {name}のちから {t.power} / {POWER_MAX}（今日のトレーニングはおわり）</p>
  if (!qs)
    return (
      <button className="challenge-btn training-btn" disabled={words.length < 3} onClick={() => setQs(Array.from({ length: TRAIN_COUNT }, () => makeQ(words)))}>
        💪 {name}とトレーニング（{TRAIN_COUNT}問全問正解でちから+1・いま {t.power} / {POWER_MAX}）
      </button>
    )
  const q = qs[step]
  return (
    <div className="training">
      <p className="training-title">
        💪 トレーニング {step + 1} / {TRAIN_COUNT}：「{q.w.en}」の意味は？
      </p>
      <div className="sugoroku-choices">
        {q.choices.map((c) => (
          <button
            key={c.id}
            className="list-link"
            onClick={() => {
              const right = c.id === q.w.id
              if (right) playCorrect()
              else playWrong()
              const n = ok + (right ? 1 : 0)
              setOk(n)
              if (step + 1 < TRAIN_COUNT) {
                setStep(step + 1)
                return
              }
              const next = trainDone(t, day, n === TRAIN_COUNT)
              setT(next)
              saveTraining(next)
              onChange?.(next)
              setQs(null)
              setMsg(n === TRAIN_COUNT ? `💪 全問正解！ ${name}のちからが ${next.power} になった（ボス戦の正解ダメージ+${next.power}）` : `${n} / ${TRAIN_COUNT} 問正解。また明日がんばろう！（ちから ${next.power}）`)
            }}
          >
            {c.ja}
          </button>
        ))}
      </div>
    </div>
  )
}
