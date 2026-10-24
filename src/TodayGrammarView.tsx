import { useState } from 'react'
import { DAILY_GRAMMAR_COINS, dailyGrammar, loadDailyGrammarDay, saveDailyGrammarDay } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'

type Props = {
  today: string
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onClear?: (coins: number) => void // 今日の文法を全問正解（1日1回）
}

// ホームの「今日の文法」：日替わりの単元の要点と確認問題を、その場で学習できる
export function TodayGrammar({ today, onAnswer, onClear }: Props) {
  const unit = dailyGrammar(today)
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [cleared, setCleared] = useState(() => loadDailyGrammarDay() === today)
  const q = unit.questions[step]
  return (
    <section className="today-grammar" aria-label="今日の文法">
      <p className="today-section-title">📐 今日の文法：{unit.title.split('（')[0]}</p>
      <details className="today-grammar-point chip-fold cf-1">
        <summary>📌 ポイント</summary>
        {unit.points[0]}
      </details>
      {q ? (
        <>
          <p className="today-grammar-q">
            {step + 1} / {unit.questions.length}：{q.sentence}
          </p>
          <div className="choices">
            {q.choices.map((c, i) => (
              <button
                key={c}
                className={`choice${picked !== null && i === q.answer ? ' correct' : picked === i ? ' wrong' : ''}`}
                disabled={picked !== null}
                onClick={() => {
                  setPicked(i)
                  const ok = i === q.answer
                  if (ok) playCorrect()
                  else playWrong()
                  onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
                  const sc = score + (ok ? 1 : 0)
                  setScore(sc)
                  if (step === unit.questions.length - 1 && sc === unit.questions.length && !cleared) {
                    setCleared(true)
                    saveDailyGrammarDay(today)
                    onClear?.(DAILY_GRAMMAR_COINS)
                  }
                }}
              >
                {c}
              </button>
            ))}
          </div>
          {picked !== null && (
            <>
              <p className="feedback">
                {picked === q.answer ? '⭕ 正解！' : '❌ ざんねん'} {q.why}
              </p>
              <button
                className="flip"
                onClick={() => {
                  setPicked(null)
                  setStep(step + 1)
                }}
              >
                次へ
              </button>
            </>
          )}
        </>
      ) : (
        <p className="today-grammar-done">
          {score} / {unit.questions.length} 問正解{score === unit.questions.length ? '　✅ 今日の文法クリア！' : '　文法タブでもう一度練習しよう'}
        </p>
      )}
    </section>
  )
}
