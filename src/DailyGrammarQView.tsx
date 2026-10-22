import { useState } from 'react'
import { DAILY_Q_XP, dailyQuestion, loadQDay, saveQDay } from './grammarq'
import { playCorrect, playWrong } from './sound'

type Props = { day: string; onCorrect: () => void }

export function DailyGrammarQ({ day, onCorrect }: Props) {
  const [doneDay, setDoneDay] = useState(loadQDay)
  const [picked, setPicked] = useState<number | null>(null)
  const { q, unitTitle, point } = dailyQuestion(day)
  if (doneDay === day && picked === null) return null
  const [before, after] = q.sentence.split('___')
  return (
    <div className="daily-gq">
      <p className="daily-gq-title">✏️ 今日の文法1問（{unitTitle}）正解で XP+{DAILY_Q_XP}</p>
      <p className="daily-gq-sentence">
        {before}
        <span className="blank">{picked !== null ? q.choices[q.answer] : '　　'}</span>
        {after}
      </p>
      {picked === null ? (
        <div className="daily-gq-choices">
          {q.choices.map((c, i) => (
            <button
              key={c}
              className="list-link"
              onClick={() => {
                setPicked(i)
                setDoneDay(day)
                saveQDay(day)
                if (i === q.answer) {
                  playCorrect()
                  onCorrect()
                } else playWrong()
              }}
            >
              {c}
            </button>
          ))}
        </div>
      ) : (
        <p className={`long-why${picked === q.answer ? ' right' : ' wrong'}`}>
          {picked === q.answer ? `⭕ 正解！ XP+${DAILY_Q_XP}` : '❌ ざんねん'}　{q.why}
        </p>
      )}
      {picked !== null && <p className="daily-gq-point">📌 要点：{point}</p>}
    </div>
  )
}
