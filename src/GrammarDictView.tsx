import { useMemo, useState } from 'react'
import { dictTokens, loadDictBest, sameSentence, saveDictBest, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { starsFor } from './stages'

type Props = { unit: GrammarUnit; onBack: () => void; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 文法の例文ディクテーション：例文を聞いて、語のボタンを順に押して英文をつくる（キーボードで打たない）

export function GrammarDict({ unit, onBack, onAnswer }: Props) {
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [checked, setChecked] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0) // 連続正解
  const [best, setBest] = useState(0) // 連続正解の最高
  const [record] = useState(loadDictBest) // 始めたときの自己ベスト
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
        <>
          <p className="level-up">
            {score} / {unit.examples.length} 文正解
          </p>
          {score === unit.examples.length && unit.examples.length > 0 && <p className="wc-perfect">🏆 パーフェクト！ 全文正解</p>}
          {best >= 2 && <p className="num-streak">🔥 最高 {best}連続正解{best > record ? '　🎉 自己ベスト更新！' : ''}</p>}
          <p className="result-stars" aria-label={`星 ${starsFor(score, unit.examples.length)}`}>
            {'★'.repeat(starsFor(score, unit.examples.length))}
            {'☆'.repeat(3 - starsFor(score, unit.examples.length))}
          </p>
        </>
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
                setStreak(ok ? streak + 1 : 0)
                if (ok) setBest(Math.max(best, streak + 1))
                if (ok && streak + 1 > loadDictBest()) saveDictBest(streak + 1)
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
              {checked && streak >= 2 && <p className="num-streak">🔥 {streak}連続正解！</p>}
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
