import { useMemo, useState } from 'react'
import { dictTokens, sameSentence, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = { unit: GrammarUnit; onBack: () => void; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 文法の例文ディクテーション：例文を聞いて、語のボタンを順に押して英文をつくる（キーボードで打たない）

export function GrammarDict({ unit, onBack, onAnswer }: Props) {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [checked, setChecked] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const done = step >= unit.examples.length
  const ex = unit.examples[Math.min(step, unit.examples.length - 1)]
  const tiles = useMemo(() => shuffle(dictTokens(ex.en)), [ex])
  const text = picked.map((i) => tiles[i]).join(' ')
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
            <button className="list-link pill-btn pill-cyan" onClick={() => speak(ex.en)}>
              🔊 聞く
            </button>
            <button className="list-link pill-btn pill-cyan" onClick={() => speak(ex.en, true)}>
              🐢 ゆっくり
            </button>
          </div>
          <p className="dict-built" aria-label="聞こえた英文">
            {text || '（下の語を、聞こえた順に押そう）'}
          </p>
          {checked === null && (
            <div className="dict-tiles" aria-label="語のボタン">
              {tiles.map((t, i) => (
                <button key={i} className="dict-tile" aria-label={`語 ${t}`} disabled={picked.includes(i)} onClick={() => setPicked([...picked, i])}>
                  {t}
                </button>
              ))}
              <button className="dict-tile back" onClick={() => setPicked(picked.slice(0, -1))} disabled={picked.length === 0}>
                ⌫ 1語消す
              </button>
            </div>
          )}
          {checked === null ? (
            <button
              className="flip"
              disabled={picked.length === 0}
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
                  setPicked([])
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
