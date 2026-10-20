import { useState } from 'react'
import { GRAMMAR, loadGrammar, saveGrammar, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = {
  units?: GrammarUnit[] // 省略時は文法の単元
  title?: string
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

export function Grammar({ units = GRAMMAR, title = '文法ミニ解説', onAnswer }: Props) {
  const [record, setRecord] = useState(loadGrammar)
  const [unit, setUnit] = useState<GrammarUnit | null>(null)
  const [step, setStep] = useState(-1) // -1：解説、0〜：問題、length：結果
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  function open(u: GrammarUnit) {
    setUnit(u)
    setStep(-1)
    setPicked(null)
    setScore(0)
  }

  if (!unit) {
    return (
      <section className="card grammar">
        <h2>{title}</h2>
        <p className="stats-note">短い解説を読んで、3問の確認問題にチャレンジ！</p>
        <ul className="grammar-list">
          {units.map((u) => (
            <li key={u.id}>
              <button onClick={() => open(u)}>
                <span>{u.title}</span>
                <span className="grammar-score">
                  {record[u.id] === undefined ? '未挑戦' : `${record[u.id]} / ${u.questions.length}`}
                  {record[u.id] === u.questions.length ? ' 👑' : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const back = (
    <button className="stage-back" onClick={() => setUnit(null)}>
      ← 単元一覧
    </button>
  )

  if (step === -1) {
    return (
      <section className="card grammar">
        {back}
        <h2>{unit.title}</h2>
        <ul className="grammar-points">
          {unit.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {unit.examples.map((ex) => (
          <p key={ex.en} className="grammar-example">
            <span>
              {ex.en}
              <button className="speak small" onClick={() => speak(ex.en)} aria-label="例文を聞く">
                🔊
              </button>
            </span>
            <span className="example-ja">{ex.ja}</span>
          </p>
        ))}
        <button className="flip" onClick={() => setStep(0)}>
          確認問題へ（{unit.questions.length}問）
        </button>
      </section>
    )
  }

  const q = unit.questions[step]
  if (!q) {
    return (
      <section className="card result">
        {back}
        <p className="result-title">{unit.title}</p>
        <p className="result-score">
          {score} / {unit.questions.length} 問正解
        </p>
        <p className="result-message">{score === unit.questions.length ? 'カンペキ！' : '解説を見直してもう一度！'}</p>
        <button className="flip" onClick={() => open(unit)}>
          もう一度
        </button>
      </section>
    )
  }

  function pick(i: number) {
    if (picked !== null || !unit) return
    setPicked(i)
    const ok = i === q.answer
    const nextScore = score + (ok ? 1 : 0)
    setScore(nextScore)
    if (ok) playCorrect()
    else playWrong()
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
    if (step === unit.questions.length - 1 && nextScore > (record[unit.id] ?? -1)) {
      const r = { ...record, [unit.id]: nextScore }
      setRecord(r)
      saveGrammar(r)
    }
  }

  const [before, after] = q.sentence.split('___')
  return (
    <section className="card quiz grammar" aria-live="polite">
      {back}
      <p className="progress">
        {step + 1} / {unit.questions.length}
      </p>
      <p className="example blank-sentence">
        {before}
        <span className={`blank${picked !== null ? ' filled' : ''}`}>
          {picked !== null ? q.choices[q.answer] : '　　　'}
        </span>
        {after}
      </p>
      <div className="choices">
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? '正解！' : 'ざんねん'}</p>
          <p className="grammar-why">{q.why}</p>
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
    </section>
  )
}
