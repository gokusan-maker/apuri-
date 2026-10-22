import { useEffect, useState } from 'react'
import { GRAMMAR, loadTaBest, saveTaBest, TA_BEST_XP, TA_SECONDS, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onBack: () => void; units?: GrammarUnit[]; label?: string; onBest?: () => void } // onBest：ベスト更新（文法のなかまにボーナス）

// 文法タイムアタック：60秒で何問正解できるか（答えたらすぐ次の問題）
export function GrammarTime({ onAnswer, onBack, units = GRAMMAR, label, onBest }: Props) {
  const [qs] = useState(() => shuffle(units.flatMap((u) => u.questions)))
  const [i, setI] = useState(0)
  const [left, setLeft] = useState(TA_SECONDS)
  const [score, setScore] = useState(0)
  const [flash, setFlash] = useState<'ok' | 'ng' | null>(null)
  const [best] = useState(loadTaBest) // はじめたときのベスト
  const over = left <= 0

  useEffect(() => {
    if (over && !label && score > best) {
      saveTaBest(score) // ベストは全学年のときだけ記録
      onBest?.()
    }
    // onBest は終わったときに1回だけ呼べばよい
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over, score, best, label])

  useEffect(() => {
    if (over) return
    const id = window.setInterval(() => setLeft((l) => l - 1), 1000)
    return () => window.clearInterval(id)
  }, [over])

  if (over) {
    const record = score > best
    return (
      <section className="card result">
        <button className="stage-back" onClick={onBack}>
          ← 単元一覧
        </button>
        <p className="result-title">⏱ 文法タイムアタック{label ? `（${label}）` : ''}</p>
        <p className="result-score">{score} 問正解</p>
        <p className="result-message">{record ? `🎉 ベスト記録更新！${!label && onBest ? ` 文法のなかまに +${TA_BEST_XP}XP` : ''}` : `ベスト記録 ${best} 問`}</p>
      </section>
    )
  }

  const q = qs[i % qs.length]
  const [before, after] = q.sentence.split('___')
  return (
    <section className={`card quiz grammar ta${flash ? ` ta-${flash}` : ''}`}>
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <p className="progress ta-head">
        ⏱ のこり <strong className={left <= 10 ? 'ta-hurry' : undefined}>{left}</strong> 秒　✅ {score} 問
      </p>
      <p className="example blank-sentence">
        {before}
        <span className="blank">　　　</span>
        {after}
      </p>
      <div className="choices">
        {q.choices.map((c, n) => (
          <button
            key={c}
            className="choice"
            onClick={() => {
              const ok = n === q.answer
              if (ok) {
                setScore(score + 1)
                playCorrect()
              } else playWrong()
              setFlash(ok ? 'ok' : 'ng')
              onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, '', 'quiz')
              setI(i + 1)
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  )
}
