import { useState } from 'react'
import type { GrammarUnit } from './grammar'
import { speak } from './speech'

type Props = { unit: GrammarUnit; onBack: () => void }

// 文法の例文シャドーイング：聞く → まねして言う をくり返す
export function GrammarShadow({ unit, onBack }: Props) {
  const [step, setStep] = useState(0)
  const [heard, setHeard] = useState(false)
  const done = step >= unit.examples.length
  const ex = unit.examples[Math.min(step, unit.examples.length - 1)]
  return (
    <section className="card grammar grammar-shadow">
      <button className="stage-back" onClick={onBack}>
        ← 解説にもどる
      </button>
      <h2>🗣 シャドーイング：{unit.title}</h2>
      {done ? (
        <>
          <p className="level-up">🎉 {unit.examples.length}文ぜんぶ言えた！</p>
          <button
            className="flip"
            onClick={() => {
              setStep(0)
              setHeard(false)
            }}
          >
            もう一度
          </button>
        </>
      ) : (
        <>
          <p className="progress">
            {step + 1} / {unit.examples.length}
          </p>
          <p className="shadow-en">{ex.en}</p>
          <p className="shadow-ja">{ex.ja}</p>
          <div className="shadow-btns">
            <button
              className="list-link pill-btn pill-cyan"
              onClick={() => {
                speak(ex.en)
                setHeard(true)
              }}
            >
              🔊 聞く
            </button>
            <button className="list-link pill-btn pill-cyan" onClick={() => speak(ex.en, true)}>
              🐢 ゆっくり
            </button>
          </div>
          <p className="stats-note">{heard ? '聞こえたとおりに、声に出してまねしてみよう！' : 'まずは🔊で英文を聞こう'}</p>
          <button
            className="flip"
            disabled={!heard}
            onClick={() => {
              setStep(step + 1)
              setHeard(false)
            }}
          >
            🗣 言えた！ 次へ
          </button>
        </>
      )}
    </section>
  )
}
