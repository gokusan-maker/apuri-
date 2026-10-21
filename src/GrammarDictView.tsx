import { useState } from 'react'
import { sameSentence, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = { unit: GrammarUnit; onBack: () => void; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 文法の例文ディクテーション：例文を聞いて、英文を入力する
export function GrammarDict({ unit, onBack, onAnswer }: Props) {
  const [step, setStep] = useState(0)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const done = step >= unit.examples.length
  const ex = unit.examples[Math.min(step, unit.examples.length - 1)]
  return (
    <section className="card grammar grammar-dict">
      <button className="stage-back" onClick={onBack}>
        ← 解説にもどる
      </button>
      <h2>✍️ ディクテーション：{unit.title}</h2>
      {done ? (
        <p className="level-up">
          {score} / {unit.examples.length} 文正解
        </p>
      ) : (
        <>
          <p className="progress">
            {step + 1} / {unit.examples.length}　（{ex.ja}）
          </p>
          <div className="shadow-btns">
            <button className="list-link" onClick={() => speak(ex.en)}>
              🔊 聞く
            </button>
            <button className="list-link" onClick={() => speak(ex.en, true)}>
              🐢 ゆっくり
            </button>
          </div>
          <input className="grammar-search" aria-label="聞こえた英文" value={text} disabled={checked !== null} onChange={(e) => setText(e.target.value)} placeholder="聞こえた英文を入力" autoCapitalize="none" />
          {checked === null ? (
            <button
              className="flip"
              disabled={!text.trim()}
              onClick={() => {
                const ok = sameSentence(text, ex.en)
                setChecked(ok)
                if (ok) {
                  playCorrect()
                  setScore(score + 1)
                } else playWrong()
                onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
              }}
            >
              答えあわせ
            </button>
          ) : (
            <>
              <p className={`long-why${checked ? ' right' : ' wrong'}`}>
                {checked ? '⭕ 正解！' : '❌ おしい！'} {ex.en}
              </p>
              <button
                className="flip"
                onClick={() => {
                  setStep(step + 1)
                  setText('')
                  setChecked(null)
                }}
              >
                次へ
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}
